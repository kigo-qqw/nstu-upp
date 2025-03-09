<script setup lang="ts">
import { NPageHeader } from "naive-ui";
import UserProfile from "~/components/Navbar/UserProfile.vue";
</script>

<template>
  <n-page-header>
    <template #extra>
      <div class="flex items-center">
        <UserProfile class="mx-1" />
      </div>
    </template>
  </n-page-header>
</template>
