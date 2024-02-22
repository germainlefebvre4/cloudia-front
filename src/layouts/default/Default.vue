<template>
  <v-app>
    <default-bar />
    <default-drawer />
    
    <default-view />

    <default-footer />
  </v-app>
</template>

<script lang="ts" setup>
  import DefaultBar from './AppBar.vue'
  import DefaultDrawer from './AppDrawer.vue'
  import DefaultView from './View.vue'
  import DefaultFooter from './AppFooter.vue'
</script>
