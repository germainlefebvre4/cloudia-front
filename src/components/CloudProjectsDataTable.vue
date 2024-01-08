<template>
  <div class="align-center ml-5">

    <v-card
    flat
    title="Projects"
  >

    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        single-line
        variant="outlined"
        hide-details
      ></v-text-field>
    </template>

    <v-data-table
      :items="cloud_projects?.data.projects"
      :search="search"
      :items-per-page="itemsPerPage"
      :sort-by="sortBy"
    >
      <template v-slot:item.provider="{ value }">
        <img :src="getProjectProviderIcon(value)" width="30" :title="value" :alt="value"/>
      </template>
      <template v-slot:item.email="{ value }">
        <i>{{ value }}</i>
      </template>
      <template v-slot:item.state="{ value }">
        <v-chip :color="getProjectStateColor(value)">
          {{ value }}
        </v-chip>
      </template>
      <template v-slot:item.tags="{ value }">
        <v-chip 
          v-for="(val, key, index) in value"
          color="darkgrey"
        >
          <b>{{ key }}</b>: {{ val }}
        </v-chip>
      </template>
    </v-data-table>

    </v-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    useCloudProjectsAll,
  } from "@/api/cloud_projects/query";

  import icon_dummy from '../assets/dummy.svg'
  import icon_aws from '../assets/aws.svg'
  import icon_gcp from '../assets/gcp.svg'
  import icon_azure from '../assets/azure.svg'
  import icon_other from '../assets/dummy.svg'
  const icons_list = ['dummy', 'aws', 'gcp', 'azure']

  // Cloud Projects
  const { data: cloud_projects } = useCloudProjectsAll();

  // Data Table  
  const sortBy = [{ key: 'provider', order: 'asc' }];
  const itemsPerPage = 10;

  // Cloud Providers Icons
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
      return icon_other;
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

  // Data Table - Search
  const search = ref('');

</script>
