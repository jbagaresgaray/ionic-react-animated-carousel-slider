import React from "react";
import { IonIcon } from "@ionic/react";
import { star, starOutline } from "ionicons/icons";
import "./Rating.scss";

interface Props {
  rating: number;
}

const Rating: React.FC<Props> = ({ rating }) => {
  const filledStars = Math.floor(rating / 2);
  const maxStars = Array(5 - filledStars).fill(starOutline);
  const r = [...Array(filledStars).fill(star), ...maxStars];

  return (
    <div className="rating">
      <p className="ratingNumber">{rating}</p>
      {r.map((type, index) => {
        return <IonIcon key={index} icon={type} color="danger" />;
      })}
    </div>
  );
};

export default Rating;
