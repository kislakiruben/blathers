import { useRecoilValue } from "recoil";

import { nftSearchResultSelector } from "../selectors/nft";
import NftItem, { NftItemProps } from "./NftItem";
import NftItemErrorBoundary from "./NftItemErrorBoundary";
import LoadMore from "./LoadMore";

const NftList = () => {
  const entries = useRecoilValue(nftSearchResultSelector);

  return (
    <div className="flex flex-col items-center max-w-screen-2xl mx-auto relative pb-[120px]">
      <ul className="grid gap-6 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mb-20 w-full">
        {entries.map((nft: NftItemProps) => (
          <li key={nft.tokenId}>
            <NftItemErrorBoundary>
              <NftItem {...nft} />
            </NftItemErrorBoundary>
          </li>
        ))}
      </ul>
      <LoadMore />
    </div>
  );
};

export default NftList;
