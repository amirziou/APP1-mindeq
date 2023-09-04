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

const StatsPageJour = () => {
  const { organizedDataJour, error } = HistoryData();

  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="App">
          {Object.keys(organizedDataJour).map((annee) => (
            <div key={annee}>
              {Object.keys(organizedDataJour[annee]).map((mois) => (
                <div key={mois}>
                  {Object.keys(organizedDataJour[annee][mois])
                    .map((weekNumber) => Number(weekNumber)) // Convert weekNumber to numbers
                    .sort((a, b) => b - a) // Sort week numbers in descending order
                    .map((weekNumber) => (
                      <div key={weekNumber}>
                        <SimpleGrid spacing={4} padding={5}>
                          <Card key={weekNumber} borderRadius={13}>
                            <CardHeader>
                              <h5>Week: {weekNumber}</h5>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                              <TableContainer>
                                <Table size="sm">
                                  <Thead>
                                    <Tr>
                                      <Th>Jour</Th>
                                      {Object.keys(
                                        organizedDataJour[annee][mois][
                                          weekNumber
                                        ]
                                      ).map((day) => (
                                        <Th key={day}>{`${day}`}</Th>
                                      ))}
                                    </Tr>
                                  </Thead>
                                  {/* Rest of the table body */}
                                </Table>
                              </TableContainer>
                              <div
                                key={weekNumber}
                                style={{ width: "100%", height: "400px" }}
                              >
                                <Bar
                                  key={weekNumber}
                                  options={options}
                                  data={{
                                    labels: Object.keys(
                                      organizedDataJour[annee][mois][weekNumber]
                                    ),
                                    datasets: [
                                      {
                                        label: "Production",
                                        data: Object.keys(
                                          organizedDataJour[annee][mois][
                                            weekNumber
                                          ]
                                        ).map(
                                          (day) =>
                                            organizedDataJour[annee][mois][
                                              weekNumber
                                            ][day].cb
                                        ),
                                        backgroundColor:
                                          "rgba(53, 162, 235, 0.5)",
                                      },
                                      {
                                        label: "Retouche",
                                        data: Object.keys(
                                          organizedDataJour[annee][mois][
                                            weekNumber
                                          ]
                                        ).map(
                                          (day) =>
                                            organizedDataJour[annee][mois][
                                              weekNumber
                                            ][day].cm
                                        ),
                                        backgroundColor:
                                          "rgba(255, 99, 132, 0.5)",
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
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default StatsPageJour;
