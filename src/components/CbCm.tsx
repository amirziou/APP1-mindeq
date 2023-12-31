import { Badge, VStack, Text, HStack } from "@chakra-ui/react";
import React from "react";

interface Props {
  cb: number;
  cm: number;
  b: number;
  m: number;
  faible: number;
  moyenne: number;
}

const CbCm = ({ cb, cm, b, m, faible, moyenne }: Props) => {
  // let color = cb > moyenne ? "green" : cb > faible ? "yellow" : "red";
  let color = "gray";
  let colorM = "gray";
  return (
    <>
      <HStack>
        <VStack marginTop={4}>
          <Text marginBottom={1} fontSize={16} color="white" fontWeight="bold">
            Heure
          </Text>
          <Badge
            colorScheme={color}
            fontSize={25}
            paddingY={2}
            paddingX={5}
            borderRadius="4px"
          >
            {cb}
          </Badge>
          <Badge
            colorScheme={colorM}
            paddingX={2}
            fontSize={16}
            borderRadius="4px"
          >
            {cm}
          </Badge>
        </VStack>

        <VStack marginTop={4}>
          <Text marginBottom={1} fontSize={16} color="white" fontWeight="bold">
            Jour
          </Text>
          <Badge
            colorScheme={color}
            fontSize={25}
            paddingY={2}
            paddingX={5}
            borderRadius="4px"
          >
            {b}
          </Badge>
          <Badge
            colorScheme={colorM}
            paddingX={2}
            fontSize={16}
            borderRadius="4px"
          >
            {m}
          </Badge>
        </VStack>
      </HStack>
    </>
  );
};

export default CbCm;
