import { FC, useEffect, useState } from "react";
import "../App.css";
import "./Collection.css";
import { CollectionGrid } from "./CollectionGrid";
import { Downloader } from "./Downloader";
import { BASE_API, CleanedCollection, CLIENT_ID, collectionMapper, PER_PAGE } from "./utils";

export const UserCollections: FC = () => {
  const [curPage, setCurPage] = useState(1);
  const [curUserName, setCurUserName] = useState<string | null>(null);
  const updateUserName = (e: any) => setCurUserName(e.target.value);

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

  const fetchCollectionsByUser = async (username: string, curPage: number) => {
    return fetch(
      `${BASE_API}/users/${username}/collections?page=${curPage}&per_page=${PER_PAGE}&client_id=${CLIENT_ID}`
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Failed to fetch collections for user");
    });
  };

  const fetchForUser = (username: string) => {
    fetchCollectionsByUser(username, curPage).then((res) =>
      setCollections(res.map(collectionMapper))
    );
  };



  useEffect(() => {
    if (curUserName) {
      return;
    }
    setError(null);
    setCollections([]);
    fetchCollectionsByUser(curUserName || "", curPage)
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
          messageInit={`Configure download for ${curCollection.title}`}
        />
      );
    }
  };

  return (
    <div className="page-container">
      <p>Browse users collections</p>
      <input
        value={curUserName || ""}
        id="userId"
        onChange={updateUserName}
        placeholder="Enter user name"
        name="input"
        type="text"
      />
      <button
        disabled={!curUserName}
        onClick={() => fetchForUser(curUserName || "")}
      >
        Search collections for user
      </button>
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
