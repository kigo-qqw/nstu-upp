import { defineStore } from "pinia";
import { ref } from "vue";
import type { ProjectPermission } from "~/entity";

export const useProjectPermissionStore = defineStore(
  "project-permission",
  () => {
    const permissions = ref<Map<number, ProjectPermission>>(
      new Map<number, ProjectPermission>(),
    );
    const isLoading = ref(false);

    const setProjectPermission = (
      id: number,
      permission: ProjectPermission,
    ) => {
      console.log("setProjectPermission", id, permission);
      permissions.value.set(id, permission);
    };

    return { permissions, isLoading, setProjectPermission };
  },
);
