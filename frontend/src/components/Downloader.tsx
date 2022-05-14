import { FC, useState } from "react";
import "../App.css";
import { Download } from "../../wailsjs/go/main/App";

interface Props {
  collectionIdInit?: string;
  messageInit?: string;
}

export const Downloader: FC<Props> = ({
  collectionIdInit,
  messageInit = "Please configure the downloads below",
}) => {
  const [results, setResults] = useState<string[]>([]);
  const [destPath, setDestPath] = useState("");
  const [collectionId, setCollectionId] = useState(collectionIdInit || "");
  const [numPages, setNumPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const updateDest = (e: any) => setDestPath(e.target.value);
  const updateCollection = (e: any) => setCollectionId(e.target.value);
  const updateNumPages = (e: any) => setNumPages(e.target.value);

  const clearAll = () => {
    setDestPath("");
    setCollectionId("");
    setNumPages(1);
  };

  const fromCollections = !!collectionIdInit;

  const validate = (): boolean => {
    if (destPath === "") {
      setError("Destination path is required");
      return false;
    }
    if (collectionId === "") {
      setError("Collection id is required");
      return false;
    }
    if (numPages > 20 || numPages < 1) {
      setError("Number of pages must be between 1 and 20");
      return false;
    }
    return true;
  };

  function download() {
    setError("");
    if (!validate()) {
      return;
    }
    setResults([]);
    setLoading(true);
    Download(destPath, collectionId, Number(numPages)).then((res) => {
      setResults(res);
      setLoading(false);
    });
  }

  return (
    <div>
      <div>
        <p>{messageInit}</p>
        <div id="input">
          <input
            value={collectionId}
            disabled={fromCollections}
            id="collectionId"
            onChange={updateCollection}
            name="input"
            type="text"
          />
          <label htmlFor="collectionId">Provide collection id</label>
          <input
            id="numPages"
            onChange={updateNumPages}
            value={numPages}
            name="input"
            type="number"
            min="1"
            max="20"
          />
          <label htmlFor="numPages">
            Number of pages, each page contains 10 images
          </label>
          <input
            id="destPath"
            onChange={updateDest}
            value={destPath}
            name="input"
            type="text"
          />
          <label htmlFor="destPath">Download to path</label>
        </div>
        <div className="controls">
          <button disabled={fromCollections} onClick={clearAll}>
            Clear form
          </button>

          {loading ? (
            "Loading..."
          ) : (
            <button onClick={download}>Download</button>
          )}
          {results.length > 0 && (
            <button onClick={() => setResults([])}>Clear results</button>
          )}
        </div>
        <input className="inputfile" type="file" name="file" id="file" />
        <label htmlFor="file">
          <button>Explore local files</button>
        </label>
        {error && <p className="error">{error}</p>}
      </div>
      <div>
        {results.length > 0 && (
          <textarea className="results" readOnly>
            {[`Downloaded ${results.length} files\n`]
              .concat(results)
              .join("\n\n")}
          </textarea>
        )}
      </div>
    </div>
  );
};
