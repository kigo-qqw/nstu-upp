<script setup lang="ts">
import { defineModel } from "vue";
import { storeToRefs } from "pinia";
import { NText } from "naive-ui";
import { useUserStore } from "~/store/user.store";

const model = defineModel<number>("user-id", { required: true });

const userStore = useUserStore();
const { users } = storeToRefs(userStore);

const user = users.value.get(model.value);
</script>

<template>
  <template v-if="user">
    <!--    <n-card> {{ user.name }}</n-card>-->
    <div>user.name</div>
    <n-text depth="3" tag="div">{{ user.email }}</n-text>
  </template>
  <template v-else> Unknown user</template>
</template>
