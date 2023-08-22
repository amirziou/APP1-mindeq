import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

const TableDemo = () => {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal" backgroundColor="#f5f5f5">
        <TableCaption>Production</TableCaption>
        <Thead>
          <Tr>
            <Th>Machines</Th>
            <Th isNumeric>03:00</Th>
            <Th isNumeric>04:00</Th>
            <Th isNumeric>05:00</Th>
            <Th isNumeric>06:00</Th>
            <Th isNumeric>07:00</Th>
            <Th isNumeric>08:00</Th>
            <Th isNumeric>09:00</Th>
            <Th isNumeric>10:00</Th>
            <Th isNumeric>11:00</Th>
            <Th isNumeric>12:00</Th>
            <Th isNumeric>13:00</Th>
            <Th isNumeric>14:00</Th>
            <Th isNumeric>15:00</Th>
            <Th isNumeric>16:00</Th>
            <Th isNumeric>17:00</Th>
            <Th isNumeric>18:00</Th>
            <Th>Pr/jr</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>25.4</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>25.4</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
          </Tr>
          <Tr>
            <Td>2</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>25.4</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>25.4</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
          </Tr>
          <Tr>
            <Td>3</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>25.4</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>25.4</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
          </Tr>
          <Tr>
            <Td>4</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>25.4</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>25.4</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
          </Tr>
          <Tr>
            <Td>5</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>25.4</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>25.4</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
          </Tr>
          <Tr>
            <Td>6</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>25.4</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>25.4</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
          </Tr>
          <Tr>
            <Td>7</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>25.4</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>25.4</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
          </Tr>
          <Tr>
            <Td>8</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>25.4</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>25.4</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
          </Tr>
          <Tr>
            <Td>9</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>25.4</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>25.4</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
          </Tr>
          <Tr>
            <Td>10</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>25.4</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>25.4</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Production totale</Th>
            <Td isNumeric>512</Td>
            <Td isNumeric>25.4</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>25.4</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
            <Td isNumeric>325</Td>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default TableDemo;
