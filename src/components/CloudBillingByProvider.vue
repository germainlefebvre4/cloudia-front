<template>
    <v-card flat class="align-center ml-5 pt-5">
      <v-card-title>
        <h1>
          Chart
        </h1>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="3">
            Select start month
            <VueDatePicker
              v-model="start_date"
              month-picker
              auto-apply
              required
              :max-date=datetime_start_range_max
            />
          </v-col>
          <v-col cols="3">
            Select end month
            <VueDatePicker
              v-model="end_date"
              month-picker
              auto-apply
              required
              :max-date=datetime_end_range_max
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <v-btn @click="chartRefresh">Refresh</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <!-- <TimeChart :datapoints=prices_chart?.data /> -->
          <TimeChart :data=prices_chart />
        </v-row>

      </v-card-text>
    </v-card>

</template>

<script lang="ts" setup>
import { ref, toRef, watch } from 'vue';
import moment from 'moment';
import {
  useCloudBillingForChart,
  useCloudBillingByProviderForChart,
} from "@/api/cloud_billing/query";

const props = defineProps({
  providerName: String || "unknown",
});

import TimeChart from "@/components/charts/TimeChart.vue";
import { start } from 'repl';
import { fetchCloudBillingByProviderForChart } from '@/api/cloud_billing/cloud_billing';

const start_date = ref({
  month: moment(new Date()).subtract(3, 'months').month(),
  year: moment(new Date()).subtract(3, 'months').year(),
});;
const end_date = ref({
  month: moment(new Date()).month(),
  year: moment(new Date()).year(),
});;

const datetime_start_range_max = moment().format("YYYY-MM-DD");
const datetime_end_range_max = moment().format("YYYY-MM-DD");

let prices_chart = ref();
let { data: prices_chart_tmp } = useCloudBillingByProviderForChart(props.providerName, start_date.value.year, start_date.value.month+1, end_date.value.year, end_date.value.month);
let prices_chart_ro = toRef(prices_chart_tmp, 'prices_chart')

const chartRefresh = () => {
  fetchCloudBillingByProviderForChart(props.providerName, start_date.value.year, start_date.value.month+1%12, end_date.value.year, end_date.value.month+1%12)
  .then((response) => {
    prices_chart.value = response;
  });
}

</script>
