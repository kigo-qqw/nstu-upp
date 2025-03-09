import { createPinia } from "pinia";

import { useAccountStore } from "~/store/account.store";
import { useBoardStore } from "~/store/board.store";
import { useLayoutStore } from "~/store/layout.store";
import { useProjectStore } from "~/store/project.store";
import { useUserStore } from "~/store/user.store";
import { useTaskStore } from "~/store/task.store";
import { useProjectPermissionStore } from "~/store/project-permission.store";

const store = createPinia();

export {
  store,
  useAccountStore,
  useBoardStore,
  useLayoutStore,
  useProjectStore,
  useUserStore,
  useTaskStore,
  useProjectPermissionStore,
};
