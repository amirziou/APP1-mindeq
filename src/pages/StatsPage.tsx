import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ExtractingData, { Chaine } from "../firebase/ExtractingData";

import axiosClient from "../firebase/axios-client";
import { db } from "../../config";
import { onValue, ref } from "firebase/database";

const StatsPage = () => {
  const { chaineArray } = ExtractingData();
  const { id } = useParams();

  useEffect(() => {
    console.log("start extracting one chaine data");
    const starCountRef = ref(db, "/");
    onValue(starCountRef, (snapshot) => {
      const controller = new AbortController();
      axiosClient
        .get("/Projet0/chaine" + id + ".json", {
          signal: controller.signal,
        })
        .then((res) => {
          const chaineArrayOne: Chaine = Object.values(res.data); // Convert object values to an array
          console.log(chaineArrayOne);
        });

      return () => controller.abort();
    });
  }, []);

  return <div></div>;
};
export default StatsPage;
