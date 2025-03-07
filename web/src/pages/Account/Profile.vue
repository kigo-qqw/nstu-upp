<script setup lang="ts">
import { useAccountStore } from "~/store/account.store";
import { storeToRefs } from "pinia";

const accountStore = useAccountStore();
const { account } = storeToRefs(accountStore);

console.log(account.value);
</script>

<route lang="yaml">
meta:
  title: profile
  layout: Default
</route>

<template>
  <div>TODO: Profile Page</div>
  <div>{{ account?.userId }}</div>
  <div>{{ account?.accessToken }}</div>
  <div>{{ account?.refreshToken }}</div>
</template>
