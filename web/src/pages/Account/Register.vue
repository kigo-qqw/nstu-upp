<script setup lang="ts">
import {
  FormInst,
  FormRules,
  NButton,
  NForm,
  NFormItem,
  NInput,
  useMessage,
} from "naive-ui";
import authService from "~/services/auth.service";
import { RouterLink, useRouter } from "vue-router";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { RegisterDto } from "~/dto/auth";
import { useAccountStore } from "~/store/account.store";

const router = useRouter();
const loginFailed = ref(false);

const accountStore = useAccountStore();
const { isLoading } = storeToRefs(accountStore);

const formValue = ref<RegisterDto>({
  name: "John Doe",
  email: "john@doe.com",
  password: "",
});

const formRef = ref<FormInst | null>(null);
const message = useMessage();

const rules: FormRules = {
  name: {
    required: true,
    message: "Please input your name",
    trigger: ["input", "blur"],
  },
  email: {
    required: true,
    message: "Please input your e-mail",
    trigger: ["input", "blur"],
  },
  password: {
    required: true,
    message: "Please input password",
    trigger: ["input", "blur"],
  },
};

const handleRegisterClick = async (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const loginSucceed = await authService.register(formValue.value);

      if (loginSucceed) {
        message.success("Register success");
        setTimeout(() => router.push("/account/profile"), 500);
      } else {
        loginFailed.value = true;
        setTimeout(() => {
          loginFailed.value = false;
        }, 2000);
      }
    } else {
      console.log(errors);
      message.error("Invalid");
    }
  });
};
</script>

<route lang="yaml">
meta:
  title: register
  layout: Auth
  authRequired: false
</route>

<template>
  <n-form
    ref="formRef"
    :label-width="80"
    :model="formValue"
    :rules="rules"
    size="medium"
  >
    <n-form-item label="Name" path="name">
      <n-input v-model:value="formValue.name" placeholder="Username" />
    </n-form-item>

    <n-form-item label="E-mail" path="email">
      <n-input v-model:value="formValue.email" placeholder="E-mail" />
    </n-form-item>

    <n-form-item label="Password" path="password">
      <n-input
        type="password"
        show-password-on="click"
        v-model:value="formValue.password"
        placeholder="Password"
      />
    </n-form-item>

    <n-form-item>
      <n-button
        attr-type="submit"
        :loading="isLoading"
        @click="handleRegisterClick"
      >
        Register
      </n-button>
      <n-button>
        <RouterLink to="/account/login"> Login</RouterLink>
      </n-button>
    </n-form-item>
  </n-form>
</template>
