import { FC } from "react";
import { CleanedCollection } from "./utils";
import "./Collection.css";

interface Props {
  collections: CleanedCollection[];
  cb: (collection: CleanedCollection) => void;
}

export const CollectionGrid: FC<Props> = ({ collections, cb }) => {
  return (
    <div className="collection-container">
      {collections.map((c: CleanedCollection) => (
        <div key={c.id} className="collection-item">
          <p>{c.title}</p>
          <img onClick={() => cb(c)} src={c.thumbnail} alt={c.title} />
        </div>
      ))}
    </div>
  );
};
