import { create } from "zustand";
import { TodoWithStatus } from "./types";

type TodosState = {
  todos: TodoWithStatus[];
  setTodos: (todos: TodoWithStatus[]) => void;
};

export const useTodosStore = create<TodosState>((set) => ({
  todos: [],
  setTodos: (newTodos) => set(() => ({ todos: newTodos })),
}));
