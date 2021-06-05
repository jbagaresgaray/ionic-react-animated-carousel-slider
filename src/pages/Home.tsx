import {
  IonContent,
  IonPage,
  IonFooter,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./Home.scss";
import { getMovies } from "../utils/api";
import AppLoading from "../components/AppLoading/AppLoading";
import Genres from "../components/Genres/Genres";
import Rating from "../components/Rating/Rating";
import Backdrop from "../components/Backdrop/Backdrop";
import { EMPTY_ITEM_SIZE, ITEM_SIZE, SPACING } from "../utils/config";
import { Swiper, SwiperSlide } from "swiper/react";

const Home: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [slider1, setSlider1] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      setMovies([{ key: "empty-left" }, ...movies, { key: "empty-right" }]);

      if (slider1) {
        slider1.update();
        slider1.updateSlides();
      }
    };

    if (movies.length === 0) {
      fetchData();
    }
  }, [movies, slider1]);

  const styles: any = {
    posterImage: {
      width: "100%",
      height: `${ITEM_SIZE * 1.2}px`,
      objectFit: "cover",
      borderRadius: "24px",
      margin: 0,
      marginBottom: "10px",
    },
    movieSlides: {
      width: `${ITEM_SIZE}px`,
      marginLeft: `${SPACING}px`,
      marginRight: `${SPACING}px`,
      padding: `calc(${SPACING}px * 2)`,
    },
  };

  return (
    <IonPage className="HomePage">
      <IonContent fullscreen scrollY={false}>
        {movies.length === 0 && <AppLoading />}

        {movies.length !== 0 && (
          <>
            <Backdrop movies={movies} slider1={slider1} />
            <div className="SlidesContainer">
              <Swiper
                className="AnimatedSlides"
                initialSlide={0}
                slidesPerView={1.25}
                spaceBetween={40}
                centeredSlides={true}
                watchSlidesProgress={true}
                onSwiper={(swiper) => {
                  setSlider1(swiper);
                }}
                effect={"coverflow"}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 150,
                  modifier: 2,
                  slideShadows: false,
                }}
              >
                {movies.reverse().map((item, index) => {
                  if (!item.poster) {
                    return (
                      <div
                        key={index + "-movies"}
                        style={{ width: EMPTY_ITEM_SIZE }}
                      />
                    );
                  }

                  if (item.poster) {
                    return (
                      <SwiperSlide key={item.key + "-movies"}>
                        <div className="movie-slide" style={styles.movieSlides}>
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
                      </SwiperSlide>
                    );
                  }
                })}
              </Swiper>
            </div>
          </>
        )}
      </IonContent>
      {movies.length !== 0 && (
        <IonFooter className="ion-no-border">
          <IonToolbar className="ion-text-center">
            <IonButton
              color="dark"
              style={{
                width: `${ITEM_SIZE}px`,
                margin: `0 auto`,
              }}
            >
              Buy Ticket
            </IonButton>
          </IonToolbar>
        </IonFooter>
      )}
    </IonPage>
  );
};

export default Home;
