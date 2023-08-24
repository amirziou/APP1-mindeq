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

const StatsPage = () => {
  const { organizedData, error } = HistoryData();

  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="App">
          <h4>Données Organisées en jour et en heure</h4>
          {Object.keys(organizedData).map((annee) => (
            <div key={annee}>
              <h2>{`Année: ${annee}`}</h2>
              {Object.keys(organizedData[annee]).map((mois) => (
                <div key={mois}>
                  <h3>{`Mois: ${mois}`}</h3>
                  {Object.keys(organizedData[annee][mois]).map((weekNumber) => (
                    <div key={weekNumber}>
                      <h4>{`Semaine: ${weekNumber}`}</h4>
                      {Object.keys(organizedData[annee][mois][weekNumber]).map(
                        (dateKey) => (
                          <div key={dateKey}>
                            {/* <h5>Jour: {dateKey}</h5> */}
                            <SimpleGrid spacing={4} padding={5}>
                              <Card key={dateKey} borderRadius={13}>
                                <CardHeader>
                                  <h5>Date: {dateKey}</h5>
                                </CardHeader>
                                <Divider />
                                <CardBody>
                                  <TableContainer>
                                    <Table size="sm">
                                      <Thead>
                                        <Tr>
                                          <Th>Heures</Th>
                                          {Object.keys(
                                            organizedData[annee][mois][
                                              weekNumber
                                            ][dateKey]
                                          ).map((heure) => (
                                            <Th key={heure}>{`${heure}:00`}</Th>
                                          ))}
                                        </Tr>
                                      </Thead>
                                      <Tbody>
                                        <Tr>
                                          <Td>CB</Td>
                                          {Object.keys(
                                            organizedData[annee][mois][
                                              weekNumber
                                            ][dateKey]
                                          ).map((heure) => (
                                            <Td key={heure}>
                                              {
                                                organizedData[annee][mois][
                                                  weekNumber
                                                ][dateKey][heure].cb
                                              }
                                            </Td>
                                          ))}
                                        </Tr>
                                        <Tr>
                                          <Td>CM</Td>
                                          {Object.keys(
                                            organizedData[annee][mois][
                                              weekNumber
                                            ][dateKey]
                                          ).map((heure) => (
                                            <Td key={heure}>
                                              {
                                                organizedData[annee][mois][
                                                  weekNumber
                                                ][dateKey][heure].cm
                                              }
                                            </Td>
                                          ))}
                                        </Tr>
                                      </Tbody>
                                    </Table>

                                    <div
                                      key={dateKey}
                                      style={{ width: "100%", height: "400px" }}
                                    >
                                      <Bar
                                        key={dateKey}
                                        options={options}
                                        data={{
                                          labels: Object.keys(
                                            organizedData[annee][mois][
                                              weekNumber
                                            ][dateKey]
                                          ).map((heure) => heure),
                                          datasets: [
                                            {
                                              label: dateKey,
                                              data: Object.keys(
                                                organizedData[annee][mois][
                                                  weekNumber
                                                ][dateKey]
                                              ).map(
                                                (heure) =>
                                                  organizedData[annee][mois][
                                                    weekNumber
                                                  ][dateKey][heure].cb
                                              ),

                                              backgroundColor:
                                                "rgba(255, 99, 132, 0.5)",
                                            },
                                            {
                                              label: dateKey,
                                              data: Object.keys(
                                                organizedData[annee][mois][
                                                  weekNumber
                                                ][dateKey]
                                              ).map(
                                                (heure) =>
                                                  organizedData[annee][mois][
                                                    weekNumber
                                                  ][dateKey][heure].cm
                                              ),
                                              backgroundColor:
                                                "rgba(53, 162, 235, 0.5)",
                                            },
                                          ],
                                        }}
                                      />
                                    </div>
                                  </TableContainer>
                                </CardBody>
                              </Card>
                            </SimpleGrid>
                          </div>
                        )
                      )}
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

export default StatsPage;
