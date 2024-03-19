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
        <v-card-title>AWS Credentials</v-card-title>
      </v-card-item>

      <v-card-text>
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
        <v-card-title>Google Cloud Credentials</v-card-title>
      </v-card-item>

      <v-card-text>
        <v-textarea
          v-model="cloudProviderGCPServiceAccountCredentials.value"
          label="Service Account JSON Key File"
          color="primary"
          @change="updateSetting(cloudProviderGCPServiceAccountCredentials)"
        ></v-textarea>
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
  const cloudProviderGCPServiceAccountCredentials = ref<ISetting>({id: 0, value: null}) || {};
  const localSettings = ref(Object([{path: 'test', children: [{path: 'test2', children: []}]}]));
  watch(settings, (settings) => {
    const cloudProviderDummy_obj = settings?.data?.find(obj => { return obj.path === '/Cloud Provider/Dummy' && obj.key === "enabled" }) || {id: 0, value: ""};
    cloudProviderDummy.value.id = Number(cloudProviderDummy_obj.id);
    cloudProviderDummy.value.value = Boolean(cloudProviderDummy_obj.value);

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

    const cloudProviderGCPServiceAccountCredentials_obj = settings?.data?.find(obj => { return obj.path === '/Cloud Provider/GCP/credentials/root_project' && obj.key === "gcp_service_account_json_key_file" }) || {id: 0, value: ""};
    cloudProviderGCPServiceAccountCredentials.value.id = Number(cloudProviderGCPServiceAccountCredentials_obj.id);
    cloudProviderGCPServiceAccountCredentials.value.value = String(cloudProviderGCPServiceAccountCredentials_obj.value);
  });

  const updateSetting = (obj: ISetting) => {
    setSetting(obj.id, obj.value);
    if (obj.type === "bool") {
      obj.value = Boolean(obj.value);
    }
  }

  import RecursiveCard from "@/components/RecursiveCard.vue";


</script>
