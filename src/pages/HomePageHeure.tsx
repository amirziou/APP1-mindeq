import React from "react";
import HistoryData from "../firebase/HistoryData";

const HomePageHeure = () => {
  const { organizedData, error } = HistoryData();
  return <div>HomePageHeure</div>;
};

export default HomePageHeure;
