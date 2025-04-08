import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import texts from "../content/texts.json";

import { EffectCoverflow, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";

const colors = ["yellow", "blue", "green", "pink"];

const testimonials = [
  {
    id: 1,
    name: texts.index.opinie.testimonial1Author,
    text: texts.index.opinie.testimonial1,
  },
  {
    id: 2,
    name: texts.index.opinie.testimonial2Author,
    text: texts.index.opinie.testimonial2,
  },
  {
    id: 3,
    name: texts.index.opinie.testimonial3Author,
    text: texts.index.opinie.testimonial3,
  },
  {
    id: 4,
    name: texts.index.opinie.testimonial4Author,
    text: texts.index.opinie.testimonial4,
  },
  {
    id: 5,
    name: texts.index.opinie.testimonial5Author,
    text: texts.index.opinie.testimonial5,
  },
];

// set initial slide for mobile and others
export default function TestimonialSlider() {
  const [isMobile, setIsMobile] = useState(false);
  const [swiperKey, setSwiperKey] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const initialSlideIndex = isMobile ? 0 : 2;

  useEffect(() => {
    setSwiperKey((prevKey) => prevKey + 1);
  }, [isMobile]);

  return (
    <Swiper
      key={swiperKey}
      modules={[EffectCoverflow, Pagination]}
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 0,
        stretch: 56,
        depth: 100,
        modifier: 2.5,
        slideShadows: false,
      }}
      pagination={false}
      className="w-full py-10"
      initialSlide={initialSlideIndex}
    >
      {testimonials.map((t, index) => (
        <SwiperSlide
          key={t.id}
          className="flex! flex-col justify-between bg-white rounded-[40px] border-4 border-grey max-w-full md:max-w-[480px] min-h-[400px] p-6 mx-auto"
        >
          <div className="flex flex-col items-end gap-2 md:gap-3">
            <svg
              style={{ fill: `var(--color-${colors[index % colors.length]})` }}
              width="24"
              height="21"
              viewBox="0 0 24 21"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.56301 -0.00292969V4.01904C8.29152 4.0892 7.32875 4.32125 6.67572 4.71568C6.02218 5.11011 5.5631 5.74961 5.29797 6.6347C5.03335 7.51978 4.90054 8.78576 4.90054 10.4331H9.56301V20.0282H0V10.9063C0 7.13838 0.807902 4.37839 2.42371 2.62576C4.04001 0.873133 6.41961 -0.00292969 9.56301 -0.00292969ZM24 -0.00292969V4.01904C22.7285 4.0892 21.7662 4.31273 21.1127 4.68962C20.4592 5.066 19.9865 5.70601 19.6954 6.60863C19.4042 7.51076 19.2583 8.78576 19.2583 10.4331H24V20.0282H14.3844V10.9063C14.3844 7.13838 15.1878 4.37839 16.7945 2.62576C18.4018 0.873133 20.8035 -0.00292969 24 -0.00292969Z" />
            </svg>
            <p className="text-text text-xl">{t.text}</p>
          </div>
          <div className="flex items-center gap-2 justify-start">
            <div
              className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-medium text-2xl`}
              style={{
                backgroundColor: `var(--color-${colors[index % colors.length]})`,
              }}
            >
              {t.name[0]}
            </div>
            <span className="font-medium text-lg">{t.name}</span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
