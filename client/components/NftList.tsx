import { useRecoilValue } from "recoil";

import { nftSearchResultSelector } from "../selectors/nft";
import NftItem, { NftItemProps } from "./NftItem";
import LoadMore from "./LoadMore";

const NftList = () => {
  const entries = useRecoilValue(nftSearchResultSelector);

  return (
    <div className="flex flex-col items-center max-w-screen-2xl mx-auto relative pb-[120px]">
      <ul className="grid gap-6 grid-cols-5 mb-20 w-full">
        {entries.map((nft: NftItemProps) => (
          <li key={nft.tokenId}>
            <NftItem {...nft} />
          </li>
        ))}
      </ul>
      <LoadMore />
    </div>
  );
};

export default NftList;
