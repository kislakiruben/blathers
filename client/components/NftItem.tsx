export type NftItemProps = {
  tokenId: string;
  metadata: {
    description: string;
    image: string;
    name: string;
  };
};

const NftItem = ({ tokenId, metadata }: NftItemProps) => (
  <div>
    <figure>
      <img src={metadata.image} />
      <figcaption>{metadata.description}</figcaption>
    </figure>
  </div>
);

export default NftItem;
