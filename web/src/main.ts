import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { store } from "./store";
import generatedRoutes from "virtual:generated-pages";
import { setupLayouts } from "virtual:generated-layouts";
import { createRouter, createWebHistory } from "vue-router";
import ganttastic from "@infectoone/vue-ganttastic";

import "@unocss/reset/tailwind-compat.css";
import "uno.css";
import "./styles/main.scss";

const boostrap = async () => {
  const routes = setupLayouts(generatedRoutes);
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  console.log(routes);
  console.log(router);

  createApp(App).use(router).use(ganttastic).use(store).mount("#app");
};

void boostrap();
