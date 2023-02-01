import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { entriesByOwnerAddressState } from "../atoms/nft";
import {
  paginationCursorState,
  paginationHasNextPageState,
  searchTextState,
} from "../atoms/ui";
import { PAGINATION_LIMIT } from "../constants";

const LoadMore = () => {
  const [cursor, setCursor] = useRecoilState(paginationCursorState);
  const [hasNextPage, setHasNextPage] = useRecoilState(
    paginationHasNextPageState
  );
  const searchText = useRecoilValue(searchTextState);
  const setEntries = useSetRecoilState(entriesByOwnerAddressState(searchText));
  const onClick = async () => {
    try {
      const { data } = await axios.get("/api/nft", {
        params: {
          after: cursor,
          limit: PAGINATION_LIMIT,
          ownerAddresses: searchText,
        },
      });

      setEntries(
        (currentEntries): [] => [...currentEntries, ...data.entries] as []
      );
      setCursor(data.metadata.cursor);
      setHasNextPage(data.metadata.hasNextPage);
    } catch (e) {
      throw e;
    }
  };

  return hasNextPage ? (
    <button
      className="backdrop-blur-xl bg-slate-900/60 border border-slate-700/50 rounded-lg text-slate-300 px-14 py-2 text-sm"
      onClick={onClick}
      type="button"
    >
      Load more
    </button>
  ) : null;
};

export default LoadMore;
