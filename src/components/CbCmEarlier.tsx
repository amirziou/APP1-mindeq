import {
  Badge,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";

interface Props {
  cb: number;
  cm: number;
}

const CbCmEarlier = ({ cb, cm }: Props) => {
  return (
    <>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>03:00</Th>
              <Th>04:00</Th>
              <Th>05:00</Th>
              <Th>06:00</Th>
              <Th>07:00</Th>
              <Th>08:00</Th>
              <Th>09:00</Th>
              <Th>10:00</Th>
              <Th>11:00</Th>
              <Th>12:00</Th>
              <Th>13:00</Th>
              <Th>14:00</Th>
              <Th>15:00</Th>
              <Th>16:00</Th>
              <Th>17:00</Th>
              <Th>18:00</Th>
              <Th>19:00</Th>
              <Th>20:00</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr color={"green"}>
              <Td>204</Td>
              <Td>111</Td>
              <Td>87</Td>
              <Td>75</Td>
              <Td>11</Td>
              <Td>111</Td>
              <Td>45</Td>
              <Td>111</Td>
              <Td>11</Td>
              <Td>45</Td>
              <Td>111</Td>
              <Td>54</Td>
              <Td>111</Td>
              <Td>11</Td>
              <Td>111</Td>
              <Td>54</Td>
              <Td>111</Td>
              <Td>{cb}</Td>
            </Tr>
            <Tr color={"red"}>
              <Td>11</Td>
              <Td>12</Td>
              <Td>7</Td>
              <Td>5</Td>
              <Td>4</Td>
              <Td>21</Td>
              <Td>5</Td>
              <Td>7</Td>
              <Td>11</Td>
              <Td>2</Td>
              <Td>3</Td>
              <Td>14</Td>
              <Td>6</Td>
              <Td>11</Td>
              <Td>21</Td>
              <Td>13</Td>
              <Td>9</Td>
              <Td>{cm}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CbCmEarlier;
