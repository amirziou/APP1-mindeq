import ExtractingData, { Chaine } from "../firebase/ExtractingData";
import { MdGppGood } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { Divider, HStack, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import CbCm from "./CbCm";

import { Link } from "react-router-dom";
import CbCmEarlier from "./CbCmEarlier";
import ChartBar from "./ChartBar";
import ChartBarGoog from "./ChartBarGoog";
import HistoryData from "../firebase/HistoryData";

const Data = () => {
  const { chaineArray, error } = ExtractingData();
  const { Heartbeat } = HistoryData();

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

  const isHeartbeatOld = () => {
    const currentTimestamp = Date.now();
    console.log(Heartbeat);
    const lastHeartbeatTimestamp = parseInt(Heartbeat); // Replace this with the actual way you're getting the timestamp
    const timeDifference = currentTimestamp - lastHeartbeatTimestamp;
    return timeDifference > 7000; // 7 seconds in milliseconds
  };

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
          columns={{ base: 2, md: 4, lg: 6, xl: 8 }}
          spacing={4}
          padding={5}
        >
          {chaineArray.map((chaine, index) => (
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
                    {isHeartbeatOld() ? (
                      <MdGppGood color="gray" />
                    ) : (
                      <AiFillCloseCircle color="red" />
                    )}
                    {/* <MdGppGood color="gray" /> */}
                  </HStack>
                  <Text fontSize={16} color="gray.500">
                    Couturière <br /> Client: MAZEN <br /> Qt: 200
                  </Text>

                  {chaine.Etat === 1 ? (
                    <CbCm cb={chaine.cb} cm={chaine.cm} />
                  ) : null}
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

export default Data;
