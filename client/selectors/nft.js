import axios from "axios";
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
        params: { ownerAddresses: ownerAddress },
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
    const ownerAddress = get(searchTextState);

    return ownerAddress.length > 0
      ? get(nftByOwnerAddressSelector(ownerAddress))
      : [];
  },
});
