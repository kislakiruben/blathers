import NftPreviewImage from "./NftPreviewImage";
import NftPreviewUnavailable from "./NftPreviewUnavailable";

export type NftPreviewProps = {
  image: {
    mediaEncoding: {
      poster?: string;
      preview?: string;
    };
    mimeType?: string;
  };
  metadata: {
    image?: string;
    mimeType?: string;
    name: string;
  };
};

const NftPreview = ({ image, metadata }: NftPreviewProps) => {
  const mimeType = image.mimeType || metadata.mimeType;

  if (mimeType) {
    if (mimeType.startsWith("image/")) {
      const src = metadata?.image || image?.mediaEncoding.poster || "";

      return <NftPreviewImage src={src} />;
    }
  }

  return <NftPreviewUnavailable />;
};

export default NftPreview;
