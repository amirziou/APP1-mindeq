import { Grid, GridItem, Show } from "@chakra-ui/react";
import React, { useState } from "react";
import DataHomePage from "../components/DataHomePage";
import NavBar from "../components/NavBar";
import TimeSelector from "../components/TimeSelector";
import ChartBar from "../components/ChartBar";
import HistoryData from "../firebase/HistoryData";
import HomePageHeartbeat from "../firebase/HomePageHeartbeat";
import HomePData from "../firebase/HomePData";
import Formulaire from "../formulaire/Formulaire";

const HomePage = () => {
  const [Time, setTime] = useState("");
  //const { Heartbeat } = HomePData();

  const {} = HistoryData();

  return (
    <Grid
      backgroundColor={"gray.200"}
      templateAreas={{
        base: '"main"', // for small devices; under 1024px
        lg: '"main"', // bigger than 1024px
      }}
    >
      <Show above="lg"> {/*to show it just in large screen lg*/}</Show>
      <GridItem area={"main"}>
        {/* <TableDemo />*/}
        {/* <TableDemoTwo />*/}
        {/* <TimeSelector
          onTimeSet={(a: string) => {
            setTime(a);
          }}
        /> */}

        <DataHomePage />

        {/* <ChartBar /> */}
      </GridItem>
    </Grid>
  );
};

export default HomePage;
