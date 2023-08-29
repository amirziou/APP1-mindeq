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

const StatsPageMois = () => {
  const { organizedDataMois, error } = HistoryData();

  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="App">
          {/* <h4>Données Organisées en jour et en heure</h4> */}
          {Object.keys(organizedDataMois).map((annee) => (
            <div key={annee}>
              {/* <h2>{`Année: ${annee}`}</h2> */}
              {Object.keys(organizedDataMois[annee]).map((mois) => (
                <div key={mois}>
                  {/* <h3>{`Mois: ${mois}`}</h3> */}

                  {/* <h4>{`Semaine: ${weekNumber}`}</h4> */}

                  {/* <h5>Jour: {dateKey}</h5> */}
                  <SimpleGrid spacing={4} padding={5}>
                    <Card key={mois} borderRadius={13}>
                      <CardHeader>
                        <h5>Mois: {mois}</h5>
                      </CardHeader>
                      <Divider />
                      <CardBody>
                        <TableContainer marginBottom={10}>
                          <Table size="sm">
                            <Thead>
                              <Tr>
                                <Th>Jour</Th>
                                {Object.keys(
                                  organizedDataMois[annee][mois]
                                ).map((day) => (
                                  <Th key={day}>{`${day}`}</Th>
                                ))}
                              </Tr>
                            </Thead>
                            <Tbody>
                              <Tr backgroundColor="rgba(53, 162, 235, 0.25)">
                                <Td>
                                  <strong>CB</strong>
                                </Td>
                                {Object.keys(
                                  organizedDataMois[annee][mois]
                                ).map((day) => (
                                  <Td key={day}>
                                    {organizedDataMois[annee][mois][day].cb}
                                  </Td>
                                ))}
                              </Tr>
                              <Tr>
                                <Td>
                                  <strong>CM</strong>
                                </Td>
                                {Object.keys(
                                  organizedDataMois[annee][mois]
                                ).map((day) => (
                                  <Td key={day}>
                                    {organizedDataMois[annee][mois][day].cm}
                                  </Td>
                                ))}
                              </Tr>
                            </Tbody>
                          </Table>
                        </TableContainer>

                        <div
                          key={mois}
                          style={{ width: "100%", height: "400px" }}
                        >
                          <Bar
                            key={mois}
                            options={options}
                            data={{
                              labels: Object.keys(
                                organizedDataMois[annee][mois]
                              ).map((day) => day),
                              datasets: [
                                {
                                  label: "Pièces défectueuses CM",
                                  data: Object.keys(
                                    organizedDataMois[annee][mois]
                                  ).map(
                                    (day) =>
                                      organizedDataMois[annee][mois][day].cm
                                  ),
                                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                                },
                                {
                                  label: "Production CB",
                                  data: Object.keys(
                                    organizedDataMois[annee][mois]
                                  ).map(
                                    (day) =>
                                      organizedDataMois[annee][mois][day].cb
                                  ),

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
          ))}
        </div>
      )}
    </>
  );
};

export default StatsPageMois;
