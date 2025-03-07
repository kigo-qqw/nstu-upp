<script setup lang="ts">
import { h, defineModel, defineProps } from "vue";
import { NSelect, NTag, SelectRenderTag, SelectRenderLabel } from "naive-ui";
import { User } from "~/entity/user.entity";
import UserCard from "~/components/Task/UserCard.vue";

const selectedPerformersIds = defineModel<number[]>("selected-performer-ids", {
  required: true,
});

const performers = defineModel<User[]>("performers", { required: true });
const props = defineProps<{ multiple: boolean }>();

console.log("performers.value", performers.value);

const performersOptions = performers.value.map((performer) => ({
  label: performer.name,
  value: performer.id,
}));

console.log("performersOptions = ", performersOptions);

const renderSingleSelectTag: SelectRenderTag = ({ option }) => {
  return h(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
      },
    },
    [h(UserCard, { userId: option.value as number })],
  );
};

const renderMultipleSelectTag: SelectRenderTag = ({ option, handleClose }) => {
  return h(
    NTag,
    {
      style: {
        padding: "0 6px 0 4px",
      },
      round: true,
      closable: true,
      onClose: (e) => {
        e.stopPropagation();
        handleClose();
      },
    },
    {
      default: () =>
        h(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
            },
          },
          [option.label as string],
        ),
    },
  );
};

const renderLabel: SelectRenderLabel = (option) => {
  return h(UserCard, { userId: option.value as number });
};

const renderSelectTag = props.multiple
  ? renderMultipleSelectTag
  : renderSingleSelectTag;
</script>

<template>
  <n-select
    :multiple="props.multiple"
    v-model:value="selectedPerformersIds"
    :options="performersOptions"
    :render-label="renderLabel"
    :render-tag="renderSelectTag"
    filterable
  />
</template>
