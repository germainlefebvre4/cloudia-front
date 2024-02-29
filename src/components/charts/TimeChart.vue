<script setup lang="ts">
const props = defineProps({
    datapoints: Object,
});

import { watch } from 'vue';
import {
  Chart as ChartJS,
  ChartOptions,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartDataset,
} from 'chart.js'
import 'chartjs-adapter-moment';
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const chartOptions = {
  // adapters: {
  //   date: {
  //     locale: 'fr-FR',
  //     zone: 'UTC+1',
  //   },
  // },
  scales: {
    x: {
      title: {
        text: 'Date'
      },
      type: 'time',
      time: {
        unit: 'month',
        displayFormats: {
          second: 'MM-DD HH:mm',
          minute: 'MM-DD HH:mm',
          hour: 'MM-DD HH',
          day: 'MM-DD',
          month: 'MM-YYYY',
        }
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Price'
      },
    },
  },
}


// import {IChartDataStructure} from '@/types/chart.types'

let loaded = false
let myDatasets: ChartDataset[] = []
let myChartData: ChartData = {
  datasets: myDatasets,
}

watch(props, (value) => {
  for(let i = 0; i < value.datapoints.length; i++){
    let myarray: ChartDataset = {
      label: value.datapoints[i].label,
      data: value.datapoints[i].data,
      backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
    }
    myDatasets.push(myarray)
  }
  loaded = true
})


// const chartData = {
//   datasets: [
//     {
//       label: 'My First Dataset',
//       data: [
//         { x: "2023-09-01T00:00:00.000000", y: 300 },
//         { x: "2023-10-01T00:00:00.000000", y: 500 },
//         { x: "2023-11-01T00:00:00.000000", y: 900 },
//         { x: "2023-12-01T00:00:00.000000", y: 750 },
//       ],
//       backgroundColor: '#FF6384',
//     },
//     {
//       label: 'My Second Dataset',
//       data: [
//         { x: "2023-09-01T00:00:00.000000", y: 100 },
//         { x: "2023-10-01T00:00:00.000000", y: 800 },
//         { x: "2023-11-01T00:00:00.000000", y: 700 },
//         { x: "2023-12-01T00:00:00.000000", y: 600 },
//       ],
//       backgroundColor: '#36A2EB',
//     },
//   ]
// }
</script>

<template>
    <Line v-if="loaded" :data="myChartData" :options="chartOptions" />
</template>
