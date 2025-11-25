'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Category } from '../../lib/definitions';
import Image from 'next/image';
import styles from './swiper.module.css'

export default function SwiperComponent({ categories }: { categories: Category[] }) {
  return (
    <Swiper 
      className={styles.mySwiper}
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop={true}
    >
      {categories.map((category) => (
        <SwiperSlide key={category.category_id}>
          <div className={styles.slide}>
            <Image
              src={`/uploads/categories/${category.picture}`}
              alt={category.category_name}
              fill
              className={styles.image}
            />
            <div className={styles.overlay}>
              <h3 className={styles.title}>{category.category_name}</h3>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};