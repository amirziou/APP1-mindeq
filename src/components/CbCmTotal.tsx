import { Badge, VStack, Text, HStack } from "@chakra-ui/react";
import React from "react";

interface Props {
  cb: number;
  cm: number;
  faible: number;
  moyenne: number;
}

const CbCm = ({ cb, cm, faible, moyenne }: Props) => {
  let color = cb > moyenne ? "green" : cb > faible ? "yellow" : "red";
  let colorM = "red";
  return (
    <>
      <VStack marginTop={4}>
        <Text marginBottom={1} fontSize={16} color="white" fontWeight="bold">
          Totaliseur
        </Text>
        <Badge
          colorScheme={color}
          fontSize={30}
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
    </>
  );
};

export default CbCm;
