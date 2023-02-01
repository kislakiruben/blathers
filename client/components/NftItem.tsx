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
    <div className="backdrop-blur-xl bg-slate-900/50 border border-slate-700/60 rounded-lg text-slate-300 h-80 flex flex-col shadow-xl shadow-slate-900/40">
      <div className="flex-grow relative overflow-hidden rounded-t-lg">
        <NftPreview image={image} metadata={metadata} />
      </div>
      <div className="py-2 px-4 border-t border-slate-700/60 min-h-[37px]">
        {name ? (
          <h2 className="font-semibold text-md">{name}</h2>
        ) : (
          <h2 className="text-md text-slate-300/50">
            <pre className="truncate text-ellipsis overflow-hidden">
              {tokenId}
            </pre>
          </h2>
        )}
      </div>
    </div>
  );
};

export default NftItem;
