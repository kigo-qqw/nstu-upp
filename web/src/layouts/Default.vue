<script setup lang="ts">
import { NLayout } from "naive-ui";
import { RouterView } from "vue-router";
import Navbar from "~/components/Navbar/Navbar.vue";
import Sidebar from "~/components/Sidebar/Sidebar.vue";
import {projectService} from "~/services";

console.log("Default layout");

const isFluid = true;

projectService.getAll();
</script>

<template>
  <n-layout has-sider position="absolute" sider-placement="left">
    <Sidebar />

    <n-layout :native-scrollbar="false" position="static">
      <div
        class="main-content flex-1 bg-slate-100 dark:bg-slate-800 dark:text-white my-2 mr-2"
      >
        <Navbar />
        <div
          class="px-0 py-1 md:p-3 md:pb-15 relative md:mx-auto"
          :class="{ 'md-container': !isFluid }"
        >
          <router-view v-slot="{ Component, route }">
            <component :is="Component" :key="route" />
          </router-view>
        </div>
      </div>
    </n-layout>
  </n-layout>
</template>

<style lang="scss">
.n-layout {
  padding: 0 4px;
  background-color: transparent !important;
}
</style>
