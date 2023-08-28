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

const HomePData = () => {
  const [chaineDataMap, setChaineDataMap] = useState<GroupedData>({});
  const [hourlyData, setHourlyData] = useState<{
    [chaineId: string]: ChaineHourlyData;
  }>({});
  const [hourlyDataArray, setHourlyDataArray] = useState<HourlyDataArrayItem[]>(
    []
  );
  const [error, setError] = useState("");
  const [Heartbeat, setHeartbeat] = useState("");

  useEffect(() => {
    console.log("start extracting chaine data for all IDs");

    const fetchData = async () => {
      try {
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
              const oneHourAgo = currentTime - 3600000; // One hour in milliseconds

              const hourlySumData: { [chaineId: string]: ChaineHourlyData } =
                {};

              for (const chaineId in data) {
                const chaineRecord = data[chaineId];
                let cbSum = 0;
                let cmSum = 0;

                for (const timestamp in chaineRecord) {
                  const recordTimestamp =
                    parseInt(chaineRecord[timestamp].timestamp) * 1000;

                  if (
                    recordTimestamp >= oneHourAgo &&
                    recordTimestamp <= currentTime
                  ) {
                    cbSum += parseInt(chaineRecord[timestamp].cb);
                    cmSum += parseInt(chaineRecord[timestamp].cm);
                  }
                }

                hourlySumData[chaineId] = { cb: cbSum, cm: cmSum };
              }

              setHourlyData(hourlySumData);

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
      } catch (err) {
        if (err instanceof CanceledError) return;
        setError((err as Error).message);
      }
    };

    fetchData();
  }, []);

  // ...

  //console.log(hourlyData);

  // console.log(organizedData);

  return {
    hourlyDataArray,
  };
};
export default HomePData;
