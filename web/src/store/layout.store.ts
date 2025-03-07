import { defineStore } from "pinia";
import { ref } from "vue";

export const useLayoutStore = defineStore("layout", () => {
  const isDark = ref(false);
  return {
    isDark,
  };
});
