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
  TooltipItem,
  ChartOptions,
  TooltipOptions,
} from "chart.js";
import { Job } from "../store/globalStateProvider";
import ChartDataLabels, { Context } from "chartjs-plugin-datalabels";
// TODO: add types for library contexts
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
  // Only the values jobtime will be used as a value and not arrival time. It is assumed that calculation is done beforehand
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
  const options: ChartOptions<"bar"> = {
    indexAxis: "y" as const,
    layout: {
      padding: {
        // sometimes rightmost tick is cut off
        right: 10,
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
          callback: (val: string | number): number | null => {
            const numericVal = val as number; // Assert that val is a number
            if (numericVal === 0 || jobEnds.includes(numericVal)) {
              return val as number;
            }
            return null;
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
        formatter: (value: number, context: Context) => {
          return `${context.dataset.label}\n${value}`;
        },
      },
      legend: {
        display: false,
      },
      tooltip: {
        bodyAlign: "center",
        titleAlign: "center",
        callbacks: {
          label: function (context: TooltipItem<"bar">) {
            const datasetIndex = context.datasetIndex;

            const jobName = context.dataset.label;
            const jobTime = jobs[datasetIndex].jobTime;
            const jobEnd = jobEnds[datasetIndex];
            const jobArrival = jobs[datasetIndex].arrivalTime;
            return [
              `${jobName}`,
              `Arrival: ${jobArrival}`,
              `Time: ${jobTime}`,
              `End: ${jobEnd}`,
            ];
          },
        },
      } as TooltipOptions<"bar">,
    },
  };

  return <Bar data={data} options={options} />;
};

export default JobChart;
