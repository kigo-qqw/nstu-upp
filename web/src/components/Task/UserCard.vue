<script setup lang="ts">
import { defineModel } from "vue";
import { storeToRefs } from "pinia";
import { NText } from "naive-ui";
import { useUserStore } from "~/store/user.store";

const model = defineModel<number>("userId", { required: true });

const userStore = useUserStore();
const { users } = storeToRefs(userStore);

const user = users.value.get(model.value);
</script>

<template>
  <template v-if="user">
    <div class="st">
      <div>{{ user.name }}</div>
      <n-text depth="3" tag="div">{{ user.email }}</n-text>
    </div>
  </template>
  <template v-else> Unknown user</template>
</template>

<style scoped lang="scss">
.st {
  display: flex;
  align-items: left;
  flex-direction: column;
}
</style>
