<template>
  <v-app-bar elevation="1" height="65">
    <v-app-bar-title class="d-flex align-left justify-center">
      <Icon height="50" icon="healthicons:c"></Icon>
      <Icon height="50" icon="healthicons:l"></Icon>
      <Icon height="50" icon="material-symbols-light:cloud-circle" class="pb-0"></Icon>
      <Icon height="50" icon="healthicons:u"></Icon>
      <Icon height="50" icon="healthicons:d"></Icon>
      <Icon height="50" icon="healthicons:i"></Icon>
      <Icon height="50" icon="healthicons:a"></Icon>
    </v-app-bar-title>

    <template v-slot:append>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :value="i"
            :to="item.to"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
  import { Icon } from '@iconify/vue';

  const items = [
    {
      title: 'Settings',
      icon: 'mdi-cloud-outline',
      to: { name: 'Settings' },
    },
    {
      title: 'About',
      icon: 'mdi-cloud-outline',
      to: { name: 'About' },
    },
  ];
</script>
