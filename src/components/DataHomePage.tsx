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
                      <span
                        style={{
                          color: "black",
                          fontFamily: "Times New Roman",
                          fontSize: "16px",
                        }}
                      >
                        Client:{" "}
                      </span>
                      {Client &&
                        Client[chaine.id] &&
                        Client[chaine.id].data &&
                        Client[chaine.id].data.client}{" "}
                      <br />
                      <span
                        style={{
                          color: "black",
                          fontFamily: "Times New Roman",
                          fontSize: "16px",
                        }}
                      >
                        Ref:{" "}
                      </span>
                      {Client &&
                        Client[chaine.id] &&
                        Client[chaine.id].data &&
                        Client[chaine.id].data.Reference}
                      <br />
                      <span
                        style={{
                          color: "black",
                          fontFamily: "Times New Roman",
                          fontSize: "16px",
                        }}
                      >
                        Qte:{" "}
                      </span>
                      {Client &&
                        Client[chaine.id] &&
                        Client[chaine.id].data &&
                        Client[chaine.id].data.qte}
                      <br />
                      {Client &&
                        Client[chaine.id] &&
                        Client[chaine.id].data &&
                        Client[chaine.id].data.timestamp && (
                          <span>
                            <span
                              style={{
                                color: "black",
                                fontFamily: "Times New Roman",
                                fontSize: "16px",
                              }}
                            >
                              Départ:{" "}
                            </span>
                            <span
                              style={{
                                color: "white",
                                fontFamily: "Arial",
                                fontSize: "16px",
                              }}
                            >
                              {(() => {
                                const date = new Date(
                                  Client[chaine.id].data.timestamp
                                );
                                const day = date
                                  .getDate()
                                  .toString()
                                  .padStart(2, "0");
                                const month = (date.getMonth() + 1)
                                  .toString()
                                  .padStart(2, "0");
                                const year = date.getFullYear();
                                const hours = date
                                  .getHours()
                                  .toString()
                                  .padStart(2, "0");
                                const minutes = date
                                  .getMinutes()
                                  .toString()
                                  .padStart(2, "0");
                                return `${hours}:${minutes} ${day}/${month}/${year} `;
                              })()}
                            </span>
                          </span>
                        )}
                    </Text>

                    {Heart[chaine.id] === true && (
                      <CbCmTotal
                        cb={cumulativeDataArray[chaine.id - 1]?.cb}
                        cm={cumulativeDataArray[chaine.id - 1]?.cm}
                        faible={
                          Client &&
                          Client[chaine.id] &&
                          Client[chaine.id].data &&
                          Client[chaine.id].data.faible !== undefined
                            ? Client[chaine.id].data.faible
                            : 50
                        }
                        moyenne={
                          Client &&
                          Client[chaine.id] &&
                          Client[chaine.id].data &&
                          Client[chaine.id].data.moyenne !== undefined
                            ? Client[chaine.id].data.moyenne
                            : 75
                        }
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
                        faible={
                          Client &&
                          Client[chaine.id] &&
                          Client[chaine.id].data &&
                          Client[chaine.id].data.faible !== undefined
                            ? Client[chaine.id].data.faible
                            : 50
                        }
                        moyenne={
                          Client &&
                          Client[chaine.id] &&
                          Client[chaine.id].data &&
                          Client[chaine.id].data.moyenne !== undefined
                            ? Client[chaine.id].data.moyenne
                            : 75
                        }
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
