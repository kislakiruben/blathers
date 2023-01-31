import axios from "axios";
import isEmpty from "lodash/isEmpty";
import trim from "lodash/trim";
import { selector, selectorFamily } from "recoil";

import { searchTextState } from "../atoms/ui";

/*
 * Recoil will create a cached state based on the params passed (in this case `ownerAddress`).
 */
export const nftByOwnerAddressSelector = selectorFamily({
  key: "selectors/nft/nft-by-owner-address",
  get: (ownerAddress) => async () => {
    try {
      const { data } = await axios.get("/api/nft", {
        params: { limit: 10, ownerAddresses: ownerAddress },
      });

      return data;
    } catch (e) {
      throw e;
    }
  },
});

export const nftSearchResultSelector = selector({
  key: "selectors/nft/nft-search-result",
  get: ({ get }) => {
    const ownerAddress = trim(get(searchTextState));

    return isEmpty(ownerAddress)
      ? { entries: [], metadata: {} }
      : get(nftByOwnerAddressSelector(ownerAddress));
  },
});
