import { set } from "mongoose";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/shop/CategoryElement.module.css";
import DragAndDrop from "./DragAndDrop";
import CategoryConfirm from "./popup/CategoryConfirm";

const CategoryElement = (props) => {
  const router = useRouter();
  const userState = useSelector((state) => state.user);
  const [file, setFile] = useState();
  const [name, setName] = useState(props.name);
  const [slug, setSlug] = useState();
  const [imageSrc, setImageSrc] = useState(props.imageSrc);
  const [selectedImage, setSelectedImage] = useState(props.imageSrc);
  const [errMessage, setErrMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [deleteConfirm, setConfirmDelete] = useState();

  const [newState, setNewState] = useState(props.new);
  const [edit, setEdit] = useState();

  const handleFileChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      var binaryData = [];
      binaryData.push(file);
      const src = window.URL.createObjectURL(
        new Blob(binaryData, { type: "application/image" })
      );
      setFile(file);
      setSelectedImage(src);
    }
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
    const slug = e.target.value.replace(/ /g, "-").replace(/[^\w-]+/g, "");
    setSlug(slug);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!name) {
      setLoading(false);
      return setErrMessage("Name Is required");
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my-uploads");
    const data = await fetch(
      "https://api.cloudinary.com/v1_1/navpreetsingh/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    // setUploadData(data);
    if (data.secure_url) {
      try {
        setImageSrc(data.secure_url);
        const res = await fetch("/api/shop/admin/acategory/acategory", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageSrc: data.secure_url,
            name: name,
            slug: slug,
          }),
        });
        const dbData = await res.json();
        if (!dbData.err) {
          // console.log(dbData);
          // const image = dbData.data.images[dbData.data.images.length - 1];
          // dispatch(
          //   addImageSrc({
          //     imageSrc: image.imageSrc,
          //     maintainOriginalRatio: maintainRatio,
          //   })
          // );
          setSelectedImage("");
          setFile("");
          setLoading(false);
          setName("");
          router.push("/shop/home");
          console.log("Saved");
        }
        if (dbData.err) {
          setErrMessage(dbData.err);
          // setErrMessage(dbData.message);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setErrMessage(err.message);
        setLoading(false);
        // setErrMessage(err.message);
      }
    } else {
      if (data.error) {
        console.log(data.error);
        if (data.error.message == "Unsupported source URL: undefined") {
          setErrMessage("Please Select File ");
        } else {
          setErrMessage(data.error.message);
        }
        // setErrMessage(data.error.message);
        setLoading(false);
      }
    }
  };

  const handleUpdateSubmit = async (id) => {
    setLoading(true);
    if (!name) {
      setLoading(false);
      return setErrMessage("Name Is required");
    }
    let data;
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "my-uploads");
      data = await fetch(
        "https://api.cloudinary.com/v1_1/navpreetsingh/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());
    }

    // setUploadData(data);
    try {
      // if (data) setImageSrc(data.secure_url);

      let formData = {
        imageSrc: data ? data.secure_url : imageSrc,
        name: name,
        slug: slug,
      };
      const res = await fetch(`/api/shop/admin/acategory/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const dbData = await res.json();
      if (!dbData.err) {
        // console.log(dbData);
        // const image = dbData.data.images[dbData.data.images.length - 1];
        // dispatch(
        //   addImageSrc({
        //     imageSrc: image.imageSrc,
        //     maintainOriginalRatio: maintainRatio,
        //   })
        // );
        setSelectedImage("");
        setFile("");
        setLoading(false);
        setEdit(false);
        setNewState(false);
        router.push("/shop/home");
        console.log("Saved");
      }
      if (dbData.err) {
        setErrMessage(dbData.err);
        // setErrMessage(dbData.message);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setErrMessage(err.message);
      setLoading(false);
      // setErrMessage(err.message);
    }
    if (data && data.error) {
      console.log(data.error);
      if (data.error.message == "Unsupported source URL: undefined") {
        setErrMessage("Please Select File ");
      } else {
        setErrMessage(data.error.message);
      }
      // setErrMessage(data.error.message);
      setLoading(false);
    }
  };

  const handleDelete = () => {
    setConfirmDelete(true);
  };

  const handleNo = () => {
    setConfirmDelete(false);
  };

  const handleYes = async (id) => {
    const data = await fetch(`/api/shop/admin/acategory/${id}`, {
      method: "DELETE",
    });
    const dbData = await data.json();
    console.log(dbData);
    if (!dbData.err) {
      const wrapper = document.querySelectorAll("[data-container]")[0];

      if (wrapper) {
        wrapper.style.display = "none";
      }
      router.push(`/shop/home`);
    }
  };

  const handleEdit = () => {
    setNewState(true);
    setEdit(true);
  };
  const handleCancel = () => {
    setNewState(false);
    setEdit(false);
    setErrMessage("");
    setLoading(false);
  };

  useEffect(() => {
    console.log(props.name);
    setUser(userState.user);
    setNewState(props.new);
    setImageSrc(props.imageSrc);
    setName(props.name);
  }, [userState, props.new]);

  return (
    <>
      <div className={styles.category}>
        {user && user.admin && !newState && (
          <div className={styles.adminButtonContainer}>
            <button className={styles.edit} onClick={() => handleEdit()}>
              <i class="bx bx-pencil"></i> Edit
            </button>

            <button className={styles.delete} onClick={() => handleDelete()}>
              <i class="bx bx-trash"></i> Delete
            </button>
          </div>
        )}

        {edit && newState && (
          <div className={styles.adminButtonContainer}>
            <button className={styles.cancel} onClick={() => handleCancel()}>
              Cancel
            </button>
          </div>
        )}

        {newState ? (
          <div className={styles.wrapper}>
            {errMessage && <p className={styles.errMessage}>{errMessage}</p>}
            {loading && (
              <div className={styles.loading}>
                <i class="bx bx-loader bx-spin"></i>
              </div>
            )}
            {selectedImage && (
              <Image
                className={styles.categoryImage}
                src={imageSrc || selectedImage}
                width="500"
                height={"500"}
                alt="Category Image"
                loading="lazy"
              />
            )}
            <div class={styles.inputWrapper}>
              <input
                type="file"
                id="file"
                class={styles.file}
                onChange={(e) => handleFileChange(e)}
              />
              <label for="file">Select file</label>
              {!edit && <button onClick={() => handleSubmit()}>Create</button>}
              {edit && (
                <button onClick={() => handleUpdateSubmit(props.id)}>
                  Update
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.wrapper}>
            <Image
              className={styles.categoryImage}
              src={imageSrc || selectedImage}
              width="500"
              height={"500"}
              alt="Category Image"
              loading="lazy"
            />
            <div className={styles.layer}>
              <p className={styles.button}>
                <Link href={`/shop/products/${props.slug}`}>SHOP NOW</Link>
              </p>
            </div>
          </div>
        )}

        {newState ? (
          <div className={styles.heading}>
            <input
              className={styles.nameInput}
              placeholder="Category Name"
              onChange={(e) => handleInputChange(e)}
              value={name}
            />
          </div>
        ) : (
          <div className={styles.heading}>{props.name}</div>
        )}
      </div>
      {deleteConfirm && (
        <div className={styles.categoryConfirmWrapper} data-container>
          <div className={styles.categoryConfirmContainer}>
            <p>
              Are you sure? <br />
              <span className={styles.subPara}>
                Delete Category will Also Delete Product Related to This
                category
              </span>
            </p>
            <div className={styles.buttonContainer}>
              <button onClick={() => handleYes(props.id)}>Yes</button>
              <button onClick={() => handleNo()}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryElement;
