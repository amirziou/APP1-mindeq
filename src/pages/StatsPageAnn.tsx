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

const StatsPageAnn = () => {
  const { organizedDataYear, error } = HistoryData();

  const sortedYears = Object.keys(organizedDataYear).sort(
    (a, b) => Number(b) - Number(a)
  );

  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="App">
          {sortedYears.map((annee) => (
            <div key={annee}>
              {/* <h2>{`Année: ${annee}`}</h2> */}

              {/* <h3>{`Mois: ${mois}`}</h3> */}

              {/* <h4>{`Semaine: ${weekNumber}`}</h4> */}

              {/* <h5>Jour: {dateKey}</h5> */}
              <SimpleGrid spacing={4} padding={5}>
                <Card key={annee} borderRadius={13}>
                  <br></br>
                  <h5 style={{ marginLeft: "20px" }}>Année: {annee}</h5>

                  <Divider />
                  <CardBody>
                    <TableContainer marginBottom={10}>
                      <Table size="sm">
                        <Thead>
                          <Tr>
                            <Th>Mois</Th>
                            {Object.keys(organizedDataYear[annee]).map(
                              (mois) => (
                                <Th key={mois}>{`${mois}`}</Th>
                              )
                            )}
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr backgroundColor="rgba(53, 162, 235, 0.25)">
                            <Td>
                              <strong>CB</strong>
                            </Td>
                            {Object.keys(organizedDataYear[annee]).map(
                              (mois) => (
                                <Td key={mois}>
                                  {organizedDataYear[annee][mois].cb}
                                </Td>
                              )
                            )}
                          </Tr>
                          <Tr>
                            <Td>
                              <strong>CM</strong>
                            </Td>
                            {Object.keys(organizedDataYear[annee]).map(
                              (mois) => (
                                <Td key={mois}>
                                  {organizedDataYear[annee][mois].cm}
                                </Td>
                              )
                            )}
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>

                    <div key={annee} style={{ width: "100%", height: "400px" }}>
                      <Bar
                        key={annee}
                        options={options}
                        data={{
                          labels: Object.keys(organizedDataYear[annee]).map(
                            (mois) => mois + "/" + annee
                          ),
                          datasets: [
                            {
                              label: "Pièces défectueuses CM",
                              data: Object.keys(organizedDataYear[annee]).map(
                                (mois) => organizedDataYear[annee][mois].cm
                              ),
                              backgroundColor: "rgba(255, 99, 132, 0.5)",
                            },
                            {
                              label: "Production CB",
                              data: Object.keys(organizedDataYear[annee]).map(
                                (mois) => organizedDataYear[annee][mois].cb
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
      )}
    </>
  );
};

export default StatsPageAnn;
