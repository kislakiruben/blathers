import { useRecoilValue } from "recoil";
import { nftSearchResultSelector } from "../selectors/nft";

const NftList = () => {
  const results = useRecoilValue(nftSearchResultSelector);

  return <pre>List</pre>;
};

export default NftList;
