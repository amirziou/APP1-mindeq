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
//import { Bar } from "react-chart.js";
import "chartjs-plugin-datalabels";

const StatsPageJour = () => {
  const { organizedDataJour, error } = HistoryData();

  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="App">
          {/* <h4>Données Organisées en jour et en heure</h4> */}
          {Object.keys(organizedDataJour).map((annee) => (
            <div key={annee}>
              {/* <h2>{`Année: ${annee}`}</h2> */}
              {Object.keys(organizedDataJour[annee]).map((mois) => (
                <div key={mois}>
                  {/* <h3>{`Mois: ${mois}`}</h3> */}
                  {Object.keys(organizedDataJour[annee][mois]).map(
                    (weekNumber) => (
                      <div key={weekNumber}>
                        {/* <h4>{`Semaine: ${weekNumber}`}</h4> */}

                        <div key={weekNumber}>
                          {/* <h5>Jour: {dateKey}</h5> */}
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
                                    <Tbody>
                                      <Tr>
                                        <Td>CB</Td>
                                        {Object.keys(
                                          organizedDataJour[annee][mois][
                                            weekNumber
                                          ]
                                        ).map((day) => (
                                          <Td key={day}>
                                            {
                                              organizedDataJour[annee][mois][
                                                weekNumber
                                              ][day].cb
                                            }
                                          </Td>
                                        ))}
                                      </Tr>
                                      <Tr>
                                        <Td>CM</Td>
                                        {Object.keys(
                                          organizedDataJour[annee][mois][
                                            weekNumber
                                          ]
                                        ).map((day) => (
                                          <Td key={day}>
                                            {
                                              organizedDataJour[annee][mois][
                                                weekNumber
                                              ][day].cm
                                            }
                                          </Td>
                                        ))}
                                      </Tr>
                                    </Tbody>
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
                                        organizedDataJour[annee][mois][
                                          weekNumber
                                        ]
                                      ).map((day) => day),
                                      datasets: [
                                        {
                                          label: "Production CB",
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
                                            "rgba(255, 99, 132, 0.5)",
                                        },
                                        {
                                          label: "Pièces défectueuses CM",
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
                                            "rgba(53, 162, 235, 0.5)",
                                        },
                                      ],
                                    }}
                                  />
                                </div>
                              </CardBody>
                            </Card>
                          </SimpleGrid>
                        </div>
                      </div>
                    )
                  )}
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
