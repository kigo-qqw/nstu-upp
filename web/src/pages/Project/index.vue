<route lang="yaml">
meta:
  title: project
  layout: Default
</route>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { NButton } from "naive-ui";
import { useProjectStore } from "~/store/project.store";
import projectService from "~/services/project.service";

projectService.getAll();

const projectStore = useProjectStore();
const { projects, isLoading } = storeToRefs(projectStore);
</script>

<template>
  <div v-if="!isLoading">
    <div v-for="[_, project] in projects" :key="project.id">
      <n-button>
        <router-link :to="`/project/${project.id}`">
          {{ project.name }}
        </router-link>
      </n-button>
    </div>
  </div>
</template>
