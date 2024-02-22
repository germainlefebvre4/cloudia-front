<template>
    <v-card
      width="1200"
      class="mrb-2 mb-2"
    >
      <v-card-item>
        <v-card-title>{{ title }}</v-card-title>
      </v-card-item>

      <v-card-text>

        <Settings />

      </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
  import Settings from '@/components/Settings.vue'
  const title: string = 'Settings';
</script>
