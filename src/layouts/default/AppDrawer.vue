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
            v-for="(item, i) in cloud_providers"
            :key="i"
            :prepend-icon="item.icon"
            :title="item.title"
            :value="item.slug"
            :to="{ name: item.link, params: { providerName: item.slug } }"
          ></v-list-item>
        </v-list-group>
    </v-list>


    <template v-slot:append>
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
  import { ref } from 'vue';
  import { Icon } from '@iconify/vue';
  
  const drawer = ref(true);
  const rail = ref(false);

  const open = ['Billing'];
  const cloud_providers = [
    {
      title: 'All providers',
      slug: 'providers',
      icon: 'mdi-earth',
      link: 'Billing for all Providers',
    },
    {
      title: 'AWS',
      slug: 'aws',
      icon: 'mdi-aws',
      link: 'Billing By Provider',
    },
    {
      title: 'GCP',
      slug: 'gcp',
      icon: 'mdi-google-cloud',
      link: 'Billing By Provider',
    }
  ];
</script>
