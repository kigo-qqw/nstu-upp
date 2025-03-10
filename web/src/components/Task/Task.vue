<script setup lang="ts">
import { defineModel, ref, h } from "vue";
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import {
  FormRules,
  NButton,
  NForm,
  NInput,
  NFormItem,
  NDatePicker,
  NSelect,
  NTag,
  NText,
  SelectRenderTag,
} from "naive-ui";
import { Task } from "~/entity/task.entity";
import { useBoardStore } from "~/store/board.store";
import { useProjectStore } from "~/store/project.store";
import { useUserStore } from "~/store/user.store";
import UserCard from "~/components/Task/UserCard.vue";

const model = defineModel<Task>({ required: true });

const boardStore = useBoardStore();
const { boards } = storeToRefs(boardStore);

const taskBoard = boards.value.get(model.value.boardId);
const boardId = taskBoard.id;
const projectId = taskBoard.projectId;

const timeRange = ref<[number, number]>([
  model.value.startDate,
  model.value.endDate,
]);
const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);

const userStore = useUserStore();
const { users } = storeToRefs(userStore);

const performersOptions: { label: string; value: number }[] = [
  ...projects.value?.get(projectId).memberIds.map((memberId: number) => ({
    label: users.value?.get(memberId).name,
    value: memberId,
  })),
];

const rules: FormRules = {
  email: {
    required: true,
    message: "Please input your e-mail",
    trigger: ["input", "blur"],
  },
  password: {
    required: true,
    message: "Please input your password",
    trigger: ["input", "blur"],
  },
};
</script>

<template>
  <template v-if="model && taskBoard">
    <n-form size="medium">
      {{ model }}

      <div>Status</div>

      <n-form-item label="Title">
        <n-input autosize v-model:value="model.title" />
      </n-form-item>
      <n-form-item label="in board" label-placement="left">
        <n-button>
          <router-link :to="`/project/${projectId}/${boardId}`"
            >{{ taskBoard.name }}
          </router-link>
        </n-button>
      </n-form-item>

      <n-form-item label="Description">
        <n-input autosize v-model:value="model.description" type="textarea" />
      </n-form-item>

      <n-form-item label="Time range">
        <n-date-picker
          v-model:value="timeRange"
          type="datetimerange"
          clearable
        />
      </n-form-item>

      <n-form-item label="Owner">
        <UserCard :userId="model.ownerId" />
      </n-form-item>

      <n-button>Save</n-button>
    </n-form>
  </template>
</template>
