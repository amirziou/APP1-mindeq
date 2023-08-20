import ExtractingData, { Chaine } from "../firebase/ExtractingData";
import { Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import { Card, CardBody, CardHeader } from "@chakra-ui/card";

const Data = () => {
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
      {error && <p> {error} </p>}

      {isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div>
          <SimpleGrid spacing={4}>
            {chaineArray.map((chaine, index) => (
              <Card key={index}>
                <CardHeader>
                  <Heading size="md">Chaine {chaine.id}</Heading>
                </CardHeader>
                <CardBody>
                  ID: {chaine.id}, CB: {chaine.cb}, CM: {chaine.cm}
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </div>
      )}
    </>
  );
};

export default Data;
