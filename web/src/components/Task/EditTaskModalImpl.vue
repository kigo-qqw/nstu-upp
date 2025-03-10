<script setup lang="ts">
import { computed, defineModel, ref, defineEmits } from "vue";
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import {
  FormRules,
  FormInst,
  NButton,
  NForm,
  NInput,
  NFormItem,
  NDatePicker,
  NColorPicker,
  useMessage,
} from "naive-ui";
import type { User, Task } from "~/entity";
import {
  useBoardStore,
  useUserStore,
  useProjectStore,
  useTaskStore,
} from "~/store";
import UserCard from "~/components/Task/UserCard.vue";
import SelectUser from "~/components/Task/SelectUser.vue";
import { taskService } from "~/services";

const model = defineModel<Task>("task", { required: true });
const emit = defineEmits<{ (e: "close"): void }>();

const boardStore = useBoardStore();
const { boards } = storeToRefs(boardStore);

const taskBoard = boards.value.get(model.value.boardId)!;
const boardId = taskBoard.id;
const projectId = taskBoard.projectId;

console.log(typeof model.value.plannedStartAt);

const timeRange = ref<[number, number]>([
  (model.value.plannedStartAt instanceof Date
    ? model.value.plannedStartAt
    : new Date(model.value.plannedStartAt)
  ).getTime(),
  (model.value.plannedEndAt instanceof Date
    ? model.value.plannedEndAt
    : new Date(model.value.plannedEndAt)
  ).getTime(),
]);
const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);

const userStore = useUserStore();
const { users } = storeToRefs(userStore);

const taskStore = useTaskStore();
const { isLoading } = storeToRefs(taskStore);

const message = useMessage();

const performers = computed<User[]>(
  () =>
    projects.value
      .get(projectId)
      ?.memberIds.map((memberId) => users.value.get(memberId)!)
      .filter((user) => user !== undefined) ?? [],
);

const formRef = ref<FormInst | null>(null);

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

const handleSaveClick = async (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      model.value.plannedStartAt = new Date(timeRange.value[0]);
      model.value.plannedEndAt = new Date(timeRange.value[1]);

      console.log(model.value);

      const updated = await taskService.update(model.value.id, model.value);
      if (updated) {
        message.success("Task updated successfully.");
        // TODO: clear form
      }
    } else {
      console.log(errors);
      message.error("Error updating task");
    }
  });
};
</script>

<template>
  <template v-if="model && taskBoard">
    <n-form ref="formRef" :model="model" :rules="rules" size="medium">
<!--      {{ model }}-->

<!--      <div>Status</div>-->

      <n-form-item label="Title">
        <n-input v-model:value="model.title" />
      </n-form-item>
      <n-form-item label="in board" label-placement="left">
        <n-button>
          <router-link
            :to="`/project/${projectId}/${boardId}`"
            @click="emit('close')"
            >{{ taskBoard.name }}
          </router-link>
        </n-button>
      </n-form-item>

      <n-form-item label="Description">
        <n-input autosize v-model:value="model.description" type="textarea" />
      </n-form-item>

      <n-form-item label="Task color">
        <n-color-picker
          v-model:value="model.color"
          :modes="['hex']"
          :show-alpha="false"
        />
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

      <n-form-item label="Performers">
        <SelectUser
          multiple
          v-model:selected-performer-ids="model.performerIds"
          :performers="performers"
        />
      </n-form-item>
      <n-form-item>
        <n-button
          attr-type="submit"
          :loading="isLoading"
          @click="handleSaveClick"
        >
          Save
        </n-button>
      </n-form-item>
    </n-form>
  </template>
</template>
