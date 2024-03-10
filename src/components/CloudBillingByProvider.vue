<template>
    <v-card flat class="align-center ml-5 pt-5">
      <v-card-title>
        <h1>
          Chart
        </h1>
      </v-card-title>
      <v-card-text>
        <TimeChart :datapoints=prices_chart?.data />
      </v-card-text>
    </v-card>

</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import moment from 'moment';
  import {
    useCloudBillingForChart,
    useCloudBillingByProviderForChart,
  } from "@/api/cloud_billing/query";

  const props = defineProps({
    providerName: String,
  });

  import TimeChart from "@/components/charts/TimeChart.vue";

  const start_year = ref(2023);
  const start_month = ref(9);
  const end_year = ref(2024);
  const end_month = ref(2);

  const { data: prices_chart } = useCloudBillingByProviderForChart(props.providerName, start_year.value, start_month.value, end_year.value, end_month.value);

</script>
