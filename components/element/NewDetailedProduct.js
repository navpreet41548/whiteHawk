import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import styles from "../../styles/shop/NewDetailedProduct.module.css";
import DragAndDrop from "./DragAndDrop";
import { useSelector, useDispatch } from "react-redux";
import ErrMessage from "./popup/ErrMessage";
import Router from "next/router";
import slug from "slug";
import { addImageSrc, removeImageSrc } from "../../store/imageSrcSlice";
import ProductConfirm from "./popup/ProductConfirm";
import { set } from "mongoose";
import { removeCartItem } from "../../store/cartSlice";
import { removeWishList } from "../../store/wishlistSlice";

const NewDetailedProduct = (props) => {
  const images = useSelector((state) => state.imageSrc.images);
  const dispatch = useDispatch();
  const [uploadSlide, setUploadData] = useState(true);
  const [inputValue, setInputValue] = useState({
    title: props.product.title,
    actualPrice: props.product.actualPrice,
    discountPrice: props.product.discountPrice,
    shortDesc: props.product.shortDesc,
    desc: props.product.desc,
    tag: props.product.tag,
  });

  const [loading, setLoading] = useState(false);
  const [titleErr, setTitleErr] = useState("");
  const [priceErr, setPriceErr] = useState("");
  const [shortDescErr, setShortDescErr] = useState("");
  const [descErr, setDescErr] = useState("");
  const [categoryErr, setCategoryErr] = useState("");
  const [tagErr, setTagErr] = useState("");

  const [category, setCategory] = useState(props.product.category);
  const [data, setData] = useState("");

  const [errMessage, setErrMessage] = useState("");
  const [productConfirm, setProductConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleInput = (e) => {
    setTitleErr("");
    setPriceErr("");
    setShortDescErr("");
    setDescErr("");
    setCategoryErr("");
    setTagErr("");

    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const addMore = () => {
    setUploadData(true);
  };

  const autoGrow = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const smallImageClick = (index) => {
    setUploadData(false);
    console.log("clicked");
    const imagesWrapper = document.getElementsByClassName(
      "NewDetailedProduct_productImageWrapper__A77t6"
    );
    for (let i = 0; i < imagesWrapper.length; i++) {
      const element = imagesWrapper[i];
      const indexValue = element.getAttribute("index");
      if (indexValue == index) {
        console.log(element);
        element.style.display = "flex";
      } else {
        element.style.display = "none";
      }
    }
  };

  const discardImage = async (imageSrc) => {
    try {
      const data = await fetch(
        `${process.env.BASE_URL}/api/shop/admin/aproduct/deleteImage`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageSrc,
            uniqueId: props.uniqueId,
          }),
        }
      );
      const dbData = await data.json();
      if (!dbData.err) {
        if (dbData.data) {
          console.log(dbData.data.images);
          if (dbData.data.images.length > 0) {
            for (let i = 0; i < dbData.data.images.length; i++) {
              const element = dbData.data.images[i];
              console.log(element.imageSrc);
              dispatch(removeImageSrc());
              dispatch(
                addImageSrc({
                  imageSrc: element.imageSrc,
                  maintainOriginalRatio: element.maintainOriginalRatio,
                })
              );
            }
            setUploadData(true);
          } else {
            dispatch(removeImageSrc());
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const errMessageButtonClick = () => {
    setErrMessage("");
  };

  const productCancel = async () => {
    // if (
    //   inputValue.title == "" &&
    //   inputValue.actualPrice == "" &&
    //   inputValue.discountPrice == "" &&
    //   inputValue.shortDesc == "" &&
    //   inputValue.desc == ""
    // ) {
    const wrapper = document.getElementsByClassName(
      "ProductConfirm_productConfirmWrapper__BOXyy"
    )[0];

    if (wrapper) {
      wrapper.style.display = "flex";
    }
    dispatch(removeImageSrc());

    setProductConfirm(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    var select = document.getElementById("category");
    console.log(select.options[select.selectedIndex].value);

    if (images.length == 0) {
      setLoading(false);
      return setErrMessage("Please Upload At Least 1 Image");
    }
    if (inputValue.title.replace(/\s+/g, "").length <= 25) {
      setLoading(false);
      return setTitleErr("Title Should Be At least 25 Letters Long ");
    }
    if (parseInt(inputValue.actualPrice) < parseInt(inputValue.discountPrice)) {
      setLoading(false);
      console.log("Greater");
      return setPriceErr("Discount Price Cannot be Greater the Actual Price ");
    }
    if (inputValue.actualPrice == "" || inputValue.discountPrice == "") {
      setLoading(false);
      return setPriceErr("Price Cannot be Empty");
    }
    if (inputValue.shortDesc.replace(/\s+/g, "").length <= 50) {
      setLoading(false);
      return setShortDescErr(
        "Short Description Should Be At least 50 Letters Long "
      );
    }
    if (inputValue.desc.replace(/\s+/g, "").length <= 100) {
      setLoading(false);
      return setDescErr("Description Should Be At least 100 Letters Long ");
    }
    if (select.options[select.selectedIndex].value == "") {
      setLoading(false);
      return setCategoryErr("Select Category");
    }

    if (inputValue.tag && inputValue.tag.split(" ").length < 3) {
      setLoading(false);
      return setTagErr("Please Add At Least 3 Tags");
    }

    if (!inputValue.tag) {
      setLoading(false);
      return setTagErr("Please Add At Least 3 Tags");
    }

    const productSlug = slug(inputValue.title);
    const dbData = await fetch("/api/shop/admin/aproduct/aproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uniqueId: props.uniqueId,
        title: inputValue.title,
        actualPrice: inputValue.actualPrice,
        discountPrice: inputValue.discountPrice,
        shortDesc: inputValue.shortDesc,
        desc: inputValue.desc,
        tag: inputValue.tag,
        category,
        productSlug,
      }),
    }).then((r) => r.json());

    if (dbData.err) {
      setLoading(false);
      setErrMessage(dbData.message);
    } else {
      setLoading(false);
      Router.push(`/shop/product/${dbData.data.productSlug}`);
      dispatch(removeImageSrc());
    }
    setLoading(false);
  };
  // const saveId = async () => {
  //   const res = await fetch("/api/shop/admin/aproduct/aproduct", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       uniqueId: props.uniqueId,
  //     }),
  //   });
  //   const jsonRes = await res.json();
  //   console.log(jsonRes);
  //   return jsonRes;
  // };

  const handleDelete = () => {
    setProductConfirm(true);
  };

  const handleCancel = () => {
    Router.push(`/shop/product/${props.product.productSlug}`);
    dispatch(removeImageSrc());
  };

  const handleNo = () => {
    setProductConfirm(false);
  };

  const handleYes = async (uniqueId) => {
    const data = await fetch(`/api/shop/admin/aproduct/${uniqueId}`, {
      method: "DELETE",
    });
    const dbData = await data.json();
    console.log(dbData);
    if (!dbData.err) {
      setProductConfirm(false);
      if (dbData.data) {
        dispatch(removeCartItem(dbData.data._id));
        dispatch(removeWishList(dbData.data._id));
      }
      Router.push(`/shop/products/allProducts`);
    }
  };

  useEffect(() => {
    fetch("/api/shop/category", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .then((err) => console.log("$$$$$", err));
    if (props.product) {
      console.log(props.product.images);
      for (let i = 0; i < props.product.images.length; i++) {
        const element = props.product.images[i];
        console.log(element.imageSrc);
        dispatch(
          addImageSrc({
            imageSrc: element.imageSrc,
            maintainOriginalRatio: element.maintainOriginalRatio,
          })
        );
      }
    }

    const shortDescInput = document.getElementsByClassName(
      "NewDetailedProduct_adminShortDescInput__9lYxO"
    )[0];
    const e = { target: shortDescInput };
    autoGrow(e);

    const titleInput = document.getElementsByClassName(
      "NewDetailedProduct_productTitleInput__LAUkC"
    )[0];
    const e2 = { target: titleInput };
    autoGrow(e2);

    const descInput = document.getElementsByClassName(
      "NewDetailedProduct_adminDescParaInput__uFN0o"
    )[0];
    const e3 = { target: descInput };
    autoGrow(e3);

    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      console.log(event);
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, [props.product, dispatch]);

  return (
    <div className={styles.productContainer}>
      {props.product.title && (
        <button className={styles.deleteButton} onClick={() => handleDelete()}>
          <i class="bx bx-trash"></i>
          Delete
        </button>
      )}
      <div className={styles.left}>
        <div className={styles.imageContainer}>
          {images &&
            images.map((item, i) => (
              <div
                key={i}
                className={styles.smallImageWrapper}
                onClick={() => smallImageClick(i)}
              >
                <Image
                  src={item.imageSrc}
                  width="100"
                  height={"100"}
                  alt="Product Image"
                  className={styles.smallImage}
                />
              </div>
            ))}

          <div className={styles.addMore} onClick={() => addMore()}>
            <h1>+</h1>
          </div>
        </div>
        <div className={styles.leftSubContainer}>
          {uploadSlide && (
            <div className={`${styles.uploadFile}`}>
              <DragAndDrop
                className={styles.dragDrop}
                uniqueId={props.uniqueId}
              />
            </div>
          )}

          {images &&
            images.map((item, i) => (
              <div key={i} index={i} className={styles.productImageWrapper}>
                {item.maintainOriginalRatio && (
                  <Image
                    src={item.imageSrc}
                    width="500"
                    height={"1000"}
                    alt="Product Image"
                    className={`${styles.productImage} ${styles.maintainRatio}`}
                  />
                )}
                {!item.maintainOriginalRatio && (
                  <Image
                    src={item.imageSrc}
                    width="500"
                    height={"1000"}
                    alt="Product Image"
                    className={styles.productImage}
                  />
                )}
                <div className={styles.layer}>
                  <div className={styles.adminButtonContainer}>
                    {/* <button>CHANGE IMAGE</button> */}
                    <button onClick={() => discardImage(item.imageSrc)}>
                      DISCARD IMAGE
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className={styles.right}>
        {titleErr && <p className={styles.inputErr}>{titleErr}</p>}
        <textarea
          onChange={(e) => handleInput(e)}
          value={inputValue.title}
          name="title"
          onInput={(e) => {
            autoGrow(e);
          }}
          className={styles.productTitleInput}
          placeholder="Enter the Title of Product.."
          rows={1}
        ></textarea>

        {priceErr && <p className={styles.inputErr}>{priceErr}</p>}
        <div className={styles.adminPriceContainer}>
          <div className={styles.adminPriceSubContainer}>
            <h1>ACTUAL PRICE:</h1>
            <input
              onChange={(e) => handleInput(e)}
              value={inputValue.actualPrice}
              name="actualPrice"
              placeholder="eg 100"
              type={"number"}
            />
          </div>
          <div className={styles.adminPriceSubContainer}>
            <h1>DISCOUNT PRICE:</h1>
            <input
              onChange={(e) => handleInput(e)}
              value={inputValue.discountPrice}
              name="discountPrice"
              placeholder="eg 50"
              type={"number"}
            />
          </div>
        </div>

        {shortDescErr && <p className={styles.inputErr}>{shortDescErr}</p>}
        <div className={styles.shortDesc}>
          <textarea
            onChange={(e) => handleInput(e)}
            value={inputValue.shortDesc}
            name="shortDesc"
            className={styles.adminShortDescInput}
            onInput={(e) => {
              autoGrow(e);
            }}
            placeholder="Enter the Short Description.."
            rows={2}
          ></textarea>
        </div>
        {descErr && <p className={styles.inputErr}>{descErr}</p>}
        <div className={styles.descContainer}>
          <p className={styles.descHeading}>DESCRIPTION</p>
          <textarea
            onChange={(e) => handleInput(e)}
            value={inputValue.desc}
            name="desc"
            onInput={(e) => {
              autoGrow(e);
            }}
            placeholder="Enter the Product Complete Details.."
            className={styles.adminDescParaInput}
            rows={4}
          ></textarea>
        </div>
        <div className={styles.tagContainer}>
          {tagErr && <p className={styles.inputErr}>{tagErr}</p>}
          <textarea
            name="tag"
            onChange={(e) => handleInput(e)}
            value={inputValue.tag}
            className={styles.tagInput}
            placeholder="These Keywords will be used while Searching Product 
            (Add Tags Separated by Space)"
          ></textarea>
        </div>
        <div className={styles.selectBoxContainer}>
          {categoryErr && <p className={styles.inputErr}>{categoryErr}</p>}
          <select
            id="category"
            className={styles.category}
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option className={styles.categoryOption} value="">
              Choose Category
            </option>
            {data &&
              data.data.map((item, i) => (
                <option className={styles.option} key={i} value={item.slug}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        <div className={styles.adminActionButtonContainer}>
          {props.edit && (
            <button onClick={() => handleSubmit()}>UPDATE PRODUCT</button>
          )}
          {!props.edit && (
            <button onClick={() => handleSubmit()}>CREATE PRODUCT</button>
          )}
          {!props.edit && (
            <button onClick={() => productCancel()}>CANCEL</button>
          )}
          {props.edit && <button onClick={() => handleCancel()}>CANCEL</button>}
        </div>
      </div>
      {loading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loading}>
            <i className="bx bx-loader-circle bx-spin"></i>
          </div>
        </div>
      )}
      {/* {errMessage && <ErrMessage errMessage={errMessage} />} */}
      {errMessage && (
        <div className={styles.errMessageWrapper}>
          <ErrMessage errMessage={errMessage} />
          <button
            onClick={() => errMessageButtonClick()}
            className={styles.errMessageButton}
          >
            Retry
          </button>
        </div>
      )}
      {productConfirm && (
        <div className={styles.productConfirmWrapper}>
          <div className={styles.productConfirmContainer}>
            <p>Are you sure to cancel the Product</p>
            <div className={styles.buttonContainer}>
              <button onClick={() => handleYes(props.uniqueId)}>
                Yes, Delete
              </button>
              <button onClick={() => handleNo()}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewDetailedProduct;
