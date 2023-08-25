import { Grid, GridItem, Show } from "@chakra-ui/react";
import React, { useState } from "react";
import Data from "../components/Data";
import NavBar from "../components/NavBar";
import TimeSelector from "../components/TimeSelector";
import ChartBar from "../components/ChartBar";

const HomePage = () => {
  const [Time, setTime] = useState("");
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
        <TimeSelector
          onTimeSet={(a: string) => {
            setTime(a);
          }}
        />
        {Time === "heure" ? <Data /> : null}

        {/* <ChartBar /> */}
      </GridItem>
    </Grid>
  );
};

export default HomePage;
