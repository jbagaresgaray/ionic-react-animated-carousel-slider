import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BACKDROP_HEIGHT } from "../../utils/config";
import "./Backdrop.scss";

interface Props {
  movies: any[];
  index?: number;
  translateX?: number;
  slider1?: any;
}

const Backdrop: React.FC<Props> = ({ movies, slider1 }) => {
  const [slider2, setSlider2] = useState<any>(null);
  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    if (slider1) {
      slider1.controller.control = slider2;
    }
    if (slider2) {
      slider2.controller.control = slider1;
    }
  }, [slider1, slider2]);

  return (
    <div style={{ height: "100%", width, position: "absolute" }}>
      <Swiper
        className="BackdropSlides"
        initialSlide={0}
        dir={"rtl"}
        watchSlidesProgress
        style={{ height: BACKDROP_HEIGHT }}
        parallax={true}
        onSwiper={(swiper) => {
          setSlider2(swiper);
          const interleaveOffset = -0.5;
          swiper.on("progress", function () {
            for (let i = 0; i < swiper.slides.length; i++) {
              const $slideEl: any = swiper.slides[i];
              let slideProgress = $slideEl.progress,
                innerOffset = swiper.width * interleaveOffset,
                innerTranslate = slideProgress * innerOffset;

              $slideEl.querySelector(".slide-image").style.transform =
                "translateX(" + innerTranslate + "px)";

              // $slideEl.querySelector(".slide-image").style.transform =
              //   "translate3d(" + innerTranslate + "px, 0, 0)";
            }
          });
          swiper.on("touchStart", function () {
            for (let i = 0; i < swiper.slides.length; i++) {
              const $slideEl: any = swiper.slides[i];
              $slideEl.style.transition = "";
            }
          });
          swiper.on("setTransition", function (speed) {
            for (let i = 0; i < swiper.slides.length; i++) {
              const $slideEl: any = swiper.slides[i];
              $slideEl.style.transition = speed + "ms";
              $slideEl.querySelector(".slide-image").style.transition =
                speed + "ms";
            }
          });
        }}
      >
        {movies &&
          movies.map((item, index) => {
            if (item.backdrop) {
              return (
                <SwiperSlide
                  key={item.key + "-backdrop"}
                  style={{
                    alignItems: "flex-start",
                    height,
                    overflow: "hidden",
                  }}
                >
                  <img
                    alt="alt-img"
                    className="slide-image"
                    src={item.backdrop}
                    style={{
                      width,
                      height: BACKDROP_HEIGHT,
                      objectFit: "cover",
                    }}
                  />
                </SwiperSlide>
              );
            }
          })}
      </Swiper>
      <div className="show_bg_2" style={{ height: BACKDROP_HEIGHT }} />
    </div>
  );
};

export default Backdrop;
