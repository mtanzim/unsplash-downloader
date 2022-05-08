import { useState } from "react";
import "./App.css";
import { Download } from "../wailsjs/go/main/App";

function App() {
  const [resultText, setResultText] = useState(
    "Please configure the downloads below"
  );
  const [destPath, setDestPath] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [numPages, setNumPages] = useState(1);
  const updateDest = (e: any) => setDestPath(e.target.value);
  const updateCollection = (e: any) => setCollectionId(e.target.value);
  const updateNumPages = (e: any) => setNumPages(e.target.value);

  function download() {
    Download(destPath, collectionId, Number(numPages)).then(setResultText);
  }

  return (
    <div id="App" className="container-fluid">
      <h1>Unsplash Wallpaper Downloader</h1>
      <p>{resultText}</p>
      <div id="input">
        <input
          placeholder="Enter destination here"
          id="destPath"
          onChange={updateDest}
          value={destPath}
          autoComplete="off"
          name="input"
          type="text"
        />
        <input
          placeholder="Enter collection id here"
          value={collectionId}
          id="collectionId"
          onChange={updateCollection}
          autoComplete="off"
          name="input"
          type="text"
        />
        <input type="file" multiple/>
        <input
          placeholder="Number of pages to download"
          id="numPages"
          onChange={updateNumPages}
          value={numPages}
          autoComplete="off"
          name="input"
          type="text"
        />
        <button onClick={download}>Download</button>
      </div>
    </div>
  );
}

export default App;
