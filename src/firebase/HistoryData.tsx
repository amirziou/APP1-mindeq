import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Chaine } from "../firebase/ExtractingData";
import axiosClient from "../firebase/axios-client";
import { db } from "../../config";
import { onValue, ref } from "firebase/database";
import { Divider, HStack, Heading, SimpleGrid, Text } from "@chakra-ui/react";

let b = 0;
interface GroupedData {
  [year: string]: {
    [month: string]: {
      [weekNumber: string]: {
        [dateKey: string]: {
          [hour: string]: {
            cb: number;
            cm: number;
          };
        };
      };
    };
  };
}

const HistoryData = () => {
  const [ONEchaineArray, setONEchaineArray] = useState<Chaine>([]);
  const { id } = useParams();
  const [organizedData, setOrganizedData] = useState<GroupedData>({});

  const getWeekNumber = (date: Date) => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const timeDiff = date.getTime() - oneJan.getTime();
    const dayOfYear = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil(dayOfYear / 7);
    return weekNumber;
  };

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
      const weekNumber = getWeekNumber(item.timestamp);

      if (!groupedData[annee]) {
        groupedData[annee] = {};
      }
      if (!groupedData[annee][mois]) {
        groupedData[annee][mois] = {};
      }
      if (!groupedData[annee][mois][weekNumber]) {
        groupedData[annee][mois][weekNumber] = {};
      }
      if (!groupedData[annee][mois][weekNumber][dateKey]) {
        groupedData[annee][mois][weekNumber][dateKey] = {};
      }
      if (!groupedData[annee][mois][weekNumber][dateKey][heure]) {
        groupedData[annee][mois][weekNumber][dateKey][heure] = { cb: 0, cm: 0 };
      }

      let a = Number(item.cb);
      let b = Number(item.cm);

      groupedData[annee][mois][weekNumber][dateKey][heure].cb += a;
      groupedData[annee][mois][weekNumber][dateKey][heure].cm += b;
      console.log(groupedData);

      setOrganizedData(groupedData);
    });
  }, [ONEchaineArray]);

  return (
    <div className="App">
      <h4>Données Organisées en jour et en heure</h4>
      {Object.keys(organizedData).map((annee) => (
        <div key={annee}>
          <h2>{`Année: ${annee}`}</h2>
          {Object.keys(organizedData[annee]).map((mois) => (
            <div key={mois}>
              <h3>{`Mois: ${mois}`}</h3>
              {Object.keys(organizedData[annee][mois]).map((weekNumber) => (
                <div key={weekNumber}>
                  <h4>{`Semaine: ${weekNumber}`}</h4>
                  {Object.keys(organizedData[annee][mois][weekNumber]).map(
                    (dateKey) => (
                      <div key={dateKey}>
                        <h5>Jour: {dateKey}</h5>
                        {Object.keys(
                          organizedData[annee][mois][weekNumber][dateKey]
                        ).map((heure) => (
                          <div key={heure}>
                            <p>Heure: {heure}:00</p>
                            <p>
                              CB:{" "}
                              {
                                organizedData[annee][mois][weekNumber][dateKey][
                                  heure
                                ].cb
                              }
                            </p>
                            <p>
                              CM:{" "}
                              {
                                organizedData[annee][mois][weekNumber][dateKey][
                                  heure
                                ].cm
                              }
                            </p>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default HistoryData;
