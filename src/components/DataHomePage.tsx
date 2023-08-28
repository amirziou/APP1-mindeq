import ExtractingData, { Chaine } from "../firebase/ExtractingData";
import { MdGppGood } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { Divider, HStack, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import CbCm from "./CbCm";

import { Link } from "react-router-dom";
import HomePageHeartbeat from "../firebase/HomePageHeartbeat";
import HomePData from "../firebase/HomePData";

const DataHomePage = () => {
  const { chaineArray, error } = ExtractingData();

  const { Heart } = HomePageHeartbeat();
  console.log(Heart);
  const { hourlyDataArray } = HomePData();
  // console.log(hourlyDataArray);

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
        <SimpleGrid
          columns={{ base: 2, md: 4, lg: 5, xl: 7 }}
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
                    {/* <MdGppGood color="gray" /> */}
                  </HStack>
                  <Text fontSize={16} color="gray.500">
                    Couturière <br /> Client: MAZEN <br /> Qt: 200
                  </Text>

                  {Heart[chaine.id] === true ? (
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

export default DataHomePage;
