import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { artists } from '../../assets/assets';


const Friends = () => {
  const images = [
    artists.a1,
    artists.a2,
    artists.a3,
    artists.a4,
    artists.a5,
    artists.a6,
    artists.a7,
    artists.a8,
    artists.a9,
    artists.a10
  ];

  return (
    <section className="friends">
      <div className="heading">
        <h2 className="section-title">Barátaink</h2>
        <h3>Akik minket választottak</h3>
        <div className="artists">
          <div className="row">
            <span>Hegyi Anna</span> -
            <span>Kovács Péter</span> -
            <span>Lone Wolf</span> -
            <span>Sunny Days</span> -
            <span>Az esti fény</span> 
          </div>
          <div className="row">
            <span>Naptündér</span> -
            <span>Sötét Szív</span> -
            <span>Raging Storm</span> -
            <span>Cloudy Boys</span>
          </div>
        </div>

      </div>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0} // Képek közötti tér
        slidesPerView={'auto'}
        loop={true} // Kép forgatás
        autoplay={{ delay: 2000 }} // Automatikus görgetés 2 másodpercenként
        pagination={{ clickable: false }} // Oldalszámok megjelenítése
        navigation={false}

      >
        {images.map((src, i) => (
          <SwiperSlide key={i} style={{ width: '220px' }}>
            <img src={src} alt={`Barátaink ${i + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Friends;
