<script setup lang="ts">
import { defineModel, ref, watch } from "vue";
import { NModal, NCard } from "naive-ui";

import type { Task } from "~/entity";
import EditTaskModalImpl from "~/components/Task/EditTaskModalImpl.vue";

const model = defineModel<Task | null>("task", { required: true });

const showEditTaskModal = ref(model.value !== null);

watch(showEditTaskModal, async (newState) => {
  if (!newState) {
    setTimeout(() => {
      model.value = null;
    }, 200);
  }
});

watch(model, async (newState, oldState) => {
  if (newState != oldState && newState !== null) {
    showEditTaskModal.value = true;
  }
});
</script>

<template>
  <n-modal v-model:show="showEditTaskModal">
    <n-card
      style="width: 80%"
      title="Edit task"
      :bordered="false"
      size="medium"
      role="dialog"
      aria-modal="true"
    >
      <EditTaskModalImpl
        v-if="model !== null"
        v-model:task="model"
        @close="showEditTaskModal = false"
      />
    </n-card>
  </n-modal>
</template>
