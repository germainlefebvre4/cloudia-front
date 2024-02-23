<template>
    <v-card flat class="align-center ml-5 pt-5">
      <v-card-title>
        <h1>
          {{ cloud_project?.data?.name }} <v-chip :color="getProjectStateColor(cloud_project?.data?.state)">{{ cloud_project?.data?.state }}</v-chip>
        </h1>
      </v-card-title>
      <v-card-text>
        <v-card flat>
          <v-card-title>
            Project Details
          </v-card-title>
          <v-card-text>
            <v-row justify="center">
                <v-col cols="12" md="1" class="d-flex align-center justify-center">
                  <img :src="getProjectProviderIcon(cloud_project?.data?.provider)" width="100px" :title="getProjectProviderTitle(cloud_project?.data?.provider)" :alt="getProjectProviderTitle(cloud_project?.data?.provider)"/>
                </v-col>
              <v-col cols="12" md="3">
                <v-card flat>
                  <v-card-text>
                    <v-row>
                      Provider: {{ getProjectProviderTitle(cloud_project?.data?.provider) }}
                    </v-row>
                    <v-row style="height: 10px"></v-row>
                    <v-row>
                      Project name: {{ cloud_project?.data?.name }}
                    </v-row>
                    <v-row>
                      Project ID: {{ cloud_project?.data?.id }}
                    </v-row>
                    <v-row style="height: 10px"></v-row>
                    <v-row v-if="cloud_project?.data?.email">
                      Email: {{ cloud_project?.data?.email }}
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
              
              <v-col cols="12" md="3">
                <v-card flat>
                  <v-card-title class="pl-1">
                    Additional Information
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      Parent Project ID: {{ cloud_project?.data?.parent }}
                    </v-row>
                    <v-row v-if="cloud_project?.data.provider == 'aws'">
                      Account ARN: {{ cloud_project?.data?.additionals.arn }}
                    </v-row>
                    <v-row>
                      Created at: {{ moment(cloud_project?.data?.created_at).format('DD-MM-YYYY') }}
                    </v-row>
                    <v-row v-if="cloud_project?.data.provider == 'aws'">
                      Joined method: {{ cloud_project?.data?.additionals.joined_method }}
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="5">
                <v-card flat>
                  <v-card-title class="pl-1">
                    Tags
                  </v-card-title>
                  <v-card-text>
                    <v-chip 
                      v-for="(val, key, index) in cloud_project?.data?.tags"
                      color="darkgrey"
                      class="mr-1"
                    >
                      <b>{{ key }}</b>: {{ val }}
                    </v-chip>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-card flat>
                <v-card-title class="pl-1">
                  Billing overview
                </v-card-title>
                <v-card-text class="d-flex">
                  <v-card class="ma-2 pa-2">
                    <v-card-title align="center" class="pb-0">
                      {{ getCloudMonthDateLabel(date_m0.getFullYear(), date_m0.getMonth()+1) }}
                    </v-card-title>
                    <v-card-subtitle align="center" class="pt-0">
                      Current Month
                    </v-card-subtitle>
                    <v-card-text align="center">
                      <v-progress-circular v-if="!isDataLoaded_billing_m0" color="primary" indeterminate></v-progress-circular>
                      <div v-if="isDataLoaded_billing_m0 && !isDataMissing_billing_m0">{{ getCloudCardPropertyLabel(cloud_billing_m0?.data?.total, cloud_billing_m0?.data?.unit) }}</div>
                    </v-card-text>
                  </v-card>
                  <v-card class="ma-2 pa-2">
                    <v-card-title align="center" class="pb-0">
                      {{ getCloudMonthDateLabel(date_m1.getFullYear(), date_m1.getMonth()+1) }}
                    </v-card-title>
                    <v-card-subtitle align="center" class="pt-0">
                      Month-1
                    </v-card-subtitle>
                    <v-card-text align="center">
                      <v-progress-circular v-if="!isDataLoaded_billing_m1" color="primary" indeterminate></v-progress-circular>
                      <div v-if="isDataLoaded_billing_m1 && !isDataMissing_billing_m1">{{ getCloudCardPropertyLabel(cloud_billing_m1?.data?.total, cloud_billing_m1?.data?.unit) }}</div>
                    </v-card-text>
                  </v-card>
                  <v-card class="ma-2 pa-2">
                    <v-card-title align="center" class="pb-0">
                      {{ getCloudMonthDateLabel(date_m2.getFullYear(), date_m2.getMonth()+1) }}
                    </v-card-title>
                    <v-card-subtitle align="center" class="pt-0">
                      Month-2
                    </v-card-subtitle>
                    <v-card-text align="center">
                      <v-progress-circular v-if="!isDataLoaded_billing_m2" color="primary" indeterminate></v-progress-circular>
                      <div v-if="isDataLoaded_billing_m2 && !isDataMissing_billing_m2">{{ getCloudCardPropertyLabel(cloud_billing_m2?.data?.total, cloud_billing_m2?.data?.unit) }}</div>
                    </v-card-text>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-row>
            <v-row>
              <v-card flat>
                <v-card-title class="pl-1">
                  Carbon Footprint overview
                </v-card-title>
                <v-card-subtitle v-if="cloud_project?.data?.provider == 'aws'">
                  AWS Cloud Provider only returns Carbon Footprint data for months before 3 months ago.
                </v-card-subtitle>
                <v-card-subtitle v-if="cloud_project?.data?.provider == 'gcp'">
                  GCP Cloud Provider only returns Carbon Footprint data for months before 1 month ago. Data are collected the 15th of the month for the previous month.
                </v-card-subtitle>
                <v-card-text class="d-flex">
                  <v-card class="ma-2 pa-2">
                    <v-card-title align="center" class="pb-0">
                      {{ getCloudMonthDateLabel(date_m0.getFullYear(), date_m0.getMonth()+1) }}
                    </v-card-title>
                    <v-card-subtitle align="center" class="pt-0">
                      Current Month
                    </v-card-subtitle>
                    <v-card-text align="center">
                      <v-progress-circular v-if="!isDataLoaded_carbon_m0" color="primary" indeterminate></v-progress-circular>
                      <div v-if="isDataLoaded_carbon_m0 && !isDataMissing_carbon_m0">{{ getCloudCardPropertyLabel(cloud_carbon_m0?.data?.total, cloud_carbon_m0?.data?.unit) }}</div>
                    </v-card-text>
                  </v-card>
                  <v-card class="ma-2 pa-2">
                    <v-card-title align="center" class="pb-0">
                      {{ getCloudMonthDateLabel(date_m1.getFullYear(), date_m1.getMonth()+1) }}
                    </v-card-title>
                    <v-card-subtitle align="center" class="pt-0">
                      Month-1
                    </v-card-subtitle>
                    <v-card-text align="center">
                      <v-progress-circular v-if="!isDataLoaded_carbon_m1" color="primary" indeterminate></v-progress-circular>
                      <div v-if="isDataLoaded_carbon_m1 && !isDataMissing_carbon_m1">{{ getCloudCardPropertyLabel(cloud_carbon_m1?.data?.total, cloud_carbon_m1?.data?.unit) }}</div>
                    </v-card-text>
                  </v-card>
                  <v-card class="ma-2 pa-2">
                    <v-card-title align="center" class="pb-0">
                      {{ getCloudMonthDateLabel(date_m2.getFullYear(), date_m2.getMonth()+1) }}
                    </v-card-title>
                    <v-card-subtitle align="center" class="pt-0">
                      Month-2
                    </v-card-subtitle>
                    <v-card-text align="center">
                      <v-progress-circular v-if="!isDataLoaded_carbon_m2" color="primary" indeterminate></v-progress-circular>
                      <div v-if="isDataLoaded_carbon_m2 && !isDataMissing_carbon_m2">{{ getCloudCardPropertyLabel(isDataLoaded_carbon_m2?.data?.total, isDataLoaded_carbon_m2?.data?.unit) }}</div>
                    </v-card-text>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-row>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
  import { computed, inject, ref, toRaw, watch } from 'vue';
  import {
    useCloudProjectDetailsByIdProvider,
  } from "@/api/cloud_projects/query";
  import {
    useCloudBilling,
  } from "@/api/cloud_billing/query";
  import {
    useCloudCarbonFootprint,
  } from "@/api/cloud_carbon/query";
  import { useRoute } from "vue-router";
  import moment from 'moment';

  import icon_dummy from '../assets/dummy.svg'
  import icon_aws from '../assets/aws.svg'
  import icon_gcp from '../assets/gcp.svg'
  import icon_azure from '../assets/azure.svg'
  import icon_noCloud from '../assets/no-cloud.svg'
  const icons_list = ['dummy', 'aws', 'gcp', 'azure']

  // Date for history
  const date_m0 = new Date();
  const date_m1 = new Date(new Date().setMonth(date_m0.getMonth()-1));
  const date_m2 = new Date(new Date().setMonth(date_m0.getMonth()-2));

  // Router Params
  const route_params = useRoute().params

  // Cloud Projects
  const { data: cloud_project } = useCloudProjectDetailsByIdProvider(
    String(route_params.provider),
    Number(route_params.project_id),
    );

  // Cloud Billing
  const { data: cloud_billing_m0 } = useCloudBilling(
    String(route_params.provider),
    Number(route_params.project_id),
    Number(date_m0.getFullYear()),
    Number(date_m0.getMonth() + 1),
  );
  const { data: cloud_billing_m1 } = useCloudBilling(
    String(route_params.provider),
    Number(route_params.project_id),
    Number(date_m1.getFullYear()),
    Number(date_m1.getMonth() + 1),
  );
  const { data: cloud_billing_m2 } = useCloudBilling(
    String(route_params.provider),
    Number(route_params.project_id),
    Number(date_m2.getFullYear()),
    Number(date_m2.getMonth() + 1),
  );

  // Cloud Carbon Footprint
  const { data: cloud_carbon_m0 } = useCloudCarbonFootprint(
    String(route_params.provider),
    Number(route_params.project_id),
    Number(date_m0.getFullYear()),
    Number(date_m0.getMonth() + 1),
  );
  const { data: cloud_carbon_m1 } = useCloudCarbonFootprint(
    String(route_params.provider),
    Number(route_params.project_id),
    Number(date_m1.getFullYear()),
    Number(date_m1.getMonth() + 1),
  );
  const { data: cloud_carbon_m2 } = useCloudCarbonFootprint(
    String(route_params.provider),
    Number(route_params.project_id),
    Number(date_m2.getFullYear()),
    Number(date_m2.getMonth() + 1),
  );

  // Promise Waiters
  const isDataLoaded_billing_m0 = ref(false);
  const isDataMissing_billing_m0 = ref(false);
  watch([cloud_billing_m0], () => {
    if (cloud_billing_m0) {
      isDataLoaded_billing_m0.value = true;
    }
  });
  const isDataLoaded_billing_m1 = ref(false);
  const isDataMissing_billing_m1 = ref(false);
  watch([cloud_billing_m0], () => {
    if (cloud_billing_m0) {
      isDataLoaded_billing_m1.value = true;
    }
  });
  const isDataLoaded_billing_m2 = ref(false);
  const isDataMissing_billing_m2 = ref(false);
  watch([cloud_billing_m0], () => {
    if (cloud_billing_m0) {
      isDataLoaded_billing_m2.value = true;
    }
  });
  const isDataLoaded_carbon_m0 = ref(false);
  const isDataMissing_carbon_m0 = ref(false);
  watch([cloud_billing_m0], () => {
    if (cloud_billing_m0) {
      isDataLoaded_carbon_m0.value = true;
    }
  });
  const isDataLoaded_carbon_m1 = ref(false);
  const isDataMissing_carbon_m1 = ref(false);
  watch([cloud_billing_m0], () => {
    if (cloud_billing_m0) {
      isDataLoaded_carbon_m1.value = true;
    }
  });
  const isDataLoaded_carbon_m2 = ref(false);
  const isDataMissing_carbon_m2 = ref(false);
  watch([cloud_billing_m0], () => {
    if (cloud_billing_m0) {
      isDataLoaded_carbon_m2.value = true;
    }
  });

  // Cloud Projects - Providers
  const getProjectProviderIcon = (provider: string) => {
    if (provider === 'dummy') {
      return icon_dummy;
    } else if (provider === 'aws') {
      return icon_aws;
    } else if (provider === 'gcp') {
      return icon_gcp;
    } else if (provider === 'azure') {
      return icon_azure;
    } else {
      return icon_noCloud;
    }
  }

  const getProjectProviderTitle = (provider: string) => {
    if (provider != null) {
      return provider;
    } else {
      return 'No Cloud Provider';
    }
  }

  // Cloud Projects - State
  const getProjectStateColor = (state: string) => {
    if (state === 'ACTIVE') {
      return 'green';
    } else if (state === 'STOPPED') {
      return 'red';
    } else if (state === 'SUSPENDED') {
      return 'orange';
    }
    return 'grey';
  }

  // Cloud Projects - Tags
  const getCloudProjectTags = (tags: any) => {
    if (tags) {
      return JSON.stringify(tags);
    }
    return 'No tags';
  }

  // Cloud Billing - Date range
  const getCloudMonthDateLabel = (year: number, month: number) => {
    return `${year}-${padWithLeadingZeros(month, 2)}`;
  }

  function padWithLeadingZeros(num: number, totalLength: number) {
    return String(num).padStart(totalLength, '0');
  }

  // Cloud BIlling/Carbon - Data print
  const getCloudCardPropertyLabel = (total: number, unit: string) => {
    if (total) {
      return `${total} ${unit}`;
    } else {
      return 'No data';
    }
  }

</script>
