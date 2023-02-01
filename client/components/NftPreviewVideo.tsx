import cx from "classnames";
import { useEffect, useRef, useState } from "react";

import NftPreviewUnavailable from "./NftPreviewUnavailable";

type NftPreviewVideoProps = {
  mimeType: string;
  src: string;
};

/*
 * While the video is loading, we hide it form the screen, but we don't use 'display: none', because that won't
 * initilize the loading of the video).
 * Note that the listener for whether the video loaded is on the <video/> element, while the listener for when the video
 * failed loading is on the <source/> element.
 */
const NftPreviewVideo = ({ mimeType, src }: NftPreviewVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sourceRef = useRef<HTMLSourceElement>(null);
  const [errored, setErrored] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const onError = () => {
    setErrored(true);
  };
  const onLoad = () => {
    setLoaded(true);
  };

  useEffect(() => {
    const currentSourceRef = sourceRef.current;
    const currentVideoRef = videoRef.current;

    if (currentSourceRef) {
      currentSourceRef.addEventListener("error", onError);
    }
    if (currentVideoRef) {
      currentVideoRef.addEventListener("loadeddata", onLoad);
    }

    return () => {
      currentSourceRef?.removeEventListener("error", onError);
      currentVideoRef?.removeEventListener("loadeddata", onLoad);
    };
  }, []);

  if (errored) {
    return <NftPreviewUnavailable />;
  }

  return (
    <video
      autoPlay
      className={cx("w-full h-full object-cover", {
        visible: loaded,
        invisible: !loaded,
      })}
      loop
      muted
      playsInline
      ref={videoRef}
    >
      <source
        ref={sourceRef}
        src={`https://ipfs.io/${src.replace("ipfs://", "")}`}
        type={mimeType}
      />
    </video>
  );
};

export default NftPreviewVideo;
