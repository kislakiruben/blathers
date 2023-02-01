import axios from "axios";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { entriesByOwnerAddressState } from "../atoms/nft";
import {
  paginationCursorState,
  paginationHasNextPageState,
  searchTextState,
} from "../atoms/ui";
import { PAGINATION_LIMIT } from "../constants";

const LoadMore = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cursor, setCursor] = useRecoilState(paginationCursorState);
  const [hasNextPage, setHasNextPage] = useRecoilState(
    paginationHasNextPageState
  );
  const searchText = useRecoilValue(searchTextState);
  const setEntries = useSetRecoilState(entriesByOwnerAddressState(searchText));
  const onClick = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/nft", {
        params: {
          after: cursor,
          limit: PAGINATION_LIMIT,
          ownerAddresses: searchText,
        },
      });

      setEntries((currentEntries): [] => {
        return [...currentEntries, ...data.entries] as [];
      });
      setCursor(data.metadata.cursor);
      setHasNextPage(data.metadata.hasNextPage);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      throw e;
    }
  };

  return hasNextPage ? (
    <button
      className="backdrop-blur-xl bg-pink-500/50 border border-pink-500/70 font-bold rounded-lg text-pink-200 px-14 py-2 text-sm mx-auto min-w-[190px] shadow-[0_0_10px_0_rgba(236,72,153,0.5)] enabled:hover:bg-pink-500/60 enabled:hover:border-pink-500/80 hover:text-pink-100 enabled:hover:shadow-[0_0_10px_0_rgba(236,72,153,0.6)] transition-colors disabled:opacity-70"
      disabled={isLoading}
      onClick={onClick}
      type="button"
    >
      {isLoading ? "Loading..." : "Load more"}
    </button>
  ) : null;
};

export default LoadMore;
