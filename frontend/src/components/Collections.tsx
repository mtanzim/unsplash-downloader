import { FC, useEffect, useState } from "react";
import "./Collection.css";
import "../App.css";

const BASE_API = "https://api.unsplash.com/";
const PER_PAGE = 10;
const CLIENT_ID = "xpySlyzhA8K9GRohyq4GWrCWzUxlo5ukMWE8NiFkvyc";

interface CleanedCollection {
  id: string;
  thumbnail: string;
  title: string;
}

export const Collections: FC = () => {
  const [page, setPage] = useState(1);

  const goNext = () => {
    setPage((cur) => cur + 1);
  };

  const goPrev = () => {
    setPage((cur) => Math.max(cur - 1, 1));
  };

  const [collections, setCollections] = useState<CleanedCollection[]>([]);
  const [errorMsg, setError] = useState(null);
  useEffect(() => {
    setError(null);
    setCollections([]);
    fetch(
      `${BASE_API}collections?page=${page}&per_page=${PER_PAGE}&client_id=${CLIENT_ID}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Failed to fetch collections");
      })
      .then((res) => {
        console.log(res);
        setCollections(
          res.map((r: unknown) => ({
            id: r?.id,
            title: r?.title,
            thumbnail: r?.cover_photo?.urls?.thumb,
          }))
        );
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
      });
  }, [page]);
  return (
    <div className="page-container">
      <p>Collections</p>
      <p>Page {page}</p>
      <button disabled={page === 1} onClick={goPrev}>
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
            <img src={c.thumbnail} alt={c.title} />
          </div>
        ))}
      </div>

    </div>
  );
};
