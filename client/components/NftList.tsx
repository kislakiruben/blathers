import { useRecoilValue } from "recoil";

import { nftSearchResultSelector } from "../selectors/nft";
import NftItem, { NftItemProps } from "./NftItem";

const NftList = () => {
  const result = useRecoilValue(nftSearchResultSelector);

  return (
    <div className="max-w-screen-2xl mx-auto relative">
      <ul className="grid gap-6 grid-cols-5">
        {result.entries.map((nft: NftItemProps) => (
          <li key={nft.tokenId}>
            <NftItem {...nft} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NftList;
