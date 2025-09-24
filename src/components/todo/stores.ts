import { create } from "zustand";
import { TodoWithStatus } from "./types";

/* TodosState */
type TodosState = {
  todos: TodoWithStatus[];
  setTodos: (todos: TodoWithStatus[]) => void;
};
export const useTodosStore = create<TodosState>((set) => ({
  todos: [],
  setTodos: (newTodos) => set(() => ({ todos: newTodos })),
}));

/* TodoListState */
type TodoListState = {
  loading: boolean;
  setLoading: (boolean: boolean) => void;
  displayMessage: string;
  setDisplayMessage: (displayMessage: string) => void;
};
export const useTodoListState = create<TodoListState>((set) => ({
  loading: true,
  setLoading: (boolean) => set(() => ({ loading: boolean })),
  displayMessage: "",
  setDisplayMessage: (message) => set(() => ({ displayMessage: message })),
}));
