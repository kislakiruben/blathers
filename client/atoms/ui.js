import { atom } from "recoil";

import { SEARCH_HISTORY_CACHE_KEY } from "../constants";

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

export const errorStatusState = atom({
  key: "atoms/ui/error-status",
  default: null,
});

export const searchHistoryState = atom({
  key: "atoms/ui/search-history",
  default: [],
  effects: [
    ({ setSelf, onSet, trigger }) => {
      if (!localStorage.getItem(SEARCH_HISTORY_CACHE_KEY)) {
        localStorage.setItem(SEARCH_HISTORY_CACHE_KEY, JSON.stringify([]));
      }

      if (trigger === "get") {
        setSelf(JSON.parse(localStorage.getItem(SEARCH_HISTORY_CACHE_KEY)));
      }

      onSet((state) => {
        localStorage.setItem(SEARCH_HISTORY_CACHE_KEY, JSON.stringify(state));
      });
    },
  ],
});
