'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// @ts-expect-error типы не работают с этим свайпером
import 'swiper/css';
import { Category } from '../../lib/definitions';
import Image from 'next/image';
import styles from './swiper.module.css'

export default function swiper({ categories }: { categories: Category[] }) {
  return (
    <Swiper className={styles.mySwiper}
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      // navigation
      // pagination={{ clickable: true }}
      // autoplay={{
      //   delay: 4000,
      //   disableOnInteraction: false,
      // }}
      >
      {categories.map((category) => (
        <SwiperSlide key={category.category_id}>
          <div
            className="category-slide"
            // onClick={() => handleCategoryClick(category)}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.categoryImageContainer}>
              <Image
                src={ `/uploads/categories/${category.picture}`}
                alt={category.category_name}
                className="category-image"
                width={'500'}
                height={'500'}
              />
            </div>
            <div className="category-name">
              <h3>{category.category_name}</h3>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};