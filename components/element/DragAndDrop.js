import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../../styles/shop/DragAndDrop.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addImageSrc } from "../../store/imageSrcSlice";

const DragAndDrop = (props) => {
  const dispatch = useDispatch();
  // drag state
  const [dragActive, setDragActive] = useState(false);
  const inputRef = React.useRef(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [uploadData, setUploadData] = useState();
  const [file, setFile] = useState("");

  const [maintainRatio, setMaintainRatio] = useState(false);
  const [errMessage, setErrMessage] = useState();
  const [loading, setLoading] = useState(false);

  const cancelImage = () => {
    setSelectedImage("");
  };

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
      console.log("Enter");
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // at least one file has been dropped so do something
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // at least one file has been selected so do something
      handleFiles(e.target.files[0]);
      // const [file] = e.target.files;
      // console.log(file);
    }
  };

  const handleFiles = (file) => {
    var binaryData = [];
    binaryData.push(file);
    const src = window.URL.createObjectURL(
      new Blob(binaryData, { type: "application/image" })
    );
    setFile(file);
    setSelectedImage(src);
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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

    setUploadData(data);
    if (data.secure_url) {
      try {
        const res = await fetch("/api/shop/admin/aproduct/aproduct", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: data.secure_url,
            uniqueId: props.uniqueId,
            maintainOriginalRatio: maintainRatio,
            uploadData: data,
          }),
        });
        const dbData = await res.json();
        if (!dbData.err) {
          console.log(dbData);
          const image = dbData.data.images[dbData.data.images.length - 1];
          dispatch(
            addImageSrc({
              imageSrc: image.imageSrc,
              maintainOriginalRatio: maintainRatio,
            })
          );
          setSelectedImage("");
          setLoading(false);
        }
        if (dbData.err) {
          setErrMessage(dbData.message);
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        setErrMessage(err.message);
      }
    } else {
      if (data.error) {
        setErrMessage(data.error.message);
        setLoading(false);
      }
    }

    // console.log("data", data);
  };

  const setRatio = (num) => {
    if (num == 1) {
      setMaintainRatio(true);
    } else {
      setMaintainRatio(false);
    }
  };

  const retryClick = () => {
    setErrMessage("");
    setSelectedImage("");
  };

  return (
    <div className={styles.dragDropWrapper}>
      <form
        className={styles.formFileUpload}
        onDragEnter={handleDrag}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          ref={inputRef}
          type="file"
          id="input-file-upload"
          className={styles.inputFileUpload}
          // multiple={true}
          onChange={handleChange}
          name="file"
        />
        <label
          id={styles.labelFileUpload}
          htmlFor="input-file-upload"
          className={dragActive ? styles.dragActive : ""}
        >
          <div>
            <p>Drag and drop your file here or {props.index}</p>
            <button className={styles.uploadButton} onClick={onButtonClick}>
              Select a file
            </button>
          </div>
        </label>
        {dragActive && (
          <div
            className={styles.dragFileElement}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}

        <div className={styles.submitButtonContainer}>
          <button
            onClick={(e) => handleSubmit(e)}
            type="submit"
            className={styles.submitButton}
          >
            Upload
          </button>
          <button className={styles.submitButton} onClick={() => cancelImage()}>
            Cancel
          </button>
        </div>
      </form>
      <div className={styles.imageWrapper}>
        {selectedImage && maintainRatio && (
          <Image
            className={`${styles.selectedImage} ${styles.maintainRatio}`}
            src={selectedImage}
            width={"1100"}
            height={"1100"}
            alt="hello"
            data-selectedimage
          />
        )}
        {selectedImage && !maintainRatio && (
          <Image
            className={`${styles.selectedImage} `}
            src={selectedImage}
            width={"1100"}
            height={"1100"}
            alt="hello"
            data-selectedimage
          />
        )}
      </div>
      <div className={styles.ratioButtonContainer}>
        <button onClick={() => setRatio(1)}>Maintain Ratio</button>
        <button onClick={() => setRatio(2)}>Show Complete </button>
      </div>
      {errMessage && (
        <div className={styles.errContainer}>
          <h1>{errMessage}</h1>
          <button onClick={() => retryClick()} className={styles.retryButton}>
            Retry
          </button>
        </div>
      )}

      {loading && (
        <div className={styles.loadingContainer}>
          <i className="bx bx-loader-circle bx-spin"></i>
        </div>
      )}
    </div>
  );
};

export default DragAndDrop;
