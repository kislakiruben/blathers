import cx from "classnames";
import { useEffect, useRef, useState } from "react";

import NftPreviewUnavailable from "./NftPreviewUnavailable";

type NftPreviewImageProps = {
  src: string;
};

/*
 * While the image is loading, we hide it form the screen, but we don't use 'display: none', because that won't
 * initilize the loading of the image).
 * Note that we could've used 'onload' and 'onerror' event listeners on the image tag itself, but that's frowned upon as
 * they may be overwritten by other listeners.
 */
const NftPreviewImage = ({ src }: NftPreviewImageProps) => {
  const ref = useRef<HTMLImageElement>(null);
  const [errored, setErrored] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const onError = () => {
    setErrored(true);
  };
  const onLoad = () => {
    setLoaded(true);
  };

  useEffect(() => {
    const currentRef = ref.current;

    if (currentRef) {
      currentRef.addEventListener("error", onError);
      currentRef.addEventListener("load", onLoad);
    }

    return () => {
      currentRef!.removeEventListener("error", onError);
      currentRef!.removeEventListener("load", onLoad);
    };
  }, []);

  if (errored) {
    return <NftPreviewUnavailable />;
  }

  return (
    <img
      className={cx("w-full h-full object-cover", {
        visible: loaded,
        invisible: !loaded,
      })}
      ref={ref}
      src={
        src.startsWith("ipfs://")
          ? `https://ipfs.io/${src.replace("ipfs://", "")}`
          : src
      }
    />
  );
};

export default NftPreviewImage;
