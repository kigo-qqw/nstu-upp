<script setup lang="ts">
import { defineModel, computed } from "vue";
import { storeToRefs } from "pinia";
import {
  useProjectPermissionStore,
  useAccountStore,
  useProjectStore,
} from "~/store";
import { ProjectPermissionType } from "~/enum";
import type {Project} from "~/entity";

const project = defineModel<Project>("project", { required: true });
const projectPermissionType = defineModel<ProjectPermissionType>(
  "project-permission-type",
  { required: true },
);

const projectPermissionStore = useProjectPermissionStore();
const { permissions } = storeToRefs(projectPermissionStore);

const projectStore = useProjectStore();
const { isLoading } = storeToRefs(projectStore);

const accountStore = useAccountStore();
const { account } = storeToRefs(accountStore);

const accountPermission = computed(() => {
  const perms = [...permissions.value.entries()].filter(
    ([_, permission]) =>
      account.value !== null &&
      permission.userId === account.value.userId &&
      permission.projectId === project.value.id,
  );

  return perms.length > 0 ? perms[0][1] : null;
});
</script>

<template>
  <template
    v-if="
      accountPermission &&
      accountPermission.type.includes(projectPermissionType)
    "
  >
    <slot />
  </template>
</template>
