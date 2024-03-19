<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
  >
    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item value="Home" :to="{ name: 'Home' }" exact>
        <template v-slot:prepend="{ isActive }">
          <v-icon>mdi-home</v-icon>
        </template>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>

      <v-list-item value="Projects" :to="{ name: 'Projects' }" exact>
        <template v-slot:prepend="{ isActive }">
          <v-icon>mdi-cloud-outline</v-icon>
        </template>
        <v-list-item-title>Cloud Projects</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav v-model:opened="open">
      <v-list-group value="Billing">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-currency-usd"
            title="Billing"
          ></v-list-item>
        </template>

          <v-list-item
            v-for="(item, i) in cloud_providers.filter(item => item.enabled === true)"
            :key="i"
            :prepend-icon="item.icon"
            :title="item.title"
            :value="item.slug"
            :to="{ name: item.link, params: { providerName: item.slug } }"
          ></v-list-item>
        </v-list-group>
    </v-list>

    <v-divider></v-divider>

    <template v-slot:append>
      <v-list density="compact" nav>
      <v-list-item value="Settings" :to="{ name: 'Settings' }" exact>
        <template v-slot:prepend="{ isActive }">
          <v-icon>mdi-cog</v-icon>
        </template>
        <v-list-item-title>Settings</v-list-item-title>
      </v-list-item>
    </v-list>

      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item value="Documentation" :to="{ name: 'Documentation' }" exact>
          <template v-slot:prepend="{ isActive }">
            <v-icon>mdi-file-document-outline</v-icon>
          </template>
          <v-list-item-title>Documentation <v-icon icon="mdi-open-in-new"></v-icon></v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-btn
        variant="text"
        :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
        @click="rail = !rail"
      ></v-btn>
    </template>

  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref, toRaw, watch } from 'vue';
import { Icon } from '@iconify/vue';
import {
  useSettings,
} from "@/api/settings/query";
import { ISetting } from '@/types/settings.types';
const { data: settings } = useSettings();

const drawer = ref(true);
const rail = ref(false);

const open: Array<string> = [];
let cloud_providers = [
  {
    title: 'All providers',
    slug: 'providers',
    icon: 'mdi-earth',
    link: 'Billing for all Providers',
    enabled: true,
  }
];

const cloudProviderAWSValue = ref<Boolean>(false) || {};
const cloudProviderGCPValue = ref<Boolean>(false) || {};
watch(settings, (settings) => {
  cloudProviderAWSValue.value = toRaw(settings?.data?.find(obj => { return obj.path === '/Cloud Provider/AWS' && obj.key === "enabled" }) || {id: 0, value: ""}).value;
  cloudProviderGCPValue.value = toRaw(settings?.data?.find(obj => { return obj.path === '/Cloud Provider/GCP' && obj.key === "enabled" }) || {id: 0, value: ""}).value;

  cloud_providers = [
    {
      title: 'All providers',
      slug: 'providers',
      icon: 'mdi-earth',
      link: 'Billing for all Providers',
      enabled: true,
    },
    {
      title: 'AWS',
      slug: 'aws',
      icon: 'mdi-aws',
      link: 'Billing By Provider',
      enabled: Boolean(cloudProviderAWSValue.value),
    },
    {
      title: 'GCP',
      slug: 'gcp',
      icon: 'mdi-google-cloud',
      link: 'Billing By Provider',
      enabled: Boolean(cloudProviderGCPValue.value),
    }
  ];
});
</script>
