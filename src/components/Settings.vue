<template>
  <v-card
    width="800"
    class="mrb-2 mb-2"
    flat
  >
    <v-card-item>
      <v-card-title>Cloud Providers</v-card-title>
    </v-card-item>

    <v-card-text>
      <v-switch
        v-model="cloudProviderDummy.value"
        label="Dummy Cloud Provider"
        color="primary"
        @change="updateSetting(cloudProviderDummy)"
      ></v-switch>

      <v-switch
        v-model="cloudProviderAWS.value"
        label="Amazon Web Services"
        color="primary"
        @change="updateSetting(cloudProviderAWS)"
      ></v-switch>

      <v-switch
        v-model="cloudProviderGCP.value"
        label="Google Cloud"
        color="primary"
        @change="updateSetting(cloudProviderGCP)"
      ></v-switch>

      <v-switch
        v-model="cloudProviderAzure.value"
        label="Microsoft Azure"
        color="primary"
        @change="updateSetting(cloudProviderAzure)"
        disabled
      ></v-switch>
    </v-card-text>
  </v-card>

  <v-expand-transition>
    <v-card
      width="800"
      class="mrb-2 mb-2"
      flat
      v-show="cloudProviderAWS.value"
    >
      <v-card-item>
        <v-card-title>Amazon Web Services</v-card-title>
      </v-card-item>

      <v-card-text>
        <h3>Root account credentials</h3>

        <v-text-field
          v-model="cloudProviderAWSRootAccountAccessKeyId.value"
          label="Access Key ID"
          color="primary"
          @change="updateSetting(cloudProviderAWSRootAccountAccessKeyId)"
        ></v-text-field>

        <v-text-field
          v-model="cloudProviderAWSRootAccountecretAccessKey.value"
          label="Secret Access Key"
          color="primary"
          @change="updateSetting(cloudProviderAWSRootAccountecretAccessKey)"
        ></v-text-field>

        <v-text-field
          v-model="cloudProviderAWSRootAccountRegion.value"
          label="Region"
          color="primary"
          @change="updateSetting(cloudProviderAWSRootAccountRegion)"
        ></v-text-field>

        <v-divider></v-divider>
      </v-card-text>
    </v-card>
  </v-expand-transition>

  <v-expand-transition>
    <v-card
      width="800"
      class="mrb-2 mb-2"
      flat
      v-show="cloudProviderGCP.value"
    >
      <v-card-item>
        <v-card-title>Google Cloud</v-card-title>
      </v-card-item>

      <v-card-text>
        <h3>Organization</h3>

        <v-text-field
          v-model="cloudProviderGCPOrganization.value"
          label="Organization ID"
          color="primary"
          @change="updateSetting(cloudProviderGCPOrganization)"
        ></v-text-field>

        <v-text-field
          v-model="cloudProviderGCPBillingAccountId.value"
          label="Billing AccountId ID"
          color="primary"
          @change="updateSetting(cloudProviderGCPBillingAccountId)"
        ></v-text-field>

        <v-divider></v-divider>

        <h3>Billing project</h3>

        <h4>Project ID</h4>

        <v-text-field
          v-model="cloudProviderGCPBillingProjectId.value"
          label="Project ID"
          color="primary"
          @change="updateSetting(cloudProviderGCPBillingProjectId)"
        ></v-text-field>

        <h4>BigQuery Dataset Name</h4>

        <v-text-field
          v-model="cloudProviderGCPBillingBigqueyDatasetName.value"
          label="BigQuery Dataset Name"
          color="primary"
          @change="updateSetting(cloudProviderGCPBillingBigqueyDatasetName)"
        ></v-text-field>

        <h4>Service account credentials</h4>

        <v-textarea
          v-model="cloudProviderGCPBillingServiceAccountCredentials.value"
          label="Service Account JSON Key File"
          color="primary"
          @change="updateSetting(cloudProviderGCPBillingServiceAccountCredentials)"
        ></v-textarea>

        <v-divider></v-divider>

        <h3>Carbon Footprint project</h3>

        <h4>Project ID</h4>

        <v-text-field
          v-model="cloudProviderGCPCarbpnFootprintProjectId.value"
          label="Project ID"
          color="primary"
          @change="updateSetting(cloudProviderGCPCarbpnFootprintProjectId)"
        ></v-text-field>

        <h4>BigQuery Dataset Name</h4>

        <v-text-field
          v-model="cloudProviderGCPCarbpnFootprintBigqueyDatasetName.value"
          label="BigQuery Dataset Name"
          color="primary"
          @change="updateSetting(cloudProviderGCPCarbpnFootprintBigqueyDatasetName)"
        ></v-text-field>

        <h4>Service account credentials</h4>

        <v-textarea
          v-model="cloudProviderGCPCarbpnFootprintServiceAccountCredentials.value"
          label="Service Account JSON Key File"
          color="primary"
          @change="updateSetting(cloudProviderGCPCarbpnFootprintServiceAccountCredentials)"
        ></v-textarea>

        <v-divider></v-divider>
      </v-card-text>
    </v-card>
  </v-expand-transition>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import moment from 'moment';
  import {
    useSettings,
    setSetting,
  } from "@/api/settings/query";
  import {
    ISetting,
    ISettingSet,
} from "@/types/settings.types";
  const { data: settings } = useSettings();

  const cloudProviderDummy = ref<ISetting>({id: 0, value: null}) || {};
  const cloudProviderAWS = ref<ISetting>({id: 0, value: null}) || {};
  const cloudProviderGCP = ref<ISetting>({id: 0, value: null}) || {};
  const cloudProviderAzure = ref<ISetting>({id: 0, value: null}) || {};
  const cloudProviderAWSRootAccountAccessKeyId = ref<ISetting>({id: 0, value: null}) || {};
  const cloudProviderAWSRootAccountecretAccessKey = ref<ISetting>({id: 0, value: null}) || {};
  const cloudProviderAWSRootAccountRegion = ref<ISetting>({id: 0, value: null}) || {};
  const cloudProviderGCPOrganization = ref<ISetting>({id: 0, value: null}) || {};
  const cloudProviderGCPBillingAccountId = ref<ISetting>({id: 0, value: null}) || {};
  const cloudProviderGCPBillingProjectId = ref<ISetting>({id: 0, value: null}) || {};
  const cloudProviderGCPBillingServiceAccountCredentials = ref<ISetting>({id: 0, value: null}) || {};
  const cloudProviderGCPBillingBigqueyDatasetName = ref<ISetting>({id: 0, value: null}) || {};
  const cloudProviderGCPCarbpnFootprintProjectId = ref<ISetting>({id: 0, value: null}) || {};
  const cloudProviderGCPCarbpnFootprintServiceAccountCredentials = ref<ISetting>({id: 0, value: null}) || {};
  const cloudProviderGCPCarbpnFootprintBigqueyDatasetName = ref<ISetting>({id: 0, value: null}) || {};
  const localSettings = ref(Object([{path: 'test', children: [{path: 'test2', children: []}]}]));
  watch(settings, (settings) => {
    const cloudProviderDummy_obj = settings?.data?.find(obj => { return obj.path === '/Cloud Provider/Dummy' && obj.key === "enabled" }) || {id: 0, value: ""};
    cloudProviderDummy.value.id = Number(cloudProviderDummy_obj.id);
    cloudProviderDummy.value.value = Boolean(cloudProviderDummy_obj.value);

    // Amazon Web Services
    const cloudProviderAWS_obj = settings?.data?.find(obj => { return obj.path === '/Cloud Provider/AWS' && obj.key === "enabled" }) || {id: 0, value: ""};
    cloudProviderAWS.value.id = Number(cloudProviderAWS_obj.id);
    cloudProviderAWS.value.value = Boolean(cloudProviderAWS_obj.value);

    const cloudProviderGCP_obj = settings?.data?.find(obj => { return obj.path === '/Cloud Provider/GCP' && obj.key === "enabled" }) || {id: 0, value: ""};
    cloudProviderGCP.value.id = Number(cloudProviderGCP_obj .id);
    cloudProviderGCP.value.value = Boolean(cloudProviderGCP_obj .value);

    const cloudProviderAWSRootAccountAccessKeyId_obj = settings?.data?.find(obj => { return obj.path === '/Cloud Provider/AWS/credentials/root_account' && obj.key === "aws_root_account_access_key_id" }) || {id: 0, value: ""};
    cloudProviderAWSRootAccountAccessKeyId.value.id = Number(cloudProviderAWSRootAccountAccessKeyId_obj.id);
    cloudProviderAWSRootAccountAccessKeyId.value.value = String(cloudProviderAWSRootAccountAccessKeyId_obj.value);

    const cloudProviderAWSRootAccountecretAccessKey_obj = settings?.data?.find(obj => { return obj.path === '/Cloud Provider/AWS/credentials/root_account' && obj.key === "aws_root_account_secret_access_key" }) || {id: 0, value: ""};
    cloudProviderAWSRootAccountecretAccessKey.value.id = Number(cloudProviderAWSRootAccountecretAccessKey_obj.id);
    cloudProviderAWSRootAccountecretAccessKey.value.value = String(cloudProviderAWSRootAccountecretAccessKey_obj.value);

    const cloudProviderAWSRootAccountRegion_obj = settings?.data?.find(obj => { return obj.path === '/Cloud Provider/AWS/credentials/root_account' && obj.key === "aws_root_account_region" }) || {id: 0, value: ""};
    cloudProviderAWSRootAccountRegion.value.id = Number(cloudProviderAWSRootAccountRegion_obj.id);
    cloudProviderAWSRootAccountRegion.value.value = String(cloudProviderAWSRootAccountRegion_obj.value);

    // Google Cloud
    const cloudProviderGCPOrganization_obj = settings?.data?.find(obj => { return obj.path === '/Cloud Provider/GCP/root_project' && obj.key === "gcp_organization_id" }) || {id: 0, value: ""};
    cloudProviderGCPOrganization.value.id = Number(cloudProviderGCPOrganization_obj.id);
    cloudProviderGCPOrganization.value.value = String(cloudProviderGCPOrganization_obj.value);

    const cloudProviderGCPBillingAccountId_obj = settings?.data?.find(obj => { return obj.path === '/Cloud Provider/GCP/root_project' && obj.key === "gcp_billing_account_id" }) || {id: 0, value: ""};
    cloudProviderGCPBillingAccountId.value.id = Number(cloudProviderGCPBillingAccountId_obj.id);
    cloudProviderGCPBillingAccountId.value.value = String(cloudProviderGCPBillingAccountId_obj.value);

    const cloudProviderGCPBillingProjectId_obj = settings?.data?.find(obj => { return obj.path === '/Cloud Provider/GCP/billing_project' && obj.key === "gcp_project_id" }) || {id: 0, value: ""};
    cloudProviderGCPBillingProjectId.value.id = Number(cloudProviderGCPBillingProjectId_obj.id);
    cloudProviderGCPBillingProjectId.value.value = String(cloudProviderGCPBillingProjectId_obj.value);

    const cloudProviderGCPBillingServiceAccountCredentials_obj = settings?.data?.find(obj => { return obj.path === '/Cloud Provider/GCP/credentials/billing_project' && obj.key === "gcp_service_account_json_key_file" }) || {id: 0, value: ""};
    cloudProviderGCPBillingServiceAccountCredentials.value.id = Number(cloudProviderGCPBillingServiceAccountCredentials_obj.id);
    cloudProviderGCPBillingServiceAccountCredentials.value.value = String(cloudProviderGCPBillingServiceAccountCredentials_obj.value);

    const cloudProviderGCPBillingBigqueyDatasetName_obj = settings?.data?.find(obj => { return obj.path === '/Cloud Provider/GCP/billing_project' && obj.key === "gcp_bigquery_dataset_name" }) || {id: 0, value: ""};
    cloudProviderGCPBillingBigqueyDatasetName.value.id = Number(cloudProviderGCPBillingBigqueyDatasetName_obj.id);
    cloudProviderGCPBillingBigqueyDatasetName.value.value = String(cloudProviderGCPBillingBigqueyDatasetName_obj.value);

    const cloudProviderGCPCarbpnFootprintProjectId_obj = settings?.data?.find(obj => { return obj.path === '/Cloud Provider/GCP/carbon_footprint_project' && obj.key === "gcp_project_id" }) || {id: 0, value: ""};
    cloudProviderGCPCarbpnFootprintProjectId.value.id = Number(cloudProviderGCPCarbpnFootprintProjectId_obj.id);
    cloudProviderGCPCarbpnFootprintProjectId.value.value = String(cloudProviderGCPCarbpnFootprintProjectId_obj.value);

    const cloudProviderGCPCarbpnFootprintServiceAccountCredentials_obj = settings?.data?.find(obj => { return obj.path === '/Cloud Provider/GCP/credentials/carbon_footprint_project' && obj.key === "gcp_service_account_json_key_file" }) || {id: 0, value: ""};
    cloudProviderGCPCarbpnFootprintServiceAccountCredentials.value.id = Number(cloudProviderGCPCarbpnFootprintServiceAccountCredentials_obj.id);
    cloudProviderGCPCarbpnFootprintServiceAccountCredentials.value.value = String(cloudProviderGCPCarbpnFootprintServiceAccountCredentials_obj.value);

    const cloudProviderGCPCarbpnFootprintBigqueyDatasetName_obj = settings?.data?.find(obj => { return obj.path === '/Cloud Provider/GCP/carbon_footprint_project' && obj.key === "gcp_bigquery_dataset_name" }) || {id: 0, value: ""};
    cloudProviderGCPCarbpnFootprintBigqueyDatasetName.value.id = Number(cloudProviderGCPCarbpnFootprintBigqueyDatasetName_obj.id);
    cloudProviderGCPCarbpnFootprintBigqueyDatasetName.value.value = String(cloudProviderGCPCarbpnFootprintBigqueyDatasetName_obj.value);

  });

  const updateSetting = (obj: ISetting) => {
    setSetting(obj.id, obj.value);
    if (obj.type === "bool") {
      obj.value = Boolean(obj.value);
    }
  }

  import RecursiveCard from "@/components/RecursiveCard.vue";


</script>
