import { atomFamily } from "recoil";

export const entriesByOwnerAddressState = atomFamily({
  key: "atoms/nft/entries-by-owner-address",
  default: () => [],
});
