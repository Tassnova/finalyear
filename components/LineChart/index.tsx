import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement);

export const options = {
  responsive: true,
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function CustomChart({ completed }: any) {
  let monthLength = 0;
  labels.map((label) =>
    completed.map((item: any) => {
      if (label === item) {
        monthLength += 1;
      }
    })
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map((label) =>
          completed.map((item: any) => label === item && monthLength)
        ),
        backgroundColor: "#baa3ed",
        borderRadius: 15,
      },
    ],
  };

  // console.log(completed, "this is all ocmpleted");
  return <Bar options={options} data={data} />;
}
