import { Grid, GridItem, Show } from "@chakra-ui/react";
import React from "react";
import Data from "../components/Data";
import NavBar from "../components/NavBar";
import TimeSelector from "../components/TimeSelector";

const HomePage = () => {
  return (
    <Grid
      backgroundColor={"gray.200"}
      templateAreas={{
        base: '"main"', // for small devices; under 1024px
        lg: '"main"', // bigger than 1024px
      }}
    >
      <Show above="lg"> {/*to show it just in large screen lg*/}</Show>
      <GridItem area={"main"} marginY={7}>
        <TimeSelector /> {/* <TableDemo />*/}
        {/* <TableDemoTwo />*/}
        <Data />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
