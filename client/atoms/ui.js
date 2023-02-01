import { atom } from "recoil";

export const searchTextState = atom({
  key: "atoms/ui/search-text",
  default: "",
});

export const paginationCursorState = atom({
  key: "atoms/ui/pagination-cursor",
  default: "",
});

export const paginationHasNextPageState = atom({
  key: "atoms/ui/pagination-has-next-page",
  default: false,
});
