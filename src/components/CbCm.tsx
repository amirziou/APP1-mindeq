import { Badge, VStack } from "@chakra-ui/react";
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
        <Badge
          colorScheme={color}
          fontSize={20}
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
