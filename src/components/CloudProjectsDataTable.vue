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

    <v-card flat title="Filters">
      <v-card flat class="d-flex flex pl-2">
        <v-card flat title="Providers">
          <v-checkbox
            v-model="checkboxCloudProviders"
            label="(no provider)"
            value="null"
            @change="filterProjects()"
          ></v-checkbox>
          <v-checkbox
            v-model="checkboxCloudProviders"
            label="AWS"
            value="aws"
            @change="filterProjects()"
          ></v-checkbox>
          <v-checkbox
            v-model="checkboxCloudProviders"
            label="GCP"
            value="gcp"
            @change="filterProjects()"
          ></v-checkbox>
          <v-checkbox
            v-model="checkboxCloudProviders"
            label="Azure"
            value="azure"
            @change="filterProjects()"
          ></v-checkbox>
        </v-card>
        <v-card flat title="State" class="pl-5">
          <v-switch
            v-model="checkboxProjectState"
            label="Active"
            value="ACTIVE"
            color="primary"
            @change="filterProjects()"
          ></v-switch>
        </v-card>
      </v-card>
    </v-card>

    <v-data-table
      :headers="headers"
      :items="projects_search?.value"
      :search="search"
      :items-per-page="itemsPerPage"
      :sort-by="sortBy"
    >
      <template v-slot:item="{ item }">
        <tr
          @click="clickGoToProjectDetails(item.provider, item.id)"
          class="projects-datatable-bg"
        >
          <td>
            <img :src="getProjectProviderIcon(item.provider)" width="30" :title="getProjectProviderTitle(item.provider)" :alt="getProjectProviderTitle(item.provider)"/>
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.id }}</td>
          <td><i>{{ item.email }}</i></td>
          <td>
            <v-chip
              v-for="(val, key, index) in item.tags"
              color="darkgrey"
            >
              <b>{{ key }}</b>: {{ val }}
            </v-chip>
          </td>
          <td>{{ moment(item.created_at).format('DD-MM-YYYY') }}</td>
          <td>
            <v-chip :color="getProjectStateColor(item.state)">
              {{ item.state }}
            </v-chip>
          </td>
          <td>
            <router-link :to="{ name: 'Project Details', params: { provider: item.provider, project_id: item.id } }">
            <v-btn>
                View
              </v-btn>
            </router-link>
          </td>
        </tr>
      </template>
<!---
      <template v-slot:item.provider="{ value }">
        <img :src="getProjectProviderIcon(value)" width="30" :title="getProjectProviderTitle(value)" :alt="getProjectProviderTitle(value)"/>
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
-->
    </v-data-table>

    </v-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, inject, ref, toRaw, watch } from 'vue';
  import {
    useCloudProjectsAll,
  } from "@/api/cloud_projects/query";

  import icon_dummy from '../assets/dummy.svg'
  import icon_aws from '../assets/aws.svg'
  import icon_gcp from '../assets/gcp.svg'
  import icon_azure from '../assets/azure.svg'
  import icon_noCloud from '../assets/no-cloud.svg'
import { computedAsync } from '@vueuse/core';
  const icons_list = ['dummy', 'aws', 'gcp', 'azure']
  import moment from 'moment';
  import router from '@/router';

  // Cloud Projects
  const { data: cloud_projects } = useCloudProjectsAll();

  // Data Table  
  const headers = [
    { title: 'Provider', key: 'provider', sortable: true },
    { title: 'Name', key: 'name', sortable: true },
    { title: 'ID', key: 'id', sortable: true },
    { title: 'Email', key: 'email', sortable: true },
    { title: 'Tags', key: 'tags', sortable: false },
    { title: 'Created at', key: 'created_at', sortable: false },
    { title: 'State', key: 'state', sortable: true },
    { title: '' },
  ];
  const sortBy = [{ key: 'provider', order: 'asc' }];
  const itemsPerPage = 10;

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

  // Data Table - Search
  const search = ref('');

  // Data Table - Checkbox
  const checkboxCloudProviders= ref(['aws', 'gcp', 'azure']);
  const checkboxProjectState = ref(['ACTIVE']);
  let projects_search = ref();
  projects_search.value = computed(() => {
    return toRaw(cloud_projects?.value?.data?.projects);
  });
  
  const filterProjects = () => {
    const projects = cloud_projects.value.data.projects.filter((project: any) => {
      let selectCloudProvider = false, selectProjectState = false;
      if (project.provider != null) {
        for (const cloudProvider of toRaw(checkboxCloudProviders.value)) {
          if (project.provider.includes(cloudProvider)) {
            selectCloudProvider = true;
          }
        }
      } else {
        if (checkboxCloudProviders.value.includes('null')) {
          selectCloudProvider = true;
        }
      }
      if (project.state != null) {
        for (const projectState of toRaw(checkboxProjectState.value)) {
          if (project.state.includes(projectState)) {
            selectProjectState = true;
          }
        }
      }
      return selectCloudProvider && selectProjectState;
    });
    const projects2: any[] = [];
    projects.forEach((element: any) => {
      projects2.push(toRaw(element));
    });
    projects_search.value = ref(toRaw(projects));
  }

  const clickGoToProjectDetails = (provider: any, project_id: any) => {
    router.push({ name: 'Project Details', params: { provider: provider, project_id: project_id } });
  }

</script>

<style scoped>
.projects-datatable-bg {
  display: table-row;
}

.projects-datatable-bg:hover {
  background: rgb(var(--v-theme-primary)) !important;
  /* background: rgb(var(--v-theme-secondary)) !important;  */
  color: white !important;
}
</style>
