<route lang="yaml">
meta:
  title: [boardId]
  layout: Default
</route>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { NButton } from "naive-ui";
// import Task from "~/components/Task/Task.vue";
// import { Task as TaskEntity } from "~/entity";
import { useBoardStore } from "~/store";
import CreateTaskModal from "~/components/Task/CreateTaskModal.vue";

const props = defineProps({
  projectId: String,
  boardId: String,
});

const projectId = parseInt(props.projectId!);
const boardId = parseInt(props.boardId!);

console.log(projectId);
console.log(boardId);

// const task = ref<TaskEntity>({});

const showCreateTaskModal = ref(false);

const boardStore = useBoardStore();
const { boards } = storeToRefs(boardStore);
const board = boards.value.get(boardId);
console.log(boards.value)
console.log(board);
</script>

<template>
  <template v-if="board">
    <n-button @click="showCreateTaskModal = true">New</n-button>
    <CreateTaskModal v-model:show="showCreateTaskModal" :board="board" />

    <!--  <Task v-model="task" />-->
  </template>
  <template v-else> Board not found</template>
</template>
