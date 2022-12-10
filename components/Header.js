import Image from "next/image";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import styles from "../styles/Header.module.css";
import logoutConfirmStyles from "/styles/popup/LogoutConfirm.module.css";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import cookies from "js-cookie";
import LogoutConfirm from "./element/popup/LogoutConfirm";
import { updateForm } from "../store/formSlice";
import { useRouter } from "next/router";
import { addUser, removeUser } from "../store/userSlice";

const Header = () => {
  const Router = useRouter();
  const cart = useSelector((state) => state.cart);
  const form = useSelector((state) => state.formSlice);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [cartItem, setCartItem] = useState();
  const [user, setUser] = useState({});
  const [logout, setLogout] = useState(false);
  const [loginMessage, setLoginMessage] = useState();

  const hasWindow = typeof window !== "undefined";
  const width = hasWindow ? window.innerWidth : null;

  const userIconClick = () => {
    setIsVisible(!isVisible);
  };

  const burgerIconClick = () => {
    if (width <= 650) setNavOpen(false);
    setNavOpen(!navOpen);
  };

  const fetchUser = async () => {
    const token = cookies.get("token");
    const data = await fetch(`${process.env.BASE_URL}/api/auth/verify`, {
      method: "GET",
      headers: {
        token,
      },
    });
    const dbData = await data.json();
    if (dbData.data) {
      dispatch(addUser(dbData.data));
      // setUser(dbData.data);
      setUser(userState.user);
    } else {
      dispatch(addUser({}));
      setUser({});
    }
  };

  const handleLogout = () => {
    setLogout(true);
  };
  const handleLogin = () => {
    Router.push(`/shop/home`);
    dispatch(updateForm({ login: true, visible: true }));
  };

  const handleNo = () => {
    setLogout(false);
  };

  const handleYes = async () => {
    const data = await fetch(`${process.env.BASE_URL}/api/user/logout`, {
      method: "POST",
    });
    const dbData = await data.json();
    if (!dbData.err) {
      setLogout(false);

      dispatch(updateForm({ login: false, visible: false }));
      dispatch(removeUser());
      Router.push(`/shop/home`);
    }
  };

  useEffect(() => {
    setCartItem(cart.cartItem);
    setCartItem((state) => {
      return state;
    });
    fetchUser();
  }, [cart, form, userState.state]);

  const popup = () => (
    <ul className={styles.ul}>
      {user.email && !user.admin && <li> {user.name} </li>}
      {user.email && !user.admin && <li> {user._id} </li>}
      {user.admin && (
        <li>
          <Link href={"/shop/admin/createProduct"}>Create Product</Link>
        </li>
      )}
      {user.email ? (
        <li onClick={() => handleLogout()} className={styles.logout}>
          <span>Logout</span>
        </li>
      ) : (
        <li onClick={() => handleLogin()} className={styles.logout}>
          <span>Login</span>
        </li>
      )}
    </ul>
  );

  return (
    <div className={styles.wrapper}>
      {navOpen ? (
        <div className={styles.burger} onClick={burgerIconClick}>
          <div className={`${styles.burgerLine} ${styles.burgerLine1}`}></div>
          <div className={`${styles.burgerLine} ${styles.burgerLine2}`}></div>
          <div className={`${styles.burgerLine} ${styles.burgerLine3}`}></div>
        </div>
      ) : (
        <div className={styles.burger} onClick={burgerIconClick}>
          <div className={`${styles.burgerLine} `}></div>
          <div className={`${styles.burgerLine}`}></div>
          <div className={`${styles.burgerLine}`}></div>
        </div>
      )}
      <nav className={styles.nav}>
        <div className={styles.left}>
          <Image
            src="/static/images/logo/logo.jpg"
            alt="Logo"
            width={100}
            height={100}
          />
          <p>WhiteHawk</p>
        </div>

        {navOpen ? (
          <div className={`${styles.center}`}>
            <ul>
              <li className={styles.centerLi}>
                <Link href="/">HOME</Link>
              </li>
              <li className={styles.centerLi}>
                <Link href="/shop/home">SHOP</Link>
              </li>
              <li className={styles.centerLi}>
                <Link href="/contact">CONTACT US</Link>
              </li>
            </ul>
            <div className={styles.right2}>
              <ul className={styles.rightUl2}>
                <li className={styles.icons2}>
                  <Link href={"/shop/cart"}>
                    <i className="bx bx-cart"></i>
                  </Link>
                  {cartItem && <p> {cartItem.length}</p>}
                </li>
                <li className={styles.icons2}>
                  <Link href={"/shop/wishlist"}>
                    <i className="bx bx-heart"></i>
                  </Link>
                </li>
                <li
                  data-name="userIcon"
                  className={`${styles.icons2}`}
                  onClick={userIconClick}
                >
                  {isVisible ? (
                    <a>
                      <i className={`${"bx bx-user"} ${styles.active}`}></i>
                    </a>
                  ) : (
                    <a>
                      <i className="bx bx-user"></i>
                    </a>
                  )}
                </li>

                {isVisible ? (
                  <div data-name="popup" className={styles.popup}>
                    {popup()}
                  </div>
                ) : (
                  <div
                    data-name="popup"
                    className={`${styles.popup} ${styles.dNone}`}
                  >
                    {popup()}
                  </div>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <div className={`${styles.center} ${styles.transform}`}>
            <ul>
              <li className={styles.centerLi}>
                <Link href="/">HOME</Link>
              </li>
              <li className={styles.centerLi}>
                <Link href="/shop/home">SHOP</Link>
              </li>
              <li className={styles.centerLi}>
                <Link href="/contact">CONTACT US</Link>
              </li>
            </ul>
            <div className={styles.right2}>
              <ul className={styles.rightUl2}>
                <li className={styles.icons2}>
                  <Link href={"/shop/cart"}>
                    <i className="bx bx-cart"></i>
                  </Link>
                  {cartItem && <p> {cartItem.length}</p>}
                </li>
                <li className={styles.icons2}>
                  <Link href={"/shop/wishlist"}>
                    <i className="bx bx-heart"></i>
                  </Link>
                </li>
                <li
                  data-name="userIcon"
                  className={`${styles.icons2}`}
                  onClick={userIconClick}
                >
                  <a>
                    <i className="bx bx-user"></i>
                  </a>
                </li>

                {isVisible ? (
                  <div data-name="popup" className={styles.popup}>
                    {popup()}
                  </div>
                ) : (
                  <div
                    data-name="popup"
                    className={`${styles.popup} ${styles.dNone}`}
                  >
                    {popup()}
                  </div>
                )}
              </ul>
            </div>
          </div>
        )}

        <div className={styles.right}>
          <ul className={styles.rightUl}>
            <li className={styles.icons}>
              <Link href={"/shop/cart"}>
                <i className="bx bx-cart"></i>
                {cartItem && <p> {cartItem.length}</p>}
              </Link>
            </li>
            <li className={styles.icons}>
              <Link href={"/shop/wishlist"}>
                <i className="bx bx-heart"></i>
              </Link>
            </li>
            <li
              data-name="userIcon"
              className={`${styles.icons}`}
              onClick={userIconClick}
            >
              {isVisible ? (
                <a>
                  <i className={`${"bx bx-user"} ${styles.active}`}></i>
                </a>
              ) : (
                <a>
                  <i className="bx bx-user"></i>
                </a>
              )}
            </li>

            {isVisible ? (
              <div data-name="popup" className={styles.popup}>
                {popup()}
              </div>
            ) : (
              <div
                data-name="popup"
                className={`${styles.popup} ${styles.dNone}`}
              >
                {popup()}
              </div>
            )}
          </ul>
        </div>
      </nav>
      {logout && (
        <div
          data-container
          className={logoutConfirmStyles.logoutConfirmWrapper}
        >
          <div className={logoutConfirmStyles.logoutConfirmContainer}>
            <p>Do you want to Logout </p>
            <div className={logoutConfirmStyles.buttonContainer}>
              <button onClick={() => handleYes()}>Yes</button>
              <button onClick={() => handleNo()}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
