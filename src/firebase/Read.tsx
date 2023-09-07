import React from "react";
import { ref, onValue } from "firebase/database";
import { db, auth } from "../../config";
import axios from "axios";
import axiosClient from "./axios-client";

const Read = () => {
  const userNodeRef = ref(db, `zo3wpezaASdJEwL9saNdRp7fKQ93`);
  onValue(userNodeRef, (snapshot) => {
    // Handle the data from the database here.
    const data = snapshot.val();
    console.log("Data from the user's node:", data);
  });

  axiosClient
    .get(
      "zo3wpezaASdJEwL9saNdRp7fKQ93" +
        ".json?auth=bOwevX8JzXtka7iPE1eFIUoAMr4AoavrLfkYAPd8"
    )
    .then((response) => {
      console.log(response);
    });
  return <div>Read</div>;
};

export default Read;
