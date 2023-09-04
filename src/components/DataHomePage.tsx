import ExtractingData, { Chaine } from "../firebase/ExtractingData";
import { MdGppGood } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { Flex, HStack, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { Card, CardHeader } from "@chakra-ui/card";
import CbCm from "./CbCm";

import { Link } from "react-router-dom";
import HomePageHeartbeat from "../firebase/HomePageHeartbeat";
import HomePData from "../firebase/HomePData";
import CbCmTotal from "./CbCmTotal";

const DataHomePage = () => {
  const { chaineArray, error } = ExtractingData();

  const { Heart } = HomePageHeartbeat();
  // console.log(Heart);
  //   const { hourlyDataArray, dailyData, cumulativeData, Client } : {
  //     hourlyDataArray: any[]; // Define the actual type if possible
  //     dailyData: any; // Define the actual type if possible
  //     cumulativeData: any;
  //   Client: ClientObject,
  // } = HomePData();
  const { hourlyDataArray, dailyData, cumulativeData, Client } = HomePData();
  //console.log("Client");
  //console.log(Client);

  const backgroundColors = [
    //"red.200",
    //"rgb(226,70,128)",
    "rgb(105,107,245)",
    //"green.200",
    "rgb(117,124,164)",
    //"teal.200",
    "rgb(78,191,193)",
    //"blue.200",
    "	#2E8B57",
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
                      <MdGppGood color="#37FD12" size={25} />
                    ) : (
                      <AiFillCloseCircle color="red" size={25} />
                    )}
                  </HStack>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text
                      fontSize={16}
                      color="white"
                      marginTop={17}
                      fontWeight="bold"
                    >
                      Client:{" "}
                      {Client &&
                        Client[chaine.id] &&
                        Client[chaine.id].data &&
                        Client[chaine.id].data.client}{" "}
                      <br />
                      Ref:{" "}
                      {Client &&
                        Client[chaine.id] &&
                        Client[chaine.id].data &&
                        Client[chaine.id].data.Reference}
                      {/* <br />
                        Qte:{" "}
                        {Client &&
                          Client[chaine.id] &&
                          Client[chaine.id].data &&
                          Client[chaine.id].data.qte} */}
                      <br />
                      {Client &&
                        Client[chaine.id] &&
                        Client[chaine.id].data &&
                        Client[chaine.id].data.timestamp && (
                          <span>
                            Date départ: <br />
                            {(() => {
                              const date = new Date(
                                Client[chaine.id].data.timestamp
                              );
                              const day = date.getDate();
                              const month = date.getMonth() + 1;
                              const year = date.getFullYear();
                              const hours = date.getHours();
                              const minutes = date
                                .getMinutes()
                                .toString()
                                .padStart(2, "0"); // Format minutes with leading zero if needed
                              return `${day}/${month}/${year} ${hours}:${minutes}`;
                            })()}
                          </span>
                        )}
                    </Text>

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
                  </HStack>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </SimpleGrid>
      </div>
    </>
  );
};

export default DataHomePage;
