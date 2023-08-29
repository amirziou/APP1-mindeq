import React, { useEffect, useState } from "react";
import TimeSelector from "../components/TimeSelector";
import StatsPageHeure from "./StatsPageHeure";
import StatsPageJour from "./StatsPageJour";
import StatsPageSem from "./StatsPageMois";
import StatsPageMois from "./StatsPageMois";
import Formulaire from "../formulaire/Formulaire";
import DialogForm from "./DialogForm";
import { CanceledError } from "axios";
import { ref, onValue } from "firebase/database";
import { db } from "../../config";
import { Chaine } from "../firebase/ExtractingData";
import axiosClient from "../firebase/axios-client";
import { useParams } from "react-router-dom";
interface Data {
  Reference: string;
  bonne: number;
  client: string;
  faible: number;
  moyenne: number;
  id: string;
  // Add other properties if needed
}

const StatsPageTime = () => {
  const [Time, setTime] = useState("");
  const { id } = useParams();

  console.log(Time);

  return (
    <>
      <TimeSelector
        onTimeSet={(a: string) => {
          setTime(a);
        }}
      />

      <DialogForm
        onSubmit={(data) => {
          data.id = id;
          axiosClient
            .put("/client/" + id + ".json", { data })
            .then((res) => {
              console.log("going data");
              console.log(res.data);
            })
            .catch((err) => {
              if (err instanceof CanceledError) return;
            });
        }}
      />

      {Time === "jour" ? <StatsPageHeure /> : null}
      {/* {Time === "jour" ? <StatsPageJour /> : null} */}
      {Time === "mois" ? <StatsPageMois /> : null}
    </>
  );
};

export default StatsPageTime;
