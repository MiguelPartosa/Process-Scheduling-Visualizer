import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Job } from "../store/globalStateProvider";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register Chart.js components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

interface GanttChartProps {
  jobs: Job[];
}

enum JobColor {
  A = "darkblue",
  B = "darkgreen",
  C = "darkred",
  D = "darkorange",
  E = "darkpurple",
}

const JobChart: React.FC<GanttChartProps> = ({ jobs }) => {
  // Variable for graphS
  const datasetValues = jobs.map((job) => {
    return {
      label: job.jobName,
      data: [job.jobTime],
      backgroundColor: JobColor[job.jobName as keyof typeof JobColor],
    };
  });
  const jobEnds = [jobs[0].jobTime];
  for (let i = 1; i < datasetValues.length; i++) {
    jobEnds.push(jobs[i].jobTime + jobEnds[i - 1]);
  }
  // console.log("ENDS", jobEnds);
  const data = {
    labels: ["Job Cycle"],
    datasets: [...datasetValues],
  };

  // Chart options
  const options = {
    indexAxis: "y" as const,
    layout: {
      padding: {
        // sometimes rightmost tick is cut off
        right: 10
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Time",
        },
        ticks: {
          stepSize: 1,
          autoSkip: false,
          maxTicksLimit: undefined,
          sampleSize: jobEnds.length,
          padding: 1,
          callback: (val: number) => {
            if (val === 0 || jobEnds.includes(val)) return val;
          },
        },
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      datalabels: {
        display: true,
        color: "white",
        font: {
          // weight: "bold",
          size: 12,
        },
        formatter: (value: number, context:any) => {
          return `${context.dataset.label}\n${value}`;
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default JobChart;
