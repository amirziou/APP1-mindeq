import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import HistoryData from "../firebase/HistoryData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  Day: String;
}

export const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      text: "Chart.js Bar Chart",
    },
  },
};

const ChartBar = ({ Day }: Props) => {
  const { organizedData, error } = HistoryData();

  const labels: string[] = [];
  const cbData: number[] = [];
  const cmData: number[] = [];

  Object.keys(organizedData).forEach((year) => {
    Object.keys(organizedData[year]).forEach((month) => {
      Object.keys(organizedData[year][month]).forEach((weekNumber) => {
        Object.keys(organizedData[year][month][weekNumber]).forEach(
          (dateKey) => {
            const heureArray = Object.keys(
              organizedData[year][month][weekNumber][dateKey]
            ).map((heure) => heure);
            console.log(heureArray);
          }
        );
      });
    });
  });

  const data = {
    labels,
    datasets: [
      {
        label: "CB",
        data: cbData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "CM",
        data: cmData,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      <div className="App">
        {Object.keys(organizedData).map((annee) => (
          <div key={annee}>
            {Object.keys(organizedData[annee]).map((mois) => (
              <div key={mois}>
                {Object.keys(organizedData[annee][mois]).map((weekNumber) => (
                  <div key={weekNumber}>
                    {Object.keys(organizedData[annee][mois][weekNumber]).map(
                      (Day) => (
                        <div
                          key={Day}
                          style={{ width: "100%", height: "400px" }}
                        >
                          <Bar
                            key={Day}
                            options={options}
                            data={{
                              labels: Object.keys(
                                organizedData[annee][mois][weekNumber][Day]
                              ).map((heure) => heure),
                              datasets: [
                                {
                                  label: Day,
                                  data: Object.keys(
                                    organizedData[annee][mois][weekNumber][Day]
                                  ).map(
                                    (heure) =>
                                      organizedData[annee][mois][weekNumber][
                                        Day
                                      ][heure].cb
                                  ),

                                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                                },
                                {
                                  label: Day,
                                  data: Object.keys(
                                    organizedData[annee][mois][weekNumber][Day]
                                  ).map(
                                    (heure) =>
                                      organizedData[annee][mois][weekNumber][
                                        Day
                                      ][heure].cm
                                  ),
                                  backgroundColor: "rgba(53, 162, 235, 0.5)",
                                },
                              ],
                            }}
                          />
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
    </>
  );
};

export default ChartBar;
