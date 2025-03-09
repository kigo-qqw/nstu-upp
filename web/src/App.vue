<script setup lang="ts">
import { useLayoutStore } from "~/store/layout.store";
import {
  darkTheme,
  lightTheme,
  NConfigProvider,
  NNotificationProvider,
  NMessageProvider,
  NDialogProvider,
} from "naive-ui";
import { RouterView } from "vue-router";

const layout = useLayoutStore();
</script>

<template>
  <n-config-provider :theme="layout.isDark ? darkTheme : lightTheme">
    <n-notification-provider placement="bottom-right">
      <n-message-provider placement="bottom-right">
        <n-dialog-provider>
          <router-view />
        </n-dialog-provider>
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>
