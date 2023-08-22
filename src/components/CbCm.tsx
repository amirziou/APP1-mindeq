import { Badge, VStack } from "@chakra-ui/react";
import React from "react";

interface Props {
  cb: number;
  cm: number;
}

const CbCm = ({ cb, cm }: Props) => {
  return (
    <>
      <Badge>{cb}</Badge>
      <Badge>{cm}</Badge>
    </>
  );
};

export default CbCm;
