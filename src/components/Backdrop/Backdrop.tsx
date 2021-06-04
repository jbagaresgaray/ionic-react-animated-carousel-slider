import { IonSlides, IonSlide, IonImg } from "@ionic/react";
import { useEffect, useRef } from "react";
import { BACKDROP_HEIGHT, ITEM_SIZE, ITouchesRange } from "../../utils/config";
import "./Backdrop.scss";

interface Props {
  movies: any[];
  index?: number;
  translateX?: number;
  scrollX?: ITouchesRange;
}

const Backdrop: React.FC<Props> = ({ movies, translateX, scrollX }) => {
  const slideOpts = {
    initialSlide: 1,
  };
  const slider: any = useRef(null);
  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    const slideTo = async () => {
      const swiper = await slider.current.getSwiper();
    //   console.log("scrollX: ", scrollX);
    //   swiper.setTranslate(translateX);
    };

    slideTo();
  }, [scrollX]);

  return (
    <div style={{ height: "100%", width, position: "absolute" }}>
      <IonSlides
        className="BackdropSlides"
        style={{ height: BACKDROP_HEIGHT }}
        options={slideOpts}
        ref={slider}
      >
        {movies &&
          movies.reverse().map((item, index) => {
            //   const translateX = scrollX.interpolate({
            //     inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            //     outputRange: [0, width],
            //   });

            if (item.backdrop) {
              return (
                <IonSlide
                  key={index}
                  style={{
                    alignItems: "flex-start",
                    height,
                    overflow: "hidden",
                  }}
                >
                  <img
                    alt="alt-img"
                    src={item.backdrop}
                    style={{
                      width,
                      height: BACKDROP_HEIGHT,
                      objectFit: "cover",
                    }}
                  />
                </IonSlide>
              );
            }
          })}
      </IonSlides>
      <div className="show_bg_2" style={{ height: BACKDROP_HEIGHT, }} />
    </div>
  );
};

export default Backdrop;
