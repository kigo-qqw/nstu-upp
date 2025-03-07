<route lang="yaml">
meta:
  title: project
  layout: Default
</route>

<script setup lang="ts">
import projectService from "~/services/project.service";
import CreateProjectModal from "~/components/Project/CreateProjectModal.vue";
import { storeToRefs } from "pinia";
import { useProjectStore } from "~/store/project.store";

const projectStore = useProjectStore();
const { projects, isLoading } = storeToRefs(projectStore);

projectService.getAll();
</script>

<template>
  <CreateProjectModal />
  isLoading = {{ isLoading }}
  <div v-if="!isLoading">
    <div v-for="[_, project] in projects">
      {{ project.name }}
    </div>
  </div>
</template>
