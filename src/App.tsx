import ExtractingData, { Chaine } from "./firebase/ExtractingData";

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
