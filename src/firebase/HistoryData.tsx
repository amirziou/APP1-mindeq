import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Chaine } from "../firebase/ExtractingData";
import axiosClient from "../firebase/axios-client";
import { db } from "../../config";
import { onValue, ref } from "firebase/database";

const HistoryData = () => {
  const [ONEchaineArray, setONEchaineArray] = useState<Chaine>([]);
  const { id } = useParams();
  const [dateObjects, setDateObjects] = useState<Chaine>([]);

  useEffect(() => {
    console.log("start extracting one chaine data");
    const starCountRef = ref(db, "/");
    onValue(starCountRef, (snapshot) => {
      const controller = new AbortController();
      axiosClient
        .get("/HistoryPrjt0/chaine" + id + ".json", {
          signal: controller.signal,
        })
        .then((res) => {
          const ch: Chaine = Object.values(res.data); // Convert object values to an array
          setONEchaineArray(ch);
          console.log("ch");
        });

      return () => controller.abort();
    });
  }, []);

  useEffect(() => {
    const convertedDateObjects = ONEchaineArray.map((item) => {
      return {
        ...item,
        timestamp: new Date(parseInt(item.timestamp) * 1000),
      };
    });

    console.log(convertedDateObjects);
  }, [ONEchaineArray]);

  return {
    dateObjects,
  };
};
export default HistoryData;
