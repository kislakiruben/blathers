import NftPreview from "./NftPreview";

export type NftItemProps = {
  collectionName: string;
  content: {
    mediaEncoding: {
      poster?: string;
      preview?: string;
    };
    mimeType?: string;
  };
  image: {
    mediaEncoding: {
      poster?: string;
      preview?: string;
    };
    mimeType?: string;
  };
  metadata: {
    description: string;
    image: string;
    name: string;
    mimeType?: string;
  };
  name: string;
  tokenId: string;
};

const NftItem = ({
  collectionName,
  content,
  image,
  metadata,
  name,
  tokenId,
}: NftItemProps) => {
  const onCopyToClipboard = (text: string) => () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="backdrop-blur-xl bg-slate-900/50 border border-slate-400/20 rounded-lg text-slate-300 h-96 flex flex-col shadow-xl shadow-slate-900/40">
      <div className="grow overflow-hidden rounded-t-lg">
        <NftPreview content={content} image={image} metadata={metadata} />
      </div>
      <div className="py-2 px-4 border-t border-slate-400/20 min-h-[41px]">
        {name ? (
          <h2 className="font-semibold text-md text-ellipsis overflow-hidden whitespace-nowrap">
            {name}
          </h2>
        ) : (
          <h2 className="font-mono text-md text-slate-300/50 w-full truncate text-ellipsis overflow-hidden whitespace-nowrap">
            {tokenId}
          </h2>
        )}
      </div>
      <ul className="text-xs px-4 pb-2 text-slate-300/50">
        <li className="flex justify-between mb-1">
          <span className="mr-2 whitespace-nowrap">
            <strong>Token ID</strong>
          </span>
          <span className="flex items-center min-w-0">
            <button
              className="hover:text-slate-300/80 mr-1 transition-colors"
              onClick={onCopyToClipboard(tokenId)}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
                <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
              </svg>
            </button>
            <span className="font-mono min-w-0 truncate text-ellipsis overflow-hidden whitespace-nowrap">
              {tokenId}
            </span>
          </span>
        </li>
        <li className="flex justify-between mb-1">
          <span className="mr-2 whitespace-nowrap">
            <strong>Collection</strong>
          </span>
          <span className="min-w-0 truncate text-ellipsis overflow-hidden whitespace-nowrap">
            {collectionName}
          </span>
        </li>
        <li className="flex justify-between">
          <span className="mr-2 whitespace-nowrap">
            <strong>Blockchain</strong>
          </span>
          <span className="min-w-0 truncate text-ellipsis overflow-hidden whitespace-nowrap">
            Ethereum
          </span>
        </li>
      </ul>
    </div>
  );
};

export default NftItem;
