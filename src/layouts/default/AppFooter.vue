<template>
  <v-footer
    class="text-center d-flex flex-column"
  >
    <div>
      <v-btn
        v-for="(social, index) in icons_list"
        :key="social.icon"
        :href="social.href"
        class="mx-4"
        rounded
        width="40"
        height="30"
      >
        <v-tooltip
          :text="social.title"
          location="top"
        >
          <template v-slot:activator="{ props }">
            <Icon
              v-bind="props"
              class="mx-4"
              :icon="social.icon"
              height="20"
            ></Icon>
          </template>
        </v-tooltip>
      </v-btn>
    </div>

    <div class="mt-3">
      2024-{{ new Date().getFullYear() }} — <strong>Cloudia</strong>
    </div>
  </v-footer>
</template>

<script lang="ts" setup>
  import { Icon } from '@iconify/vue';
  const icons = [
    'mdi-facebook',
    'mdi-twitter',
    'mdi-linkedin',
    'mdi-instagram',
  ];
  const icons_list = [
    {
      icon: 'devicon:twitter',
      href: 'https://twitter.com/',
      title: 'Follow us on Twitter',
    },
    {
      icon: 'logos:github-icon',
      href: 'https://github.com/',
      title: 'Check out our GitHub',
    },
    {
      icon: 'logos:discord-icon',
      href: 'https://discord.com/',
      title: 'Join our Discord',
    },
    {
      icon: 'logos:slack-icon',
      href: 'https://slack.com/',
      title: 'Join our Slack',
    },
    {
      icon: 'logos:docker-icon',
      href: 'https://hub.docker.com/',
      title: 'Check out our Docker Hub',
    },
    {
      icon: 'simple-icons:artifacthub',
      href: 'https://artifacthub.io/',
      title: 'Check out our Artifact Hub',
    },
  ];
</script>
