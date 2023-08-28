import { Badge, VStack, Text, HStack } from "@chakra-ui/react";
import React from "react";

interface Props {
  cb: number;
  cm: number;
}

const CbCm = ({ cb, cm }: Props) => {
  let color = cb > 75 ? "green" : cb > 50 ? "yellow" : "red";
  let colorM = "red";
  return (
    <>
      <VStack marginTop={4}>
        <Text marginBottom={1} fontSize={16} color="gray.600" fontWeight="bold">
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
