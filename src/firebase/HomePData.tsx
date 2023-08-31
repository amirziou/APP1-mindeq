import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import axiosClient from "../firebase/axios-client";
import { CanceledError } from "axios";
import { db } from "../../config";

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
  timestamp: string;
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
  const [TimestampForm, setTimestampForm] = useState(() => {
    const storedTimestamp = localStorage.getItem("TimestampForm");
    return storedTimestamp !== null ? parseInt(storedTimestamp) : -1;
  });

  useEffect(() => {
    const starCountRef = ref(db, "/client");
    onValue(starCountRef, (snapshot) => {
      const controller = new AbortController();
      axiosClient
        .get("/client.json", {
          signal: controller.signal,
        })
        .then((res) => {
          // console.log("importing data");
          //console.log(res.data);
          setClient(res.data);
          if (Array.isArray(res.data)) {
            res.data.forEach((entry) => {
              if (entry && entry.data) {
                // console.log("entry");
                //console.log(entry);
                const timestamp = entry.data.timestamp;
                //console.log("timestamp");
                //console.log(timestamp);
                if (timestamp) {
                  // console.log(
                  //   `Locale storage TimestampForm for ID ${entry.data.id}`
                  // );
                  localStorage.removeItem(`TimestampForm_${entry.data.id}`);
                  // console.log(`TimestampForm_${entry.data.id}`);
                  localStorage.setItem(
                    `TimestampForm_${entry.data.id}`,
                    timestamp.toString()
                  );
                }
              }
            });
          }
        })
        .catch((err: Error) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
        });

      return () => controller.abort();
    });
  }, []);

  useEffect(() => {
    //console.log("start extracting chaine data for all IDs");

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
            // console.log(`TimestampForm_${chaineId}`);
            const chaineRecord = data[chaineId];
            let cbSum = 0;
            let cmSum = 0;
            let cbDailySum = 0;
            let cmDailySum = 0;
            let cbCumulative = 0;
            let cmCumulative = 0;

            for (const timestamp in chaineRecord) {
              const numericId = parseInt(chaineId.replace("chaine", ""));
              const key = `TimestampForm_${numericId.toString()}`;
              //console.log("Constructed Key:", key);
              const storedTimestamp = localStorage.getItem(key);
              // console.log(storedTimestamp);

              const recordTimestamp =
                parseInt(chaineRecord[timestamp].timestamp) * 1000;

              if (recordTimestamp >= Number(storedTimestamp)) {
                cbCumulative += parseInt(chaineRecord[timestamp].cb);
                cmCumulative += parseInt(chaineRecord[timestamp].cm);
              }

              if (
                recordTimestamp >= currentDayStart &&
                recordTimestamp >= Number(storedTimestamp)
              ) {
                cbDailySum += parseInt(chaineRecord[timestamp].cb);
                cmDailySum += parseInt(chaineRecord[timestamp].cm);
              }

              if (
                recordTimestamp >= Number(storedTimestamp) &&
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
  }, [TimestampForm]);

  //  console.log({Client &&
  //   Client[1] &&
  //   Client[1].data &&
  //   Client[1].data.client});

  // ...

  return {
    hourlyDataArray,
    dailyData,
    cumulativeData,
    Client,
  };
};

export default HomePData;
