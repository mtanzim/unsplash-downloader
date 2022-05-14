import { FC, useState } from "react";
import "../App.css";
import { Download } from "../../wailsjs/go/main/App";

interface Props {
  collectionIdInit?: string;
  messageInit?: string;
}

export const Downloader: FC<Props> = ({
  collectionIdInit = "",
  messageInit = "Please configure the downloads below",
}) => {
  const [results, setResults] = useState<string[]>([]);
  const [destPath, setDestPath] = useState("");
  const [collectionId, setCollectionId] = useState(collectionIdInit);
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
      <p>{messageInit}</p>
      <div id="input">
        <label htmlFor="collectionId">Provide collection id</label>
        <input
          value={collectionId}
          disabled={!!collectionIdInit}
          id="collectionId"
          onChange={updateCollection}
          name="input"
          type="text"
        />
        <label htmlFor="numPages">Number of pages</label>
        <input
          id="numPages"
          onChange={updateNumPages}
          value={numPages}
          name="input"
          type="number"
          min="1"
          max="20"
        />
        <label htmlFor="destPath">Download to path</label>
        <input
          id="destPath"
          onChange={updateDest}
          value={destPath}
          name="input"
          type="text"
        />
      </div>
      <div className="controls">
        <button onClick={clearAll}>Clear form</button>
        <input className="inputfile" type="file" name="file" id="file" />
        <label htmlFor="file">Explore local files</label>
        {loading ? "Loading..." : <button onClick={download}>Download</button>}
        {results.length > 0 && (
          <button onClick={() => setResults([])}>Clear results</button>
        )}
      </div>
      {error && <p className="error">{error}</p>}
      {results.length > 0 && (
        <textarea className="results" readOnly>
          {results.join("\n\n")}
        </textarea>
      )}
    </div>
  );
};
