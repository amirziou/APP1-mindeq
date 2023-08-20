import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import ExtractingData, { Chaine } from "./firebase/ExtractingData";
import Data from "./components/Data";

const App = () => {
  const {
    chaineArray,
    error,
    isLoading,
    setLoading,
    setError,
    setchaineArray,
  } = ExtractingData();

  return (
    <>
      {error && <p className="text-danger"> {error} </p>}
      <Grid
        templateAreas={{
          base: '"nav" "main"', // for small devices; under 1024px
          lg: '"nav nav" "aside main"', // bigger than 1024px
        }}
      >
        <GridItem area={"nav"}>
          <NavBar />
        </GridItem>
        <Show above="lg">
          {" "}
          {/*to show it just in large screen lg*/}
          <GridItem area={"aside"}> Aside</GridItem>
        </Show>
        <GridItem area={"main"}>
          {" "}
          <Data />
        </GridItem>
      </Grid>
    </>
  );
};

export default App;
