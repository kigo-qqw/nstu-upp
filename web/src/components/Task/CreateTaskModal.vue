<script setup lang="ts">
import { defineModel, ref, computed } from "vue";
import { useTaskStore } from "~/store";
import { storeToRefs } from "pinia";
import {
  FormInst,
  FormRules,
  NButton,
  NCard,
  NDatePicker,
  NForm,
  NFormItem,
  NInput,
  NModal,
  NColorPicker,
  useMessage,
} from "naive-ui";
import { CreateTaskDto } from "~/dto/task";
import type { Board, User } from "~/entity";
import SelectUser from "~/components/Task/SelectUser.vue";
import { useUserStore, useProjectStore, useAccountStore } from "~/store";
import { taskService } from "~/services";

const taskStore = useTaskStore();
const { isLoading } = storeToRefs(taskStore);

const showCreateTaskModal = defineModel<boolean>("show", { required: true });
const board = defineModel<Board>("board", { required: true });

const accountStore = useAccountStore();
const { account } = storeToRefs(accountStore);

const userStore = useUserStore();
const { users } = storeToRefs(userStore);

const formValue = ref<CreateTaskDto>({
  title: "",
  description: "",
  boardId: board.value.id,
  ownerId: account.value!.userId,
  performerIds: [],
  color: "#008800",
  plannedStartAt: new Date(Date.now()),
  plannedEndAt: new Date(Date.now()),
});

const formRef = ref<FormInst | null>(null);

const timeRange = ref<[number, number]>([
  formValue.value.plannedStartAt.getTime(),
  formValue.value.plannedEndAt.getTime(),
]);

const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);

const performers = computed<User[]>(
  () =>
    projects.value
      .get(board.value.projectId)
      ?.memberIds.map((memberId) => users.value.get(memberId)!)
      .filter((user) => user !== undefined) ?? [],
);

const message = useMessage();

const rules: FormRules = {
  title: {
    required: true,
    message: "Please task title",
    trigger: ["input", "blur"],
  },
  description: {
    required: true,
    message: "Please task description",
    trigger: ["input", "blur"],
  },
};

const handleCreateClick = async (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      formValue.value.plannedStartAt = new Date(timeRange.value[0]);
      formValue.value.plannedEndAt = new Date(timeRange.value[1]);

      const created = await taskService.create(formValue.value);
      if (created) {
        message.success("Project created successfully.");
        showCreateTaskModal.value = false;
        // TODO: clear form
      }
    } else {
      console.log(errors);
      message.error("Error creating project");
    }
  });
};
</script>

<template>
  <n-modal v-model:show="showCreateTaskModal">
    <n-card
      style="width: 80%"
      title="Create new task"
      :bordered="false"
      size="medium"
      role="dialog"
      aria-modal="true"
    >
      <n-form ref="formRef" :model="formValue" :rules="rules" size="medium">
        <n-form-item label="Title" path="title">
          <n-input v-model:value="formValue.title" />
        </n-form-item>

        <n-form-item label="Description" path="description">
          <n-input
            autosize
            v-model:value="formValue.description"
            type="textarea"
          />
        </n-form-item>

        <n-form-item label="Task color">
          <n-color-picker
            v-model:value="formValue.color"
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

        <n-form-item label="Performers">
          <SelectUser
            multiple
            v-model:selected-performer-ids="formValue.performerIds"
            :performers="performers"
          />
        </n-form-item>

        <n-form-item>
          <n-button
            attr-type="submit"
            :loading="isLoading"
            @click="handleCreateClick"
          >
            Create
          </n-button>
        </n-form-item>
      </n-form>
    </n-card>
  </n-modal>
</template>
