import ExtractingData, { Chaine } from "../firebase/ExtractingData";
import { MdGppGood } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import {
  Box,
  Divider,
  Flex,
  HStack,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import CbCm from "./CbCm";

import { Link } from "react-router-dom";
import HomePageHeartbeat from "../firebase/HomePageHeartbeat";
import HomePData from "../firebase/HomePData";
import CbCmTotal from "./CbCmTotal";

const DataHomePage = () => {
  const { chaineArray, error } = ExtractingData();

  const { Heart } = HomePageHeartbeat();
  console.log(Heart);
  const { hourlyDataArray, dailyData, cumulativeData } = HomePData();
  // console.log(dailyData);

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

  const cumulativeDataArray = Object.keys(cumulativeData).map((chaineId) => ({
    id: chaineId,
    cb: cumulativeData[chaineId].cb,
    cm: cumulativeData[chaineId].cm,
  }));

  const dailyDataArray = Object.keys(dailyData).map((chaineId) => ({
    id: chaineId,
    cb: dailyData[chaineId].cb,
    cm: dailyData[chaineId].cm,
  }));

  return (
    <>
      {error && <p> {error} </p>}

      {/*{isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (*/}
      <div>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
          spacing={4}
          padding={5}
        >
          {hourlyDataArray.map((chaine, index) => (
            <Link key={index} to={"/chaine/" + chaine.id}>
              <Card
                _hover={{
                  transform: "scale(1.04)",
                  transition: "transform .15s ease-in",
                }}
                key={index}
                borderRadius={13}
                backgroundColor={
                  backgroundColors[index % backgroundColors.length]
                }
              >
                <CardHeader>
                  <HStack>
                    <Heading size="md" color="white">
                      Chaine {chaine.id}
                    </Heading>
                    {Heart[chaine.id] ? (
                      <MdGppGood color="gray" size={25} />
                    ) : (
                      <AiFillCloseCircle color="red" size={25} />
                    )}
                  </HStack>
                  <Flex justifyContent="space-between" alignItems="center">
                    <HStack>
                      <Text fontSize={16} color="gray.600" marginTop={17}>
                        Couturière <br /> Client: MAZEN <br /> Qt: 200
                      </Text>
                    </HStack>
                    {Heart[chaine.id] === true && (
                      <CbCmTotal
                        cb={cumulativeDataArray[chaine.id - 1]?.cb}
                        cm={cumulativeDataArray[chaine.id - 1]?.cm}
                      />
                    )}
                  </Flex>
                  <HStack
                    justifyContent="center"
                    alignItems="center"
                    flexDir="column"
                  >
                    {Heart[chaine.id] === true ? (
                      <CbCm
                        cb={chaine.cb}
                        cm={chaine.cm}
                        b={dailyDataArray[chaine.id - 1]?.cb}
                        m={dailyDataArray[chaine.id - 1]?.cm}
                      />
                    ) : null}
                    {/* You can also add daily data here if needed */}
                  </HStack>
                </CardHeader>
                {/* <Divider /> */}
                {/* <CardBody> */}
                {/* <CbCmEarlier cb={chaine.cb} cm={chaine.cm} /> */}
                {/* ID: {chaine.id}, CB: {chaine.cb}, CM: {chaine.cm} */}
                {/* </CardBody> */}
              </Card>
            </Link>
          ))}
        </SimpleGrid>
      </div>
    </>
  );
};

export default DataHomePage;
