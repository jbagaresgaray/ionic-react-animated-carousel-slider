import {
  IonContent,
  IonHeader,
  IonPage,
  IonSlides,
  IonSlide,
  IonImg,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import "./Home.scss";
import { getMovies } from "../utils/api";
import AppLoading from "../components/AppLoading/AppLoading";
import Genres from "../components/Genres/Genres";
import Rating from "../components/Rating/Rating";
import Backdrop from "../components/Backdrop/Backdrop";
import {
  BACKDROP_HEIGHT,
  EMPTY_ITEM_SIZE,
  ITEM_SIZE,
  ITouchesRange,
  SPACING,
} from "../utils/config";

const Home: React.FC = () => {
  const slideOpts = {
    initialSlide: 0,
    spaceBetween: -80,
    centeredSlides: true,
  };
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [movies, setMovies] = useState<any[]>([]);
  const [translateX, setTranslateX] = useState<any>(null);
  const [scrollX, setScrollX] = useState<ITouchesRange>({
    currentX: 0,
    currentY: 0,
    diff: 0,
    startX: 0,
    startY: 0,
  });
  const slider: any = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      setMovies([{ key: "empty-left" }, ...movies, { key: "empty-right" }]);
    };

    if (movies.length === 0) {
      fetchData();
    }
  }, [movies]);

  const getContentScroll = async (e: any) => {
    const swiper = await e.target.getSwiper();
    // console.log("swiper: ", swiper.touches);
    setScrollX(swiper.touches);
    // setTranslateX(swiper.translate);
  };

  const styles: any = {
    posterImage: {
      width: "100%",
      height: `${ITEM_SIZE * 1.2}px`,
      objectFit: "cover",
      borderRadius: "24px",
      margin: 0,
      marginBottom: "10px",
    },
  };

  return (
    <IonPage className="HomePage">
      <IonContent fullscreen>
        {movies.length === 0 && <AppLoading />}

        {movies.length !== 0 && (
          <>
            <Backdrop movies={movies} translateX={translateX} />
            <div
              className="SlidesContainer"
            >
              <IonSlides
                className="AnimatedSlides"
                options={slideOpts}
                onIonSlideDrag={getContentScroll}
                ref={slider}
              >
                {movies &&
                  movies.map((item, index) => {
                    const inputRange = [
                      (index - 2) * ITEM_SIZE,
                      (index - 1) * ITEM_SIZE,
                      index * ITEM_SIZE,
                    ];

                    console.log("inputRange: ", inputRange);

                    // const translateY = scrollX({
                    //   inputRange,
                    //   outputRange: [100, 50, 100],
                    //   extrapolate: 'clamp',
                    // });

                    if (item.poster) {
                      return (
                        <IonSlide key={index}>
                          <div
                            className="movie-slide"
                            style={{
                              width: `${ITEM_SIZE}px`,
                              marginLeft: `${SPACING}px`,
                              marginRight: `${SPACING}px`,
                              padding: `calc(${SPACING}px * 2)`,
                              backgroundColor: "#fff",
                              borderRadius: "34px",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <img
                              alt="alt-img"
                              src={item.poster}
                              style={styles.posterImage}
                            />
                            <div className="slide">
                              <h2>{item.title}</h2>
                              {item.rating && <Rating rating={item.rating} />}
                              {item.genres && <Genres genres={item.genres} />}
                              <p>{item.description}</p>
                            </div>
                          </div>
                        </IonSlide>
                      );
                    }
                  })}
              </IonSlides>
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
