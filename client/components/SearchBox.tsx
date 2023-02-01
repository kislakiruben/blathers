import axios from "axios";
import isEmpty from "lodash/isEmpty";
import trim from "lodash/trim";
import uniq from "lodash/uniq";
import { useSetRecoilState, useRecoilState } from "recoil";
import { useEffect, useRef, useState } from "react";

import { entriesByOwnerAddressState } from "../atoms/nft";
import {
  errorStatusState,
  paginationCursorState,
  paginationHasNextPageState,
  searchHistoryState,
  searchTextState,
} from "../atoms/ui";
import { PAGINATION_LIMIT } from "../constants";
import SearchBoxHistory from "./SearchBoxHistory";
import { isNodeInRoot } from "../utils";

const HIDE_HISTORY_TIMEOUT = 160;

const SearchBox = () => {
  const closeOnBlurTimerRef = useRef<null | NodeJS.Timeout>(null);
  const shouldCloseHistory = useRef<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  /*
   * There is a slight difference between 'isFocused' and 'showHistory'.
   * The former one is set right away when the user blurs the search input.
   * The latter one is set with a sligh delay (HIDE_HISTORY_TIMEOUT) after the user blurs the input.
   */
  const [isFocused, setIsFocused] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [searchText, setSearchText] = useRecoilState(searchTextState);
  const [text, setText] = useState("");
  const setEntries = useSetRecoilState(entriesByOwnerAddressState(searchText));
  const setErrorStatus = useSetRecoilState(errorStatusState);
  const setCursor = useSetRecoilState(paginationCursorState);
  const setHasNextPage = useSetRecoilState(paginationHasNextPageState);
  const setSearchHistory = useSetRecoilState(searchHistoryState);
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setText((event.target as HTMLInputElement).value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setSearchText(text);
    event.preventDefault();
  };
  const onFocus = () => {
    setIsFocused(true);
    setShowHistory(true);
  };
  /*
   * To prevent flicker, we add a slight delay when closing the search history.
   */
  const onBlur = () => {
    setIsFocused(false);
    closeOnBlurTimerRef.current = setTimeout(() => {
      if (shouldCloseHistory.current) {
        setShowHistory(false);
      }
    }, HIDE_HISTORY_TIMEOUT);
  };
  const onHideHistory = () => {
    setShowHistory(false);
  };

  useEffect(() => {
    if (isEmpty(trim(searchText))) return;

    const asyncLoadEntries = async () => {
      try {
        const { data } = await axios.get("/api/nft", {
          params: { limit: PAGINATION_LIMIT, ownerAddresses: searchText },
        });

        setEntries(data.entries);
        setCursor(data.metadata.cursor);
        setHasNextPage(data.metadata.hasNextPage);
        setSearchHistory((currentEntries): [] => {
          return uniq([...currentEntries, searchText]) as [];
        });
      } catch (e: any) {
        setErrorStatus(e?.response?.status || 500);
      }
    };

    setCursor("");
    setHasNextPage(false);
    setErrorStatus(null);
    asyncLoadEntries();
  }, [
    searchText,
    setCursor,
    setEntries,
    setErrorStatus,
    setHasNextPage,
    setSearchHistory,
  ]);
  useEffect(() => {
    setText(searchText);
  }, [searchText]);
  /*
   * We don't want to hide the history if:
   * - the user clicks on the search input;
   * - the user clicks on any element within the search history itself;
   */
  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      const clickedOnSearchHistory = isNodeInRoot(
        event.target as HTMLElement,
        historyRef.current as HTMLElement
      );
      const clickedOnSearchInput = isNodeInRoot(
        event.target as HTMLElement,
        inputRef.current as HTMLElement
      );

      if (clickedOnSearchHistory || clickedOnSearchInput) {
        clearTimeout(closeOnBlurTimerRef.current as NodeJS.Timeout);
        shouldCloseHistory.current = false;
      } else {
        closeOnBlurTimerRef.current = setTimeout(() => {
          setShowHistory(false);
        }, HIDE_HISTORY_TIMEOUT);
        shouldCloseHistory.current = true;
      }
    };

    /*
     * We use 'useCapture' on this event listener because the history box might change its content and by the time the
     * listener callback is invoked, the event target might not be in the DOM anymore (and then 'isNodeInRoot' would
     * return 'false').
     */
    document.addEventListener("click", onDocumentClick, true);

    return () => {
      document.removeEventListener("click", onDocumentClick);
    };
  }, []);
  useEffect(() => {
    const onDocumentKeyUp = (event: KeyboardEvent) => {
      if (event.key === "/" || event.keyCode === 191) {
        inputRef.current?.focus();
      }
    };

    if (isFocused) {
      document.removeEventListener("keyup", onDocumentKeyUp);
    } else {
      document.addEventListener("keyup", onDocumentKeyUp);
    }

    return () => {
      document.removeEventListener("keyup", onDocumentKeyUp);
    };
  }, [isFocused]);

  return (
    <form className="w-[560px] relative" onSubmit={onSubmit}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        className="absolute stroke-slate-600/90 w-6 h-6 z-10 top-[50%] left-4 -mt-3 z-20"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
      <input
        autoFocus
        className="backdrop-blur-xl bg-slate-900/40 border border-slate-400/20 rounded-full text-slate-400 text-md py-3 pl-12 pr-20 w-full relative z-10 placeholder:text-slate-600/90 focus-visible:outline-none focus-visible:border-pink-500/70 focus-visible:shadow-[0_0_10px_0_rgba(236,72,153,0.5)] caret-pink-500 transition-colors"
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        placeholder="Wallet address or ENS domain..."
        ref={inputRef}
        type="text"
        value={text}
      />
      {isFocused ? (
        <button
          className="absolute bg-slate-800/90 rounded-md text-slate-400 text-[11px] font-semibold uppercase py-1 px-3 border border-slate-900/90 border-b-[3px] right-4 z-20 top-[50%] -translate-y-1/2 shadow-sm"
          type="submit"
        >
          Enter
        </button>
      ) : (
        <span className="absolute bg-slate-800/90 rounded-md text-slate-400 text-[11px] font-semibold uppercase py-1 px-3 border border-slate-900/90 border-b-[3px] right-4 z-20 top-[50%] -translate-y-1/2 shadow-sm">
          /
        </span>
      )}
      <div
        className="absolute top-[100%] right-0 left-0 pt-3 z-10"
        ref={historyRef}
      >
        {showHistory ? <SearchBoxHistory hideHistory={onHideHistory} /> : null}
      </div>
    </form>
  );
};

export default SearchBox;
