import React from "react";
import {
  IonSpinner,
} from "@ionic/react";

const AppLoading: React.FC = () => {
  return (
    <div className="ion-text-center ion-padding-top loading-view">
      <IonSpinner />
    </div>
  );
};

export default AppLoading;
