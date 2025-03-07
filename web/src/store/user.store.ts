import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "~/entity/user.entity";

export const useUserStore = defineStore("user", () => {
  const users = ref<Map<number, User>>(new Map<number, User>());
  const isLoading = ref(false);

  const setUser = (id: number, user: User) => {
    console.log("setUser", id, user);
    users.value.set(id, user);
  };

  return { users, isLoading, setUser };
});
