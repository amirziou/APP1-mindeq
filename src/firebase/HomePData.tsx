import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import axiosClient from "../firebase/axios-client";
import { CanceledError } from "axios";
import { db } from "../../config";
import { useParams } from "react-router-dom";

interface ChaineData {
  Etat: string;
  cb: string;
  cm: string;
  timestamp: string;
}

interface ChaineRecord {
  [timestamp: string]: ChaineData;
}

interface GroupedData {
  [chaineId: string]: ChaineRecord;
}

interface ChaineHourlyData {
  cb: number;
  cm: number;
}

interface HourlyDataArrayItem {
  id: number;
  cb: number;
  cm: number;
}

interface clt {
  [id: string]: dataEntry;
}

interface dataEntry {
  data: data;
}

interface data {
  Reference: string;
  bonne: number;
  client: string;
  faible: number;
  moyenne: number;
  id: string;
  qte: number;
}

const HomePData = () => {
  const [Client, setClient] = useState<clt>();
  const [chaineDataMap, setChaineDataMap] = useState<GroupedData>({});
  const [hourlyData, setHourlyData] = useState<{
    [chaineId: string]: ChaineHourlyData;
  }>({});
  const [hourlyDataArray, setHourlyDataArray] = useState<HourlyDataArrayItem[]>(
    []
  );
  const [dailyData, setDailyData] = useState<{
    [chaineId: string]: ChaineHourlyData;
  }>({});
  const [cumulativeData, setCumulativeData] = useState<{
    [chaineId: string]: ChaineHourlyData;
  }>({});
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("start extracting chaine data for all IDs");

    const starCountRef = ref(db, "/HistoryPrjt0");
    onValue(starCountRef, (snapshot) => {
      const controller = new AbortController();
      axiosClient
        .get("/HistoryPrjt0.json", {
          signal: controller.signal,
        })
        .then((res) => {
          const data: GroupedData = res.data;
          setChaineDataMap(data);

          const currentTime = Date.now();

          // Calculate the timestamp for the start of the current day
          const currentDate = new Date();
          const currentDayStart = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
          ).getTime();

          const hourlySumData: { [chaineId: string]: ChaineHourlyData } = {};
          const dailySumData: { [chaineId: string]: ChaineHourlyData } = {};
          const cumulativeData: { [chaineId: string]: ChaineHourlyData } = {};

          for (const chaineId in data) {
            const chaineRecord = data[chaineId];
            let cbSum = 0;
            let cmSum = 0;
            let cbDailySum = 0;
            let cmDailySum = 0;
            let cbCumulative = 0;
            let cmCumulative = 0;

            for (const timestamp in chaineRecord) {
              cbCumulative += parseInt(chaineRecord[timestamp].cb);
              cmCumulative += parseInt(chaineRecord[timestamp].cm);
              const recordTimestamp =
                parseInt(chaineRecord[timestamp].timestamp) * 1000;

              if (recordTimestamp >= currentDayStart) {
                cbDailySum += parseInt(chaineRecord[timestamp].cb);
                cmDailySum += parseInt(chaineRecord[timestamp].cm);
              }

              if (
                recordTimestamp >= currentTime - 3600000 && // Last hour timestamp
                recordTimestamp <= currentTime
              ) {
                cbSum += parseInt(chaineRecord[timestamp].cb);
                cmSum += parseInt(chaineRecord[timestamp].cm);
              }
            }

            hourlySumData[chaineId] = { cb: cbSum, cm: cmSum };
            dailySumData[chaineId] = { cb: cbDailySum, cm: cmDailySum };
            cumulativeData[chaineId] = {
              cb: cbCumulative,
              cm: cmCumulative,
            };
          }

          setHourlyData(hourlySumData);
          setDailyData(dailySumData);
          setCumulativeData(cumulativeData);

          // Convert hourlyData object to array for rendering
          const hourlyDataArray = Object.keys(hourlySumData).map(
            (chaineId) => ({
              id: parseInt(chaineId.replace("chaine", "")), // Assuming chaineId is in the format "chaineX"
              cb: hourlySumData[chaineId].cb,
              cm: hourlySumData[chaineId].cm,
            })
          );
          setHourlyDataArray(hourlyDataArray);
        })
        .catch((err: Error) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
        });

      return () => controller.abort();
    });
  }, []);

  useEffect(() => {
    const starCountRef = ref(db, "/client");
    onValue(starCountRef, (snapshot) => {
      const controller = new AbortController();
      axiosClient
        .get("/client.json", {
          signal: controller.signal,
        })
        .then((res) => {
          console.log("importing data");
          console.log(res.data);
          setClient(res.data);
        })
        .catch((err: Error) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
        });

      return () => controller.abort();
    });
  }, []);

  console.log(Client && Client[1] && Client[1].data && Client[1].data.client);

  // ...

  return {
    hourlyDataArray,
    dailyData,
    cumulativeData,
    Client,
  };
};

export default HomePData;
