import NftPreview from "./NftPreview";

export type NftItemProps = {
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

const NftItem = ({ content, image, metadata, name, tokenId }: NftItemProps) => {
  return (
    <div className="backdrop-blur-xl bg-slate-900/50 border border-slate-400/20 rounded-lg text-slate-300 h-80 flex flex-col shadow-xl shadow-slate-900/40">
      <div className="grow overflow-hidden rounded-t-lg">
        <NftPreview content={content} image={image} metadata={metadata} />
      </div>
      <div className="py-2 px-4 border-t border-slate-400/20 min-h-[41px] flex items-center justify-center">
        {name ? (
          <h2 className="font-semibold text-md text-ellipsis overflow-hidden whitespace-nowrap">
            {name}
          </h2>
        ) : (
          <h2 className="text-md text-slate-300/50 w-full">
            <pre className="truncate text-ellipsis overflow-hidden whitespace-nowrap">
              {tokenId}
            </pre>
          </h2>
        )}
      </div>
    </div>
  );
};

export default NftItem;
