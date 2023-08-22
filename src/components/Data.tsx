import ExtractingData, { Chaine } from "../firebase/ExtractingData";
import { MdGppGood } from "react-icons/md";
import {
  Box,
  Divider,
  HStack,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
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
    "red.200",
    "green.200",
    "teal.200",
    "blue.200",
    "cyan.200",
    "orange.200",
    "yellow.300",
    "purple.200",
    "pink.200",
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
          <SimpleGrid spacing={4} padding={5} backgroundColor={"gray.200"}>
            {chaineArray.map((chaine, index) => (
              <Card
                key={index}
                borderRadius={13}
                backgroundColor={
                  backgroundColors[index % backgroundColors.length]
                }
              >
                <CardHeader>
                  <HStack>
                    <Heading size="md" color={"white"}>
                      Chaine {chaine.id}
                    </Heading>

                    <MdGppGood color="gray" />
                  </HStack>
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
