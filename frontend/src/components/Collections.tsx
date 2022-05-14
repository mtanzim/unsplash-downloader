import { FC, useEffect, useState } from "react";
import "./Collection.css";
import "../App.css";
import { Downloader } from "./Downloader";

const BASE_API = "https://api.unsplash.com";
const PER_PAGE = 8;
const CLIENT_ID = "xpySlyzhA8K9GRohyq4GWrCWzUxlo5ukMWE8NiFkvyc";

interface CleanedCollection {
  id: string;
  thumbnail: string;
  title: string;
}

export const Collections: FC = () => {
  const [curPage, setCurPage] = useState(1);
  const [userPageNum, setUserNum] = useState(1);
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
    fetchCollectionsByUser(username, userPageNum).then((res) =>
      setCollections(res.map(collectionMapper))
    );
  };

  const collectionMapper = (r: unknown) => ({
    id: r?.id,
    title: r?.title,
    thumbnail: r?.cover_photo?.urls?.thumb,
  });

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
          messageInit={`Configure download for ${curCollection.title}`}
        />
      );
    }
  };

  return (
    <div className="page-container">
      <p>Browse collections</p>
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
          <div className="collection-container">
            {collections.map((c: CleanedCollection) => (
              <div key={c.id} className="collection-item">
                <p>{c.title}</p>
                <img
                  onClick={() => setCurCollection(c)}
                  src={c.thumbnail}
                  alt={c.title}
                />
              </div>
            ))}
          </div>
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
