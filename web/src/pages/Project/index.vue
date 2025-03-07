<route lang="yaml">
meta:
  title: projects
  layout: Default
</route>

<script setup lang="ts">
import projectService from "~/services/project.service";
import CreateProjectModal from "~/components/Project/CreateProjectModal.vue";
import { storeToRefs } from "pinia";
import { useProjectStore } from "~/store/project.store";
import { ref } from "vue";
import { NButton } from "naive-ui";
import { RouterLink } from "vue-router";

const showCreateProjectModal = ref(false);

projectService.getAll();

const projectStore = useProjectStore();
const { projects, isLoading } = storeToRefs(projectStore);
</script>

<template>
  <n-button @click="showCreateProjectModal = true">New</n-button>
  <CreateProjectModal v-model="showCreateProjectModal" />

  isLoading = {{ isLoading }}
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
