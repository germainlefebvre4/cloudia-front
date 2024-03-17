<template>
  <CloudBillingByProvider :providerName="route.params.providerName"/>
</template>

<script lang="ts" setup>
  import CloudBillingByProvider from '@/components/CloudBillingByProvider.vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()

  const props = defineProps({
    providerName: String,
  });

</script>
