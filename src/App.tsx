import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import ExtractingData, { Chaine } from "./firebase/ExtractingData";
import Data from "./components/DataHomePage";
import TableDemo from "./components/TableDemo";
import TableDemoTwo from "./components/TableDemoTwo";
import TimeSelector from "./components/TimeSelector";

const App = () => {
  const {
    chaineArray,
    error,
    isLoading,
    setLoading,
    setError,
    setchaineArray,
  } = ExtractingData();

  return <>{error && <p className="text-danger"> {error} </p>}</>;
};

export default App;
