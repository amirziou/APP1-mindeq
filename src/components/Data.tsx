import ExtractingData, { Chaine } from "../firebase/ExtractingData";
import { Box, Divider, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
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

  const backgroundColors = [
    "#f08080",
    "#0000ff",
    "#00ced1",
    "#6b8e23",
    "#ffdead",
  ];

  return (
    <>
      {error && <p> {error} </p>}

      {isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div>
          <SimpleGrid
            columns={2}
            spacing={4}
            padding={5}
            backgroundColor={"#f5f5f5"}
          >
            {chaineArray.map((chaine, index) => (
              <Card
                key={index}
                borderRadius={13}
                backgroundColor={
                  backgroundColors[index % backgroundColors.length]
                }
              >
                <CardHeader>
                  <Heading size="md" color={"white"}>
                    Chaine {chaine.id}
                  </Heading>
                </CardHeader>
                <Divider />
                <CardBody color={"white"}>
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
