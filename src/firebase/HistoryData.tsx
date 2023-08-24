import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Chaine } from "../firebase/ExtractingData";
import axiosClient from "../firebase/axios-client";
import { db } from "../../config";
import { onValue, ref } from "firebase/database";
let b = 0;
interface GroupedData {
  [dateKey: string]: {
    [hour: string]: {
      cb: number;
      cm: number;
    };
  };
}

const HistoryData = () => {
  const [ONEchaineArray, setONEchaineArray] = useState<Chaine>([]);
  const { id } = useParams();
  const [organizedData, setOrganizedData] = useState<GroupedData>({});

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

    const groupedData: GroupedData = {};

    convertedDateObjects.forEach((item) => {
      const heure = item.timestamp.getHours();
      const jour = item.timestamp.getDate(); //gives me day from 1-31
      const mois = item.timestamp.getMonth() + 1;
      const annee = item.timestamp.getFullYear();
      const dateKey = jour + "/" + mois + "/" + annee;

      if (!groupedData[dateKey]) {
        groupedData[dateKey] = {};
      }
      if (!groupedData[dateKey][heure]) {
        groupedData[dateKey][heure] = { cb: 0, cm: 0 };
      }

      let a = Number(item.cb);
      let b = Number(item.cm);

      groupedData[dateKey][heure].cb += a;
      groupedData[dateKey][heure].cm += b;

      setOrganizedData(groupedData);
    });
  }, [ONEchaineArray]);

  return (
    <>
      <div className="App">
        <h4>Données Organisées en jour et en heure</h4>
        {Object.keys(organizedData).map((dateKey) => (
          <div key={dateKey}>
            <h2>{dateKey}</h2>
            {Object.keys(organizedData[dateKey]).map((heure) => (
              <div key={heure}>
                <p>Heure: {heure}:00</p>
                <p>CB: {organizedData[dateKey][heure].cb}</p>
                <p>CM: {organizedData[dateKey][heure].cm}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
export default HistoryData;
