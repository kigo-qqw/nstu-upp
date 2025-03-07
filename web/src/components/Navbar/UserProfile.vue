<script setup lang="ts">
import { NDropdown, NIcon } from "naive-ui";
import { RouterLink } from "vue-router";
import {
  DoorArrowRight20Regular as LogoutIcon,
  Settings20Regular as SettingsIcon,
} from "@vicons/fluent";
import { h } from "vue";

const renderIcon = (icon: any) => {
  return () => h(NIcon, null, { default: () => h(icon, {}) });
};

const renderLabel = (title: string, path: string) => {
  return () => h(RouterLink, { to: { path } }, { default: () => title });
};

const items = [
  {
    icon: renderIcon(SettingsIcon),
    label: renderLabel("Profile", "/account/profile"),
    key: "options",
  },
  {
    icon: renderIcon(LogoutIcon),
    label: renderLabel("Logout", "/account/login"),
    key: "login",
  },
];
</script>

<template>
  <div class="flex items-center" v-bind="$attrs">
    <n-dropdown :options="items">
      <img class="avatar" src="@/assets/images/user.jpg" alt="User Avatar" />
    </n-dropdown>
  </div>
</template>

<style scoped lang="scss">
.avatar {
  width: 33px;
  height: 33px;
  border-radius: 50%;
}
</style>
