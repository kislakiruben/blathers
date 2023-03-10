import NftPreviewImage from "./NftPreviewImage";
import NftPreviewUnavailable from "./NftPreviewUnavailable";
import NftPreviewVideo from "./NftPreviewVideo";

export type NftPreviewProps = {
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
    url?: string;
  };
  metadata: {
    image?: string;
    mimeType?: string;
    name: string;
  };
};

const NftPreview = ({ content, image, metadata }: NftPreviewProps) => {
  const mimeType = image?.mimeType || metadata?.mimeType || content?.mimeType;

  if (mimeType) {
    if (mimeType.startsWith("image/")) {
      const src =
        metadata?.image ||
        image?.mediaEncoding.poster ||
        content?.mediaEncoding.poster ||
        "";

      return <NftPreviewImage src={src} />;
    } else if (mimeType.startsWith("video/")) {
      const src =
        metadata?.image ||
        image?.mediaEncoding.preview ||
        content?.mediaEncoding.preview ||
        image.url ||
        "";

      return <NftPreviewVideo mimeType={mimeType} src={src} />;
    }
  }

  return <NftPreviewUnavailable />;
};

export default NftPreview;
