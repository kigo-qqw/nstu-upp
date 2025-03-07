import { defineStore } from "pinia";
import { ref } from "vue";
import type { Project } from "~/entity/project.entity";

export const useProjectStore = defineStore("project", () => {
  const projects = ref<Map<number, Project>>(new Map<number, Project>());
  const isLoading = ref(false);

  const setProject = (id: number, project: Project) => {
    console.log("setProject", id, project);
    projects.value.set(id, project);
  };

  return { projects, isLoading, setProject };
});
