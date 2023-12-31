import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../firebase/axios-client";
import { db } from "../../config";
import { onValue, ref } from "firebase/database";
import { CanceledError } from "axios";
import GetAuth from "./GetAuth";

export type Chaine = {
  id: number;
  cb: number;
  cm: number;
  timestamp: string;
}[];

export interface GroupedData {
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

export interface GroupedDataJour {
  [year: string]: {
    [month: string]: {
      [weekNumber: string]: {
        [dateKey: string]: {
          cb: number;
          cm: number;
        };
      };
    };
  };
}

export interface GroupedDataMois {
  [year: string]: {
    [month: string]: {
      [dateKey: string]: {
        cb: number;
        cm: number;
      };
    };
  };
}

const HistoryData = () => {
  const uid = GetAuth();
  const [ONEchaineArray, setONEchaineArray] = useState<Chaine>([]);
  const { id } = useParams();
  const [organizedData, setOrganizedData] = useState<GroupedData>({});
  const [organizedDataYear, setOrganizedDataYear] = useState<{
    [year: string]: {
      [month: string]: { cb: number; cm: number };
    };
  }>({});
  const [organizedDataJour, setOrganizedDataJour] = useState<GroupedDataJour>(
    {}
  );
  const [organizedDataMois, setOrganizedDataMois] = useState<GroupedDataMois>(
    {}
  );
  const [error, setError] = useState("");
  const [Heartbeat, setHeartbeat] = useState("");

  const getWeekNumber = (date: Date) => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const timeDiff = date.getTime() - oneJan.getTime();
    const dayOfYear = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil(dayOfYear / 7);
    return weekNumber;
  };

  useEffect(() => {
    const controller = new AbortController();
    axiosClient
      .get(
        uid.uid +
          "/HistoryPrjt0/chaine" +
          id +
          ".json?auth=bOwevX8JzXtka7iPE1eFIUoAMr4AoavrLfkYAPd8",
        {
          signal: controller.signal,
        }
      )
      .then((res) => {
        const cha = { ...res.data };
        delete cha.heartbeat;
        const ch: Chaine = Object.values(cha);

        setHeartbeat(res.data.heartbeat);
        setONEchaineArray(ch);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const convertedDateObjects = ONEchaineArray.map((item) => {
      return {
        ...item,
        timestamp: new Date(parseInt(item.timestamp) * 1000),
      };
    });

    const groupedData: GroupedData = {};
    const groupedDataYear: {
      [year: string]: {
        [month: string]: { cb: number; cm: number };
      };
    } = {};
    const groupedDataJour: GroupedDataJour = {};
    const groupedDataMois: GroupedDataMois = {};

    convertedDateObjects.forEach((item) => {
      const heu = item.timestamp.getHours();
      const heure = heu + ":00";

      const jour = item.timestamp.getDate();
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

      if (!groupedDataYear[annee]) {
        groupedDataYear[annee] = {};
      }
      if (!groupedDataYear[annee][mois]) {
        groupedDataYear[annee][mois] = { cb: 0, cm: 0 };
      }

      groupedDataYear[annee][mois].cb += a;
      groupedDataYear[annee][mois].cm += b;

      if (!groupedDataJour[annee]) {
        groupedDataJour[annee] = {};
      }
      if (!groupedDataJour[annee][mois]) {
        groupedDataJour[annee][mois] = {};
      }
      if (!groupedDataJour[annee][mois][weekNumber]) {
        groupedDataJour[annee][mois][weekNumber] = {};
      }
      if (!groupedDataJour[annee][mois][weekNumber][dateKey]) {
        groupedDataJour[annee][mois][weekNumber][dateKey] = { cb: 0, cm: 0 };
      }

      groupedDataJour[annee][mois][weekNumber][dateKey].cb += a;
      groupedDataJour[annee][mois][weekNumber][dateKey].cm += b;

      if (!groupedDataMois[annee]) {
        groupedDataMois[annee] = {};
      }
      if (!groupedDataMois[annee][mois]) {
        groupedDataMois[annee][mois] = {};
      }
      if (!groupedDataMois[annee][mois][dateKey]) {
        groupedDataMois[annee][mois][dateKey] = { cb: 0, cm: 0 };
      }

      groupedDataMois[annee][mois][dateKey].cb += a;
      groupedDataMois[annee][mois][dateKey].cm += b;
    });

    setOrganizedData(groupedData);
    setOrganizedDataYear(groupedDataYear);
    setOrganizedDataJour(groupedDataJour);
    setOrganizedDataMois(groupedDataMois);
  }, [ONEchaineArray]);

  return {
    Heartbeat,
    organizedData,
    organizedDataYear,
    organizedDataJour,
    organizedDataMois,
    error,
  };
};

export default HistoryData;
