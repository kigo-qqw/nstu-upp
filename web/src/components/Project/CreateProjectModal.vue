<script setup lang="ts">
import { ref } from "vue";
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
import { CreateProjectDto } from "~/dto/project";
import projectService from "~/services/project.service";
import { storeToRefs } from "pinia";
import { useProjectStore } from "~/store/project.store";

const showCreateProjectModal = defineModel<boolean>({ required: true });

const projectStore = useProjectStore();
const { isLoading } = storeToRefs(projectStore);

const rules: FormRules = {
  projectName: {
    required: true,
    message: "Please input project name",
    trigger: ["input", "blur"],
  },
};

const formValue = ref<CreateProjectDto>({ projectName: "" });
const formRef = ref<FormInst | null>(null);
const message = useMessage();

const handleCreateClick = async (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const created = await projectService.create(formValue.value);

      if (created) {
        message.success("Project created successfully.");
        showCreateProjectModal.value = false;
        formValue.value.projectName = "";
      }
    } else {
      console.log(errors);
      message.error("Error creating project");
    }
  });
};
</script>

<template>
  <n-modal v-model:show="showCreateProjectModal">
    <n-card
      style="width: 80%"
      title="Create new project"
      :bordered="false"
      size="medium"
      role="dialog"
      aria-modal="true"
    >
      <n-form ref="formRef" :model="formValue" :rules="rules" size="medium">
        <n-form-item label="Project Name" path="projectName">
          <n-input
            v-model:value="formValue.projectName"
            placeholder="Project Name"
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
