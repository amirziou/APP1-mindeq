import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../../config";

import { CanceledError } from "axios";
import axiosClient from "./axios-client";

export type Chaine = {
  id: number;
  cb: number;
  cm: number;
  Etat: number;
}[];

const ExtractingData = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chaineArray, setchaineArray] = useState<Chaine>([]);
  const [Etat, setEtat] = useState(0);

  useEffect(() => {
    console.log("start extracting");
    const starCountRef = ref(db, "/");
    onValue(starCountRef, (snapshot) => {
      const controller = new AbortController();
      console.log("requesting");

      setLoading(true);
      axiosClient
        .get("/Projet0.json", { signal: controller.signal })
        .then((res) => {
          const chaineArrayData: Chaine = Object.values(res.data); // Convert object values to an array
          setchaineArray(chaineArrayData);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });
      return () => controller.abort();
    });
  }, []);

  return {
    chaineArray,
    error,
    isLoading,
    setLoading,
    setError,
    setchaineArray,
  };
};

export default ExtractingData;
