import React, { useEffect, useState } from "react";
import styles from "../../styles/shop/CategorySection.module.css";
import CategoryElement from "../element/CategoryElement";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useSelector } from "react-redux";

const CategorySection = (props) => {
  const userState = useSelector((state) => state.user);
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(userState.user);
  }, [userState.user]);

  return (
    <div className={styles.categoryContainer}>
      <h2 className={styles.title}>PRODUCT CATEGORIES</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          300: {
            slidesPerView: 1.2,
            spaceBetween: 20,
          },
          400: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          500: {
            slidesPerView: 2.2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3.2,
            spaceBetween: 30,
          },
          924: {
            slidesPerView: 3.2,
            spaceBetween: 50,
          },
          1150: {
            slidesPerView: 4.2,
            spaceBetween: 50,
          },
          1500: {
            slidesPerView: 5.5,
            spaceBetween: 50,
          },
          1850: {
            slidesPerView: 6.5,
            spaceBetween: 50,
          },
          2150: {
            slidesPerView: 7.5,
            spaceBetween: 50,
          },
          2450: {
            slidesPerView: 8.5,
            spaceBetween: 50,
          },
        }}
        // modules={[Pagination]}
        className={`${"mySwiper"} ${styles.swiperContainer}`}
      >
        {props.categories &&
          props.categories.map((item, i) => (
            <SwiperSlide key={i} className={styles.card}>
              <CategoryElement
                imageSrc={item.imageSrc}
                title="PHYSICS STUDY MATERIAL"
                slug={item.slug}
                name={item.name}
                id={item._id}
                new={false}
              />
            </SwiperSlide>
          ))}
        {user && user.admin && (
          <SwiperSlide className={styles.card}>
            <CategoryElement new={true} />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default CategorySection;
