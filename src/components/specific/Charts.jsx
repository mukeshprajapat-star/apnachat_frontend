import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
} from "chart.js";
import { getLast7Days } from "../../lib/features";
import { orange } from "../constants/Color";
import zIndex from "@mui/material/styles/zIndex";

ChartJS.register(
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend
);
const LineChartOption ={
  responsive:true,
  plugin:{
    legend:{
      display:false,
    },
    title:{
      display:false
    }
  },
  scales:{
    x:{
      grid:{
        display:false

      }
    },
    y:{
      beginAtZero:true,
      grid:{
        display:false

      }
    }
  }
}
const labels=getLast7Days();
const LineCharts = ({value=[]}) => {
  const data = {
    labels,
    datasets: [{
      data:value,
      label:"Messages",
      fill:true,
      backgroundColor:"rgba(75,12,192,0.2) ",
      borderColor:"rgba(75,12,192,1) "
    },]
  };
  return <Line data={data} options={LineChartOption} />;
};

const DoughnutChartOption ={
  responsive:true,
  plugin:{
    legend:{
      display:false,
    },
  },
  cutout:120

}
const DoughnutCharts = ({value=[],labels=[]} ) => {
  const data = {
    labels,
    datasets: [{
      data:value,
      label:"Total Chats vs Groups Chats",
      backgroundColor:["rgba(75,12,192,0.2)",orange],
      borderColor:["rgba(75,12,192,1) ",orange],
      offset:20
    },]
  };
   return <Doughnut style={{zIndex:10}}  data={data} options={DoughnutChartOption} />
};

export { LineCharts, DoughnutCharts };
