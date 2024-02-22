<template>
    <v-card
      width="800"
      class="mrb-2 mb-2"
    >
      <v-card-item>
        <v-card-title>Cloud Providers</v-card-title>
      </v-card-item>

      <v-card-text>
        <v-switch
          v-model="cloudProviderDummy"
          label="Dummy Cloud Provider"
          color="primary"
        ></v-switch>

        <v-switch
          v-model="cloudProviderAWS"
          label="Amazon Web Services"
          color="primary"
        ></v-switch>

        <v-switch 
          v-model="cloudProviderGCP"
          label="Google Cloud"
          color="primary"
        ></v-switch>
        
        <v-switch
          v-model="cloudProviderAzure"
          label="Microsoft Azure"
          color="primary"
          disabled
        ></v-switch>
      </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import moment from 'moment';
  import {
    useSettings,
  } from "@/api/settings/query";

  const { data: settings } = useSettings();

  const cloudProviderDummy = ref(false);
  const cloudProviderAWS = ref(false);
  const cloudProviderGCP = ref(false);
  const cloudProviderAzure = ref(false);
  watch(settings, (settings) => {
    cloudProviderDummy.value = Boolean(settings?.data?.dummy);
    cloudProviderAWS.value = Boolean(settings?.data?.aws);
    cloudProviderGCP.value = Boolean(settings?.data?.gcp);
    cloudProviderAzure.value = Boolean(settings?.data?.azure);
  });

</script>
