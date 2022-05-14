import { FC, useEffect, useState } from "react";
import "../App.css";
import "./Collection.css";
import { CollectionGrid } from "./CollectionGrid";
import { Downloader } from "./Downloader";
import {
  BASE_API,
  CleanedCollection,
  CLIENT_ID,
  collectionMapper,
  PER_PAGE,
} from "./utils";

export const Collections: FC = () => {
  const [curPage, setCurPage] = useState(1);
  const [curCollection, setCurCollection] = useState<null | CleanedCollection>(
    null
  );
  const [collections, setCollections] = useState<CleanedCollection[]>([]);
  const [errorMsg, setError] = useState(null);

  const goNext = () => {
    setCurPage((cur) => cur + 1);
  };

  const goPrev = () => {
    setCurPage((cur) => Math.max(cur - 1, 1));
  };
  const fetchCollections = async (page: number) => {
    return fetch(
      `${BASE_API}/collections?page=${page}&per_page=${PER_PAGE}&client_id=${CLIENT_ID}`
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Failed to fetch collections");
    });
  };

  useEffect(() => {
    setError(null);
    setCollections([]);
    fetchCollections(curPage)
      .then((res) => {
        console.log(res);
        setCollections(res.map(collectionMapper));
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
      });
  }, [curPage]);

  const renderDownloader = () => {
    if (curCollection) {
      return (
        <Downloader
          collectionIdInit={curCollection.id}
          messageInit={`Configure download for ${curCollection.title}  with ${curCollection.numPhotos} pictures`}
        />
      );
    }
  };

  return (
    <div>
      <h2>Browse collections</h2>
      {!curCollection ? (
        <>
          <p>Page {curPage}</p>
          <button disabled={curPage === 1} onClick={goPrev}>
            Prev
          </button>
          <button disabled={collections.length === 0} onClick={goNext}>
            Next
          </button>
          {errorMsg && <p className="error">{errorMsg}</p>}
          <CollectionGrid collections={collections} cb={setCurCollection} />
        </>
      ) : (
        <>
          <button onClick={() => setCurCollection(null)}>Go Back</button>
          {renderDownloader()}
        </>
      )}
    </div>
  );
};
