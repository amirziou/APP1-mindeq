import ExtractingData, { Chaine } from "../firebase/ExtractingData";
import { MdGppGood } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
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
import { Link } from "react-router-dom";

const DataExtended = () => {
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
        <SimpleGrid columns={5} spacing={4} padding={5}>
          {chaineArray.map((chaine, index) => (
            // <Link to={"/chaine/" + chaine.id}>
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
                      {chaine.Etat === 1 ? (
                        <MdGppGood color="gray" />
                      ) : (
                        <AiFillCloseCircle color="red" />
                      )}
                      {/* <MdGppGood color="gray" /> */}
                    </HStack>
                  </div>

                  {/* Left side */}
                  <HStack>
                    {chaine.Etat === 1 ? (
                      <CbCm cb={chaine.cb} cm={chaine.cm} />
                    ) : null}
                  </HStack>
                </HStack>
                <Text fontSize={12}>Description personalisée</Text>
              </CardHeader>
              {/* <Divider /> */}
              {/* <CardBody color={"white"}> */}
              {/* <CbCmEarlier cb={chaine.cb} cm={chaine.cm} /> */}
              {/* ID: {chaine.id}, CB: {chaine.cb}, CM: {chaine.cm} */}
              {/* </CardBody> */}
            </Card>
            // </Link>
          ))}
        </SimpleGrid>
      </div>
    </>
  );
};

export default DataExtended;
