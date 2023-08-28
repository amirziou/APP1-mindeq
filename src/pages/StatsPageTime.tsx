import React, { useState } from "react";
import TimeSelector from "../components/TimeSelector";
import StatsPageHeure from "./StatsPageHeure";
import StatsPageJour from "./StatsPageJour";
import StatsPageSem from "./StatsPageMois";
import StatsPageMois from "./StatsPageMois";
import Formulaire from "../formulaire/Formulaire";
import DialogForm from "./DialogForm";

const StatsPageTime = () => {
  const [Time, setTime] = useState("");

  console.log(Time);

  return (
    <>
      <TimeSelector
        onTimeSet={(a: string) => {
          setTime(a);
        }}
      />

      <DialogForm onSubmit={(data) => console.log(data)} />

      {Time === "heure" ? <StatsPageHeure /> : null}
      {Time === "jour" ? <StatsPageJour /> : null}
      {Time === "mois" ? <StatsPageMois /> : null}
    </>
  );
};

export default StatsPageTime;
