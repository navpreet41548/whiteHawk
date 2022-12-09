import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateForm } from "../../store/formSlice";
import { addUser } from "../../store/userSlice";
import styles from "/styles/Login.module.css";

const LoginSection = (props) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState();

  const handleClose = () => {
    const container = document.getElementsByClassName(
      "Login_container__TKPt4"
    )[0];
    container.style.opacity = "0";
    container.style.pointerEvent = "none";
    dispatch(updateForm({ login: false, visible: false }));
  };

  const handleRegister = () => {
    dispatch(updateForm({ login: false, visible: true }));
  };

  const handleLogin = () => {
    dispatch(updateForm({ login: true, visible: true }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async () => {
    const data = await fetch(`${process.env.BASE_URL}/api/user/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const dbData = await data.json();
    if (!dbData.err) {
      dispatch(updateForm({ login: false, visible: false }));
      dispatch(addUser(dbData.data));
    } else {
      setMessage(dbData.err);
    }
  };

  const handleRegisterSubmit = async () => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(formData.email)) {
      if (formData.password !== formData.confirmPassword) {
        return setMessage("Passwords Don't Match");
      } else {
        try {
          const reqBody = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          };
          const data = await fetch(
            `${process.env.BASE_URL}/api/user/register`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(reqBody),
            }
          );
          const dbData = await data.json();

          if (dbData.err) {
            setMessage(dbData.err);
          } else {
            dispatch(updateForm({ login: false, visible: false }));
            dispatch(addUser(dbData.data));
          }
        } catch (err) {
          setMessage(err.message);
        }
      }
    } else {
      return setMessage("Invalid Email");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.heading}>{props.login ? "LOGIN" : "REGISTER"}</h1>
        <p className={styles.subHeading}>
          {props.login ? "WELCOME BACK !!" : "WELCOME TO TEAM !!"}
        </p>
        {message && <p className={styles.message}>{message}</p>}
        <div className={styles.inputContainer}>
          {!props.login && (
            <div className={styles.inputWrapper}>
              <i class="bx bx-user"></i>
              <input
                onChange={(e) => handleChange(e)}
                type={"name"}
                placeholder="Name"
                name="name"
              />
            </div>
          )}
          <div className={styles.inputWrapper}>
            <i class="bx bxl-gmail"></i>
            <input
              onChange={(e) => handleChange(e)}
              type={"email"}
              placeholder="Email"
              name="email"
            />
          </div>
          <div className={styles.inputWrapper}>
            <i class="bx bx-lock-open-alt"></i>
            <input
              type={"password"}
              placeholder="Password"
              onChange={(e) => handleChange(e)}
              name="password"
            />
          </div>
          {!props.login && (
            <div className={styles.inputWrapper}>
              <i class="bx bx-lock-alt"></i>
              <input
                onChange={(e) => handleChange(e)}
                type={"password"}
                placeholder="Confirm Password"
                name="confirmPassword"
              />
            </div>
          )}
        </div>
        {props.login ? (
          <button onClick={() => handleLoginSubmit()} className={styles.button}>
            Login
          </button>
        ) : (
          <button
            onClick={() => handleRegisterSubmit()}
            className={styles.button}
          >
            REGISTER
          </button>
        )}

        {props.login ? (
          <p className={styles.lastPara}>
            Not a user?{" "}
            <span onClick={() => handleRegister()} className={styles.color}>
              Register instead
            </span>
          </p>
        ) : (
          <p className={styles.lastPara}>
            Already a user?{" "}
            <span onClick={() => handleLogin()} className={styles.color}>
              Login instead
            </span>
          </p>
        )}
        <div onClick={() => handleClose()} className={styles.close}>
          <i class="bx bx-x"></i>
        </div>
      </div>
    </div>
  );
};

export default LoginSection;
