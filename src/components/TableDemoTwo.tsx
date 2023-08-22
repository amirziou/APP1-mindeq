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

const TableDemoTwo = () => {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal" backgroundColor="#f5f5f5">
        <TableCaption>Production</TableCaption>
        <Thead>
          <Tr>
            <Th>Machines</Th>
            <Th isNumeric>03:00</Th>
            <Th>Pr/jr</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>1535</Td>
          </Tr>
          <Tr>
            <Td>2</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>1535</Td>
          </Tr>
          <Tr>
            <Td>3</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>1535</Td>
          </Tr>
          <Tr>
            <Td>4</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>1535</Td>
          </Tr>
          <Tr>
            <Td>5</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>1535</Td>
          </Tr>
          <Tr>
            <Td>6</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>1535</Td>
          </Tr>
          <Tr>
            <Td>7</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>1535</Td>
          </Tr>
          <Tr>
            <Td>8</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>1535</Td>
          </Tr>
          <Tr>
            <Td>9</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>1535</Td>
          </Tr>
          <Tr>
            <Td>10</Td>
            <Td isNumeric>512</Td>
            <Td isNumeric>1535</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Pr</Th>
            <Td isNumeric>512</Td>
            <Td isNumeric>1535</Td>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default TableDemoTwo;
