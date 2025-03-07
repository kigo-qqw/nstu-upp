import { defineStore } from "pinia";
import { ref } from "vue";
import type { Board } from "~/entity/board.entity";

export const useBoardStore = defineStore("board", () => {
  const boards = ref<Map<number, Board>>(new Map<number, Board>());
  const isLoading = ref(false);

  const setBoard = (id: number, board: Board) => {
    boards.value.set(id, board);
  };

  return { boards, isLoading, setBoard };
});
