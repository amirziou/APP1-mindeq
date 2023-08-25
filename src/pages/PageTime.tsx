import React, { useState } from "react";
import TimeSelector from "../components/TimeSelector";
import StatsPageHeure from "./StatsPageHeure";
import StatsPageJour from "./StatsPageJour";
import StatsPageSem from "./StatsPageMois";
import StatsPageMois from "./StatsPageMois";

const PageTime = () => {
  const [Time, setTime] = useState("");

  console.log(Time);

  return (
    <>
      <TimeSelector
        onTimeSet={(a: string) => {
          setTime(a);
        }}
      />

      {Time === "heure" ? <StatsPageHeure /> : null}
      {Time === "jour" ? <StatsPageJour /> : null}
      {Time === "mois" ? <StatsPageMois /> : null}
    </>
  );
};

export default PageTime;
