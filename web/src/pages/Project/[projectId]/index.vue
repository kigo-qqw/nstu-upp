<route lang="yaml">
meta:
  title: [projectId]
  layout: Default
</route>

<script setup lang="ts">
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { NButton } from "naive-ui";

import { useProjectStore } from "~/store/project.store";
import { useBoardStore } from "~/store/board.store";

import boardService from "~/services/board.service";

import CreateBoardModal from "~/components/Board/CreateBoardModal.vue";

const props = defineProps({
  projectId: String,
});
const projectId = parseInt(props.projectId!);

const showCreateBoardModal = ref(false);

const boardStore = useBoardStore();
const { boards, isLoading: isBoardsLoading } = storeToRefs(boardStore);

boardService.getAll(projectId);

const projectStore = useProjectStore();
const { projects, isLoading: isProjectsLoading } = storeToRefs(projectStore);

const currentProject = computed(() => projects.value.get(projectId));
const isHaveCurrentProject = computed(() => currentProject.value !== undefined);

const boardsOfProject = computed(() =>
  isHaveCurrentProject
    ? [...boards.value.entries()].filter(
        ([_, b]) => b.projectId === currentProject.value!.id,
      )
    : [],
);
</script>

<template>
  <template v-if="isHaveCurrentProject">
    <n-button @click="showCreateBoardModal = true">New</n-button>
    <CreateBoardModal v-model:show="showCreateBoardModal" :project="currentProject!" />

    <div v-if="!isProjectsLoading && !isBoardsLoading">
      <div v-for="[_, board] in boardsOfProject">
        <n-button>
          <router-link :to="`/project/${projectId}/${board.id}`">
            {{ board.name }}
          </router-link>
        </n-button>
      </div>
    </div>
  </template>
  <template v-else> Project not found </template>
</template>
