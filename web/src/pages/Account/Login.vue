<script setup lang="ts">
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  NCard,
  FormInst,
  FormRules,
  useMessage,
} from "naive-ui";
import { storeToRefs } from "pinia";
import { AuthCredentialsDto } from "~/dto/auth";
import authService from "~/services/auth.service";
import { useAccountStore } from "~/store/account.store";

const router = useRouter();
const loginFailed = ref(false);

const accountStore = useAccountStore();
const { isLoading } = storeToRefs(accountStore);

const formValue = ref<AuthCredentialsDto>({
  email: "john@doe.com",
  password: "1234567890", // TODO
});

const formRef = ref<FormInst | null>(null);
const message = useMessage();

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

const handleLoginClick = async (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const loginSucceed = await authService.login(formValue.value);

      if (loginSucceed) {
        message.success("Login success");
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
  title: login
  layout: Auth
  authRequired: false
</route>

<template>
  <n-card
    style="margin: auto; width: 50%"
    title="Login"
    :bordered="true"
    size="medium"
    role="dialog"
    aria-modal="true"
  >
    <n-form ref="formRef" :model="formValue" :rules="rules" size="medium">
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
          @click="handleLoginClick"
        >
          Login
        </n-button>

        <n-button>
          <RouterLink to="/account/register"> Register</RouterLink>
        </n-button>
      </n-form-item>
    </n-form>
  </n-card>
</template>
