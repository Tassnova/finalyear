import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const PieChart = ({ data, view }: any) => {
  let progressOneLength = 0;
  const progressOne =
    data &&
    data.map((item: { status: string }): any => {
      if (item.status === "In Progress Stage-1") {
        progressOneLength += 1;
      }
    });

  let progressTwoLength = 0;
  const progressTwo =
    data &&
    data.map((item: { status: string }): any => {
      if (item.status === "In Progress Stage-2") {
        progressTwoLength += 1;
      }
    });

  let progressThreeLength = 0;
  const progressThree =
    data &&
    data.map((item: { status: string }): any => {
      if (item.status === "In Progress Stage-3") {
        progressThreeLength += 1;
      }
    });

  if (
    progressOneLength === 0 &&
    progressTwoLength === 0 &&
    progressThreeLength === 0
  ) {
    return <h1 className="my-4 text-center text-2xl">No data found</h1>;
  }

  ChartJS.register(ArcElement, Tooltip, Legend);

  const chartData = {
    labels: ["Stage 1", "Stage 2", "Stage 3"],
    datasets: [
      {
        label: "# of Votes",
        data: [progressOneLength, progressTwoLength, progressThreeLength],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
        ],
      },
    ],
  };

  return <Doughnut data={chartData} />;
};

export default PieChart;
