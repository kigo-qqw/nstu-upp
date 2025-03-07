<script setup lang="ts">
import { CreateBoardDto } from "~/dto/board";
import boardService from "~/services/board.service";
import { storeToRefs } from "pinia";
import {
  FormInst,
  FormRules,
  NButton,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NModal,
  useMessage,
} from "naive-ui";
import { ref } from "vue";
import { useBoardStore } from "~/store/board.store";
import type { Project } from "~/entity/project.entity";

const showCreateBoardModal = defineModel<boolean>("show", { required: true });
const project = defineModel<Project>("project", { required: true });

const boardStore = useBoardStore();
const { isLoading } = storeToRefs(boardStore);

const formValue = ref<CreateBoardDto>({
  projectId: project.value.id,
  name: "",
});
const formRef = ref<FormInst | null>(null);
const message = useMessage();

const rules: FormRules = {
  name: {
    required: true,
    message: "Please input board name",
    trigger: ["input", "blur"],
  },
};

const handleCreateClick = async (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const created = await boardService.create(formValue.value);

      if (created) {
        message.success("Project created successfully.");
        showCreateBoardModal.value = false;
        formValue.value.name = "";
      }
    } else {
      console.log(errors);
      message.error("Error creating project");
    }
  });
};
</script>

<template>
  <n-modal v-model:show="showCreateBoardModal">
    <n-card
      style="width: 80%"
      title="Create new board"
      :bordered="false"
      size="medium"
      role="dialog"
      aria-modal="true"
    >
      <n-form ref="formRef" :model="formValue" :rules="rules" size="medium">
        <n-form-item label="Board Name" path="name">
          <n-input v-model:value="formValue.name" placeholder="Board Name" />
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
