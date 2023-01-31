import { useRecoilValue } from "recoil";

import { nftSearchResultSelector } from "../selectors/nft";
import NftItem, { NftItemProps } from "./NftItem";

const NftList = () => {
  const result = useRecoilValue(nftSearchResultSelector);

  return result.entries.map((nft: NftItemProps) => (
    <NftItem key={nft.tokenId} {...nft} />
  ));
};

export default NftList;
