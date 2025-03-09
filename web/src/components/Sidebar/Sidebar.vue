<script setup lang="ts">
import { ref, h, computed, type Component } from "vue";
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { NLayoutSider, NMenu, NIcon, NButton } from "naive-ui";
import {
  ProjectionScreen24Regular as ProjectIcon,
  GanttChart24Regular as BoardIcon,
  AddCircle32Regular as AddCircleIcon,
} from "@vicons/fluent";

import { useProjectStore, useBoardStore } from "~/store";
import { projectService } from "~/services";
import { Project, Board } from "~/entity";
import CreateProjectModal from "~/components/Project/CreateProjectModal.vue";

const showCreateProjectModal = ref(false);

const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) });
};

const renderProjectMenu = (project: Project) => {
  return h(
    RouterLink,
    {
      to: `/project/${project.id}`,
    },
    [project.name],
  );
};

const renderBoardMenu = (board: Board) => {
  return h(
    RouterLink,
    {
      to: `/project/${board.projectId}/${board.id}`,
    },
    [board.name],
  );
};

projectService.getAll();

const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);

const boardStore = useBoardStore();
const { boards } = storeToRefs(boardStore);

const menuOptions = computed(() => {
  return [...projects.value.entries()].map(([_, project]) => {
    return {
      // label: project.name,
      label: () => renderProjectMenu(project),
      key: `${project.id}`,
      icon: renderIcon(ProjectIcon),
      children: [...boards.value.entries()]
        .filter(([_, board]) => board.projectId === project.id)
        .map(([_, board]) => {
          return {
            label: () => renderBoardMenu(board),
            key: `${project.id}-${board.id}`,
            icon: renderIcon(BoardIcon),
          };
        }),
    };
  });
});
</script>

<template>
  <n-layout-sider
    bordered
    show-trigger="arrow-circle"
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    content-style="padding: 2px;"
    :native-scrollbar="false"
  >
    <n-menu
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
    />

    <n-button @click="showCreateProjectModal = true">
      <template #icon>
        <AddCircleIcon />
      </template>
    </n-button>
    <CreateProjectModal v-model="showCreateProjectModal" />
  </n-layout-sider>
</template>
