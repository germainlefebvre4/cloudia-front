<template>
  <div class="d-flex flex-wrap align-center ml-5">

    <div class="d-flex flex-wrap align-center">
      <v-card
        width="400"
        v-for="cloud_project in cloud_projects?.data.projects"
        class="mrb-2 mb-2"
      >
        <v-card-item>
          <v-card-title>
            {{ cloud_project.name }}
            <v-chip
              v-if="hasEnvPropertyInTags(cloud_project.tags)"
              variant="flat"
              :color="getEnvColorFromTags(cloud_project.tags)"
            >
              env={{ getEnvValueFromTags(cloud_project.tags) }}
            </v-chip>
          </v-card-title>

          <v-card-subtitle>{{ cloud_project.id }}</v-card-subtitle>
        </v-card-item>

        <v-card-text>
          <v-table density="compact">
            <tbody>
              <tr
                v-for="(value, name, index) in cloud_project"
                :key="index"
              >
                <td width="100">{{ name }}</td> 
                <td v-if="name === 'email'"><i>{{ value }}</i></td>
                <td v-else-if="name === 'created_at' && value != null">{{ moment(value).format('DD/MM/YYYY') }}</td>
                <td v-else-if="name === 'tags'">
                      <div
                        v-for="(value, name, index) in value"
                        :key="index"
                      >
                        {{ name }}: {{ value }}
                      </div>
                </td>
                <td v-else>{{ value }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>
    </div>
  </div>

</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import moment from 'moment';
  import {
    useCloudProjectsAll,
  } from "@/api/cloud_projects/query";
  import {
    useSettings,
  } from "@/api/settings/query";


  const { data: cloud_projects } = useCloudProjectsAll();

  const hasEnvPropertyInTags = (tags: any) => {
    if (tags) {
      return tags.hasOwnProperty('env');
    }
    return false;
  }

  const getEnvValueFromTags = (tags: any) => {
    if (tags) {
      return tags.env;
    }
    return '';
  }

  const getEnvColorFromTags = (tags: any) => {
    if (tags) {
      if (['dev'].includes(tags.env)) {
        return 'green';
      } else if (['staging'].includes(tags.env)) {
        return 'orange';
      } else if (['prod'].includes(tags.env)) {
        return 'red';
      }
    }
    return 'grey';
  }

</script>
