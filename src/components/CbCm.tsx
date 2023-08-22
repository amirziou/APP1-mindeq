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
      <Badge colorScheme={color} fontSize={16} paddingX={2} borderRadius="4px">
        {cb}
      </Badge>
      <Badge colorScheme={colorM} fontSize={12} borderRadius="4px">
        {cm}
      </Badge>
    </>
  );
};

export default CbCm;
