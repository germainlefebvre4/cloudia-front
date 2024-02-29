<template>
    <v-card pl-0 ml-0 flat>
        <v-card-item>
            <v-card-title>{{ node.path }}</v-card-title>
        </v-card-item>
        <v-card-text>
            <div v-if="node.key">
                {{ node.key }}: {{ node.value }}
            </div>
            <recursive-card
                v-for="setting of node.children" :key="setting.path" :node="setting"
            />
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
const props = defineProps({
    node: {
        type: Object,
        required: true
    }
});

import { ref, watch } from 'vue';

</script>