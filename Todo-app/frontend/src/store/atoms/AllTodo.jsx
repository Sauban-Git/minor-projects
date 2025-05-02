import { atom } from "recoil";
export const todosAtoms = atom({
  key: "todosAtoms",
  default: [],
});

export const filterTodosAtoms = atom({
  key: "filterTodosAtoms",
  default: [],
});