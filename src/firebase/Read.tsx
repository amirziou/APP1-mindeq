import React, { useEffect } from "react";
import { ref, get } from "firebase/database"; // Import `get` instead of `onValue`
import { db } from "../../config";
import axios from "axios";
import axiosClient from "./axios-client";

const Read = () => {
  useEffect(() => {
    // Function to fetch data from Firebase
    // const fetchDataFromFirebase = async () => {
    //   const userNodeRef = ref(db, `zo3wpezaASdJEwL9saNdRp7fKQ93`);

    //   try {
    //     const snapshot = await get(userNodeRef); // Use `get` to fetch data once
    //     const data = snapshot.val();
    //     console.log("Data from the user's node:", data);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };

    // Call the function to fetch data when the component mounts
    // fetchDataFromFirebase();

    // Fetch data using Axios
    axiosClient
      .get(
        "zo3wpezaASdJEwL9saNdRp7fKQ93" +
          ".json?auth=bOwevX8JzXtka7iPE1eFIUoAMr4AoavrLfkYAPd8"
      )
      .then((response) => {
        console.log(response);
      });
  }, []); // The empty dependency array [] ensures this runs once on mount/refresh

  return <div>Read</div>;
};

export default Read;
