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

    <v-list density="compact" nav>
      <v-list-item value="Billing" :to="{ name: 'Billing' }" exact>
        <template v-slot:prepend="{ isActive }">
          <v-icon>mdi-currency-usd</v-icon>
        </template>
        <v-list-item-title>Billing Overview</v-list-item-title>
      </v-list-item>
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
</script>
