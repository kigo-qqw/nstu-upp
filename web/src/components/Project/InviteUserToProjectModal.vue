<script setup lang="ts">
import { computed, defineModel, ref } from "vue";
import { storeToRefs } from "pinia";
import {
  FormInst,
  FormRules,
  NButton,
  NForm,
  NFormItem,
  NInput,
  NCard,
  useMessage,
} from "naive-ui";
import { useProjectStore } from "~/store";
import type { Project } from "~/entity";
import { ProjectPermissionType } from "~/enum";
import { InviteUserDto } from "~/dto/project";
import { projectService } from "~/services";
import IfHavePermission from "~/components/Project/IfHavePermission.vue";

const project = defineModel<Project>("project", { required: true });

const projectStore = useProjectStore();
const { isLoading } = storeToRefs(projectStore);

// const selectedUserIds = ref<number[]>([]);
//
// const performers = computed<User[]>(
//   () =>
//     project.value.memberIds
//       .map((memberId) => users.value.get(memberId)!)
//       .filter((user) => user !== undefined) ?? [],
// );

const formValue = ref<InviteUserDto>({
  projectId: project.value.id,
  userEmail: "john@doe.com",
});

const formRef = ref<FormInst | null>(null);
const message = useMessage();

const rules: FormRules = {
  userEmail: {
    required: true,
    message: "Please input user E-mail",
    trigger: ["input", "blur"],
  },
};

const handleInviteClick = async (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const invited = await projectService.invite(formValue.value);
      if (invited) {
        message.success("User invited successfully.");
        formValue.value.email = "";
      }
    } else {
      console.log(errors);
      message.error("Error inviting user");
    }
  });
};
</script>

<template>
  <IfHavePermission
    v-model:project="project"
    :project-permission-type="ProjectPermissionType.INVITE_USER"
  >
    <n-card>
      <n-form ref="formRef" :model="formValue" :rules="rules" size="medium">
        <n-form-item label="E-mail" path="userEmail">
          <n-input v-model:value="formValue.userEmail" />
        </n-form-item>

        <n-form-item>
          <n-button
            attr-type="submit"
            :loading="isLoading"
            @click="handleInviteClick"
          >
            Invite
          </n-button>
        </n-form-item>
      </n-form>
    </n-card>
  </IfHavePermission>

  <!--    <SelectUser-->
  <!--      v-model:selected-performer-ids="selectedUserIds"-->
  <!--      :performers="performers"-->
  <!--    />-->
</template>
