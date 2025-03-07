import type { App } from "vue";
import { createPinia } from "pinia";

import { useAccountStore } from "~/store/account.store";
import { useBoardStore } from "~/store/board.store";
import { useLayoutStore } from "~/store/layout.store";
import { useProjectStore } from "~/store/project.store";
import { useUserStore } from "~/store/user.store";
import { useTaskStore } from "~/store/task.store";

const store = createPinia();

export const setupStore = (app: App<Element>) => {
  app.use(store);
};
export {
  store,
  useAccountStore,
  useBoardStore,
  useLayoutStore,
  useProjectStore,
  useUserStore,
  useTaskStore,
};
