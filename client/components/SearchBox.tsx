import axios from "axios";
import isEmpty from "lodash/isEmpty";
import trim from "lodash/trim";
import { useSetRecoilState, useRecoilState } from "recoil";
import { useEffect, useState } from "react";

import { entriesByOwnerAddressState } from "../atoms/nft";
import {
  errorStatusState,
  paginationCursorState,
  paginationHasNextPageState,
  searchTextState,
} from "../atoms/ui";
import { PAGINATION_LIMIT } from "../constants";

const SearchBox = () => {
  const [text, setText] = useState("");
  const [searchText, setSearchText] = useRecoilState(searchTextState);
  const setEntries = useSetRecoilState(entriesByOwnerAddressState(searchText));
  const setErrorStatus = useSetRecoilState(errorStatusState);
  const setCursor = useSetRecoilState(paginationCursorState);
  const setHasNextPage = useSetRecoilState(paginationHasNextPageState);
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setText((event.target as HTMLInputElement).value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setSearchText(text);
    event.preventDefault();
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
      } catch (e: any) {
        setErrorStatus(e?.response?.status || 500);
      }
    };

    setCursor("");
    setHasNextPage(false);
    setErrorStatus(null);
    asyncLoadEntries();
  }, [searchText, setCursor, setEntries, setErrorStatus, setHasNextPage]);
  useEffect(() => {
    setText(searchText);
  }, [searchText]);

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
        className="backdrop-blur-xl bg-slate-900/40 border border-slate-700/60 rounded-full text-slate-400 text-md py-3 pl-12 pr-20 w-full relative z-10 placeholder:text-slate-600/90 focus-visible:outline-none focus-visible:border-pink-500/70 focus-visible:shadow-[0_0_10px_0_rgba(236,72,153,0.5)] caret-pink-500 transition-colors"
        onChange={onChange}
        placeholder="Wallet address or ENS domain..."
        type="text"
        value={text}
      />
      <button
        className="absolute bg-slate-800/90 rounded-md text-slate-400 text-[11px] font-semibold uppercase py-1 px-3 border border-slate-900/90 border-b-[3px] right-4 z-20 top-[50%] -translate-y-1/2 shadow-sm"
        type="submit"
      >
        Enter
      </button>
    </form>
  );
};

export default SearchBox;
