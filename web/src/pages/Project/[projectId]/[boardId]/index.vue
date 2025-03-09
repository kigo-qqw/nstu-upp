<route lang="yaml">
meta:
  title: [boardId]
  layout: Default
</route>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { NButton } from "naive-ui";
import EditTaskModal from "~/components/Task/EditTaskModal.vue";
import { Task, User } from "~/entity";
import { useBoardStore, useTaskStore, useUserStore } from "~/store";
import CreateTaskModal from "~/components/Task/CreateTaskModal.vue";
import {
  GGanttChart,
  GGanttRow,
  GanttBarObject,
} from "@infectoone/vue-ganttastic";
import projectService from "~/services/project.service";

const props = defineProps({
  projectId: String,
  boardId: String,
});

const boardId = parseInt(props.boardId!);

projectService.getAll();

const showCreateTaskModal = ref(false);
const currentEditableTask = ref<Task | null>(null);

const boardStore = useBoardStore();
const { boards } = storeToRefs(boardStore);

const currentBoard = computed(() => boards.value.get(boardId));
const isHaveCurrentBoard = computed(() => currentBoard.value !== undefined);

const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore);

const userStore = useUserStore();
const { users } = storeToRefs(userStore);

const tasksOfBoard = computed(() =>
  isHaveCurrentBoard
    ? [...tasks.value.entries()].filter(
        ([_, t]) => t.boardId === currentBoard.value!.id,
      )
    : [],
);

const tasksOfBoardByUserId = computed(() => {
  const tasksOfBoardByUserId = new Map<number, number[]>();

  for (const [_, task] of tasksOfBoard.value) {
    for (const performerId of task.performerIds) {
      if (!tasksOfBoardByUserId.has(performerId))
        tasksOfBoardByUserId.set(performerId, []);
      tasksOfBoardByUserId.get(performerId)?.push(task.id);
    }
  }

  return tasksOfBoardByUserId;
});

type GanttRowDataType = {
  user: User;
  ganttRowData: (Task & GanttBarObject)[];
};
const ganttData = ref<GanttRowDataType[]>([]);

watch(
  ganttData,
  async (oldValue: GanttRowDataType[], newValue: GanttRowDataType[]) => {
    newValue.forEach(({ganttRowData: row }) => {
      row.forEach((gData) => {
        const { ganttBarConfig, ...task } = gData;

        const storedTask = tasks.value.get(task.id);
        if (storedTask) {
          storedTask.plannedStartAt = task.plannedStartAt;
          storedTask.plannedEndAt = task.plannedEndAt;
          storedTask.actuallyStartAt = task.actuallyStartAt;
          storedTask.actuallyEndAt = task.actuallyEndAt;
        }
      });
    });
  },
  { deep: true },
);

watch(
  tasksOfBoardByUserId,
  async (oldValue: Map<number, number[]>, newValue: Map<number, number[]>) => {
    ganttData.value = [...tasksOfBoardByUserId.value.entries()].map(
      ([performerId, taskIds]) => {
        return {
          user: users.value.get(performerId)!,
          ganttRowData: taskIds.map((tid) => {
            const task = tasks.value.get(tid)!;
            return {
              ...task,
              ganttBarConfig: {
                id: `${performerId}-${tid}`,
                label: task.title,
                bundle: `${tid}`,
                style: {
                  backgroundColor: task.color,
                  borderRadius: 5,
                },
                immobile: true,
              },
            };
          }),
        };
      },
    );
  },
  // { deep: true },
);

const timeRange = 1000 * 60 * 60 * 24;

const minTime = computed(() => {
  const m = [...tasks.value!.entries()]
    .map(([_, task]) => {
      if (task.actuallyStartAt && task.actuallyStartAt < task.plannedStartAt) {
        return new Date(task.actuallyStartAt);
      }
      console.log(task.plannedStartAt);
      return new Date(task.plannedStartAt);
    })
    .reduce((acc, curr) => (acc < curr ? acc : curr), new Date(Date.now()));

  m.setTime(m.getTime() - timeRange);
  return m;
});

const maxTime = computed(() => {
  const m = [...tasks.value!.entries()]
    .map(([_, task]) => {
      if (task.actuallyEndAt && task.actuallyEndAt > task.plannedEndAt) {
        return new Date(task.actuallyEndAt);
      }
      return new Date(task.plannedEndAt);
    })
    .reduce((acc, curr) => (acc > curr ? acc : curr), new Date(Date.now()));

  m.setTime(m.getTime() + timeRange);
  return m;
});
</script>

<template>
  <template v-if="currentBoard">
    <n-button @click="showCreateTaskModal = true">New</n-button>
    <CreateTaskModal v-model:show="showCreateTaskModal" :board="currentBoard" />

    <EditTaskModal v-model:task="currentEditableTask" />

    <g-gantt-chart
      :chart-start="minTime"
      :chart-end="maxTime"
      precision="day"
      bar-start="plannedStartAt"
      bar-end="plannedEndAt"
    >
      <g-gantt-row
        v-for="{ user: u, ganttRowData: gd } in ganttData"
        :label="u.name"
        :bars="gd"
        :highlightOnHover="true"
      >
        <template #bar-label="{ bar }">
          <span @dblclick="currentEditableTask = bar as any as Task">
            {{ bar.title }}
          </span>
        </template>
      </g-gantt-row>
    </g-gantt-chart>
  </template>
  <template v-else> Board not found</template>
</template>
