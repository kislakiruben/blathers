import isEmpty from "lodash/isEmpty";
import trim from "lodash/trim";
import { selector } from "recoil";

import { entriesByOwnerAddressState } from "../atoms/nft";
import { searchTextState } from "../atoms/ui";

export const nftSearchResultSelector = selector({
  key: "selectors/nft/nft-search-result",
  get: ({ get }) => {
    const ownerAddress = trim(get(searchTextState));

    return isEmpty(ownerAddress)
      ? []
      : get(entriesByOwnerAddressState(ownerAddress));
  },
});
