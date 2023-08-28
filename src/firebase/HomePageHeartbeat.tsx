import React, { useEffect, useState } from "react";
import axiosClient from "./axios-client";
import { db } from "../../config";
import { CanceledError } from "axios";
import { ref, onValue } from "firebase/database";

interface Cha {
  heartbeat: string;
  id: number;
}
interface HeartbeatArray extends Array<Cha> {}

const HomePageHeartbeat = () => {
  const [error, setError] = useState("");
  const [Heartbeat, setHeartbeat] = useState<HeartbeatArray>();
  const [Heart, setHeart] = useState<{ [id: number]: boolean }>({});
  const [initialDataFetched, setInitialDataFetched] = useState(false);

  const isHeartbeatOn = (heartbeat: string) => {
    const currentTimestamp = Date.now();
    const lastHeartbeatTimestamp = parseInt(heartbeat) * 1000;
    const timeDifference = currentTimestamp - lastHeartbeatTimestamp;
    return timeDifference < 16000; // 16 seconds in milliseconds
  };

  useEffect(() => {
    const starCountRef = ref(db, "/HeartBeat");

    onValue(starCountRef, (snapshot) => {
      const controller = new AbortController();
      axiosClient
        .get("/HeartBeat.json", {
          signal: controller.signal,
        })
        .then((res) => {
          const ch: Cha[] = Object.values(res.data);
          setHeartbeat(ch);
          setInitialDataFetched(true);

          const newHeartStatus: { [id: number]: boolean } = {};
          ch.forEach((item) => {
            const { id, heartbeat } = item;
            newHeartStatus[id] = isHeartbeatOn(heartbeat);
          });
          setHeart(newHeartStatus);

          // Store initial Heart value in localStorage
          localStorage.setItem("initialHeart", JSON.stringify(newHeartStatus));
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
        });

      return () => controller.abort();
    });
  }, []);

  useEffect(() => {
    // Retrieve initial Heart value from localStorage
    const storedInitialHeart = localStorage.getItem("initialHeart");
    const initialHeart = storedInitialHeart
      ? JSON.parse(storedInitialHeart)
      : {};
    setHeart(initialHeart);

    const timeoutRef = setTimeout(() => {
      if (initialDataFetched) {
        const newHeartStatus: { [id: number]: boolean } = {};
        Heartbeat?.forEach((item) => {
          const { id, heartbeat } = item;
          newHeartStatus[id] = isHeartbeatOn(heartbeat);
        });
        setHeart(newHeartStatus);

        // Update initial Heart value in localStorage
        localStorage.setItem("initialHeart", JSON.stringify(newHeartStatus));
      }
    }, 16000); // 16 seconds

    return () => {
      clearTimeout(timeoutRef);
    };
  }, [Heartbeat, initialDataFetched]);

  return {
    Heart,
  };
};

export default HomePageHeartbeat;
