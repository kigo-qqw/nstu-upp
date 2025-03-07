<script setup lang="ts">
import { NPageHeader, NButton } from "naive-ui";
import UserProfile from "~/components/Navbar/UserProfile.vue";
// import {
//   PanelLeftContract24Regular as CollapseIcon,
//   PanelLeftExpand20Regular as ExpandIcon,
//   Navigation20Regular as MenuIcon,
// } from "@vicons/fluent";

import { RouterLink } from "vue-router";
</script>

<template>
  <!--  <header-->
  <!--      class="sticky top-0 z-50 flex h-14 w-full items-center justify-between border-y border-gray-300 bg-default-light p-2 dark:border-gray-950 dark:bg-default-dark sm:p-4"-->
  <!--  >-->
  <!--    <div class="flex h-full items-center justify-start space-x-3">-->
  <!--      <MenuVisibilityToggle />-->
  <!--      <Breadcrumb />-->
  <!--    </div>-->

  <!--    <div class="flex h-full items-center justify-end space-x-4">-->
  <!--      <DiscordButton />-->
  <!--      <GitHubButton />-->
  <!--      <DocsButton />-->
  <!--      <FullScreenButton />-->
  <!--      <LanguageButton />-->
  <!--      <ThemeToggle />-->
  <!--      <NotificationButton />-->
  <!--      <SettingsButton />-->
  <!--      <UserAvatar />-->
  <!--    </div>-->
  <!--  </header>-->

  <n-page-header>
    <template #title>
      <div>
        <div>
          <n-button>
            <RouterLink to="/project">Project</RouterLink>
          </n-button>
          <n-button>Button 2</n-button>
          <n-button>Button 3</n-button>
          <!--          <img-->
          <!--            v-if="mobileMode"-->
          <!--            width="35"-->
          <!--            src="@/assets/images/logo.png"-->
          <!--            alt="logo"-->
          <!--            class="logo"-->
          <!--          />-->

          <!--          <n-button-->
          <!--            mx-2-->
          <!--            size="small"-->
          <!--            quaternary-->
          <!--            circle-->
          <!--            :class="{ 'rotate-180': isRtl }"-->
          <!--            @click="layoutStore.toggleSidebar"-->
          <!--          >-->
          <!--            <template #icon>-->
          <!--              <NIcon size="1.2rem">-->
          <!--                <MenuIcon v-if="mobileMode" />-->
          <!--                <ExpandIcon v-else-if="collapsed" />-->
          <!--                <CollapseIcon v-else />-->
          <!--              </NIcon>-->
          <!--            </template>-->
          <!--          </n-button>-->
        </div>
        <!--        <BreadCrumb />-->
      </div>
    </template>
    <template #extra>
      <div class="flex items-center">
        <!--        <ThemeCustomize />-->
        <!--        <ThemeSwitch class="mx-1" />-->
        <!--        <LanguageSelect class="mx-1" />-->
        <!--        <Notifications class="mx-1" />-->
        <UserProfile class="mx-1" />
      </div>
    </template>
  </n-page-header>
</template>
