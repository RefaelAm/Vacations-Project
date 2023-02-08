import {
  BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,
  Tooltip
} from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function FollowersGraph() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Vacation Followers Chart",
      },
    },
    scales: {
      y: {
        ticks: {
          color: "white",
          stepSize: 1,
          beginAtZero: true
        }
      },
      x: {
        ticks: {
          color: "white",
          stepSize: 1,
          beginAtZero: true
        }
      }
    }
  };
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  vacationsService

    .getAllVacationsWithLikes()
    .then((vacations) => setVacations(vacations))
    .catch((err) => notifyService.error(err));

  const data = {
    labels: vacations.map(v => v.destination),
    datasets: [
      {
        label: "Followers",
        data: vacations.map((v: VacationModel) => v.followersCount),
        backgroundColor: "orange",
      }
    ],
  };
  return <Bar options={options} data={data} />;
}
