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
import CbCm from "./CbCm";
import CbCmEarlier from "./CbCmEarlier";

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
    "red.300",
    "purple.200",
    "pink.200",
  ];

  return (
    <>
      {error && <p> {error} </p>}

      {/*{isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (*/}
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
                <HStack justifyContent="space-between" alignItems="center">
                  {/* Right side */}
                  <div>
                    <HStack>
                      <Heading size="md" color="white">
                        Chaine {chaine.id}
                      </Heading>
                      <MdGppGood color="gray" />
                    </HStack>
                  </div>

                  {/* Left side */}
                  <HStack>
                    <CbCm cb={chaine.cb} cm={chaine.cm} />
                  </HStack>
                </HStack>
                <Text fontSize={12}>Description personalisée</Text>
              </CardHeader>
              <Divider />
              <CardBody color={"white"}>
                <CbCmEarlier cb={chaine.cb} cm={chaine.cm} />
                {/* ID: {chaine.id}, CB: {chaine.cb}, CM: {chaine.cm} */}
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </div>
    </>
  );
};

export default Data;
