import { defineStore } from "pinia";
import { ref } from "vue";
import type { Account } from "~/entity/account.entity";

const LOCAL_STORAGE_KEY = "account";

const loadAccountFromLocalStorage = (): Account | null => {
  console.log("loadAccountFromLocalStorage");

  const account = localStorage.getItem(LOCAL_STORAGE_KEY);

  console.log("account", account);

  const data = account ? JSON.parse(account) : null;

  if (data) {
    console.log(data);
    console.log((data as Account).userId);
    console.log((data as Account).accessToken);
    console.log((data as Account).refreshToken);
  }

  return data;
};

export const useAccountStore = defineStore("account", () => {
  const account = ref<Account | null>(loadAccountFromLocalStorage());
  const isLoading = ref(false);

  const setAccount = (acc: Account | null) => {
    console.log("setAccount");
    account.value = acc;

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(account.value));
  };

  return { account, isLoading, setAccount };
});
