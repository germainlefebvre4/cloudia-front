<script setup lang="ts">
const props = defineProps({
    datapoints: Object,
    data: Object,
});

import { ref, watch } from 'vue';
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
  responsive: true,
}


let loaded = false
const myChartData = ref<ChartData<'line'>>({
  datasets: []
})

watch(props, (value) => {
  for(let i = 0; i < value.data?.data.length; i++){
    let myarray: ChartDataset = {
      label: value.data?.data[i].label,
      data: value.data?.data[i].data,
      backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
    }
    myChartData.value.datasets.push(myarray)
  }
  loaded = true
})
</script>

<template>
    <Line v-if="loaded" :data="myChartData" :options="chartOptions" />
</template>
