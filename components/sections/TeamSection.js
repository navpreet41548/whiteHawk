import React from "react";
import styles from "../../styles/TeamSection.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import Image from "next/image";

const TeamSection = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>OUR TEAM</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          300: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          400: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          500: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          650: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },

          900: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1150: {
            slidesPerView: 3.5,
            spaceBetween: "10%",
          },
          1400: {
            slidesPerView: 5,
            spaceBetween: "5%",
          },
        }}
        modules={[Pagination]}
        className={styles.cardContainer}
      >
        <SwiperSlide className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image
              src={"/static/images/profile.webp"}
              width="200"
              height={"200"}
              alt="j"
              className={styles.image}
            />
          </div>
          <h2 className={styles.heading}>AVTAR BRAR</h2>
          <p className={styles.para}>
            Lorem Ipsum dolor sit amet consecteture adpiscing elit.
          </p>
          <h2 className={styles.cardTitle}>MATHEMATIC&apos;S TEACHER</h2>
          <div className={styles.socialContainer}>
            <a href="">
              <i class="bx bx-phone"></i>
            </a>
            <a href="">
              <i class="bx bxl-instagram"></i>
            </a>
            <a href="">
              <i class="bx bxl-facebook"></i>
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image
              src={"/static/images/profile.webp"}
              width="200"
              height={"200"}
              alt="j"
              className={styles.image}
            />
          </div>
          <h2 className={styles.heading}>AVTAR BRAR</h2>
          <p className={styles.para}>
            Lorem Ipsum dolor sit amet consecteture adpiscing elit.
          </p>
          <h2 className={styles.cardTitle}>MATHEMATIC&apos;S TEACHER</h2>
          <div className={styles.socialContainer}>
            <a href="">
              <i class="bx bx-phone"></i>
            </a>
            <a href="">
              <i class="bx bxl-instagram"></i>
            </a>
            <a href="">
              <i class="bx bxl-facebook"></i>
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image
              src={"/static/images/profile.webp"}
              width="200"
              height={"200"}
              alt="j"
              className={styles.image}
            />
          </div>
          <h2 className={styles.heading}>AVTAR BRAR</h2>
          <p className={styles.para}>
            Lorem Ipsum dolor sit amet consecteture adpiscing elit.
          </p>
          <h2 className={styles.cardTitle}>MATHEMATIC&apos;S TEACHER</h2>
          <div className={styles.socialContainer}>
            <a href="">
              <i class="bx bx-phone"></i>
            </a>
            <a href="">
              <i class="bx bxl-instagram"></i>
            </a>
            <a href="">
              <i class="bx bxl-facebook"></i>
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image
              src={"/static/images/profile.webp"}
              width="200"
              height={"200"}
              alt="j"
              className={styles.image}
            />
          </div>
          <h2 className={styles.heading}>AVTAR BRAR</h2>
          <p className={styles.para}>
            Lorem Ipsum dolor sit amet consecteture adpiscing elit.
          </p>
          <h2 className={styles.cardTitle}>MATHEMATIC&apos;S TEACHER</h2>
          <div className={styles.socialContainer}>
            <a href="">
              <i class="bx bx-phone"></i>
            </a>
            <a href="">
              <i class="bx bxl-instagram"></i>
            </a>
            <a href="">
              <i class="bx bxl-facebook"></i>
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image
              src={"/static/images/profile.webp"}
              width="200"
              height={"200"}
              alt="j"
              className={styles.image}
            />
          </div>
          <h2 className={styles.heading}>AVTAR BRAR</h2>
          <p className={styles.para}>
            Lorem Ipsum dolor sit amet consecteture adpiscing elit.
          </p>
          <h2 className={styles.cardTitle}>MATHEMATIC&apos;S TEACHER</h2>
          <div className={styles.socialContainer}>
            <a href="">
              <i class="bx bx-phone"></i>
            </a>
            <a href="">
              <i class="bx bxl-instagram"></i>
            </a>
            <a href="">
              <i class="bx bxl-facebook"></i>
            </a>
          </div>
        </SwiperSlide>

        <div className={styles.banner}></div>
      </Swiper>
    </div>
  );
};

export default TeamSection;
