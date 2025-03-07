import { defineStore } from "pinia";
import { ref } from "vue";
import type { Task } from "~/entity/task.entity";

export const useTaskStore = defineStore("task", () => {
  const tasks = ref<Map<number, Task>>(new Map<number, Task>());
  const isLoading = ref(false);

  const setTask = (id: number, task: Task) => {
    tasks.value.set(id, task);
  };

  return { tasks, isLoading, setTask };
});
