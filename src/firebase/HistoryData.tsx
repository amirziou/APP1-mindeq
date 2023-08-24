import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Chaine } from "../firebase/ExtractingData";
import axiosClient from "../firebase/axios-client";
import { db } from "../../config";
import { onValue, ref } from "firebase/database";
import { Divider, HStack, Heading, SimpleGrid, Text } from "@chakra-ui/react";

let b = 0;
interface GroupedData {
  [weekNumber: string]: {
    [dateKey: string]: {
      [hour: string]: {
        cb: number;
        cm: number;
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

      if (!groupedData[weekNumber]) {
        groupedData[weekNumber] = {};
      }
      if (!groupedData[weekNumber][dateKey]) {
        groupedData[weekNumber][dateKey] = {};
      }
      if (!groupedData[weekNumber][dateKey][heure]) {
        groupedData[weekNumber][dateKey][heure] = { cb: 0, cm: 0 };
      }

      let a = Number(item.cb);
      let b = Number(item.cm);

      if (!groupedData[weekNumber][dateKey]) {
        groupedData[weekNumber][dateKey][heure] = { cb: 0, cm: 0 };
      }
      groupedData[weekNumber][dateKey][heure].cb += a;
      groupedData[weekNumber][dateKey][heure].cm += b;
      console.log(groupedData);

      setOrganizedData(groupedData);
    });
  }, [ONEchaineArray]);

  return (
    <div className="App">
      <Text fontSize={30}>Données Organisées en jour et en heure</Text>
      {Object.keys(organizedData).map((weekNumber) => (
        <div key={weekNumber}>
          <Text fontSize={25}>{`Week: ${weekNumber}`}</Text>
          {Object.keys(organizedData[weekNumber]).map((dateKey) => (
            <div key={dateKey}>
              <Text fontSize={20}>{dateKey}</Text>
              {Object.keys(organizedData[weekNumber][dateKey]).map((heure) => (
                <div key={heure}>
                  <Text fontSize={15}>Heure: {heure}:00</Text>
                  <Text>
                    CB: {organizedData[weekNumber][dateKey][heure].cb}
                  </Text>
                  <Text>
                    CM: {organizedData[weekNumber][dateKey][heure].cm}
                  </Text>
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
