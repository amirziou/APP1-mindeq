import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Card,
  SimpleGrid,
  CardHeader,
  Divider,
  CardBody,
  TableContainer,
} from "@chakra-ui/react";
import HistoryData from "../firebase/HistoryData";
import CbCmEarlier from "../components/CbCmEarlier";
import ChartBar, { options } from "../components/ChartBar";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

const StatsPageHeure = () => {
  const { organizedData, error } = HistoryData();

  const flattenData = [];

  // Flatten the data
  for (const year in organizedData) {
    for (const month in organizedData[year]) {
      for (const weekNumber in organizedData[year][month]) {
        for (const dateKey in organizedData[year][month][weekNumber]) {
          const [day, monthNumber, yearNumber] = dateKey.split("/").map(Number);
          const sortableDateKey = new Date(yearNumber, monthNumber - 1, day);

          flattenData.push({
            year,
            month,
            weekNumber,
            dateKey,
            sortableDateKey, // Assign as a Date object
            data: organizedData[year][month][weekNumber][dateKey],
          });
        }
      }
    }
  }

  // Sort the flattened data by sortableDateKey in descending order
  flattenData.sort(
    (a, b) => b.sortableDateKey.getTime() - a.sortableDateKey.getTime()
  );

  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="App">
          {flattenData.map(({ year, month, weekNumber, dateKey, data }) => (
            <div key={dateKey}>
              <SimpleGrid spacing={4} padding={5}>
                <Card key={dateKey} borderRadius={13}>
                  <CardHeader>
                    <h5>Date: {dateKey}</h5>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <TableContainer marginBottom={10}>
                      <Table size="sm">
                        <Thead>
                          <Tr>
                            <Th>Heures</Th>
                            {Object.keys(data).map((heure) => (
                              <Th key={heure}>{heure}</Th>
                            ))}
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr backgroundColor="rgba(53, 162, 235, 0.25)">
                            <Td>
                              <strong>CB</strong>
                            </Td>
                            {Object.keys(data).map((heure) => (
                              <Td key={heure}>{data[heure].cb}</Td>
                            ))}
                          </Tr>
                          <Tr>
                            <Td>
                              <strong>CM</strong>
                            </Td>
                            {Object.keys(data).map((heure) => (
                              <Td key={heure}>{data[heure].cm}</Td>
                            ))}
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>

                    <div style={{ width: "100%", height: "400px" }}>
                      <Bar
                        options={options}
                        data={{
                          labels: Object.keys(data),
                          datasets: [
                            {
                              label: "Retouches",
                              data: Object.keys(data).map(
                                (heure) => data[heure].cm
                              ),
                              backgroundColor: "rgba(255, 99, 132, 0.5)",
                            },
                            {
                              label: "Production CB",
                              data: Object.keys(data).map(
                                (heure) => data[heure].cb
                              ),

                              //backgroundColor: "rgba(00, 160, 130, 0.5)",
                              backgroundColor: "rgba(53, 162, 235, 0.5)",
                            },
                          ],
                        }}
                      />
                    </div>
                  </CardBody>
                </Card>
              </SimpleGrid>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default StatsPageHeure;
