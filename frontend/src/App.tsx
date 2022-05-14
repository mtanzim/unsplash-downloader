import { useState } from "react";
import "./App.css";
import { Collections } from "./components/Collections";
import { Downloader } from "./components/Downloader";
import { UserCollections } from "./components/UserCollections";

type Pages = "Downloader" | "Collections" | "User Collections";

function App() {
  const [page, setPage] = useState<Pages>("Collections");

  const renderPage = () => {
    switch (page) {
      case "Collections":
        return <Collections />;
      case "Downloader":
        return (
          <>
            <h2>Downloader</h2>
            <Downloader />
          </>
        );
      case "User Collections":
        return <UserCollections />;
      default:
        return <div>Page not found</div>;
    }
  };
  return (
    <div id="App">
      <h1>Unsplash Wallpaper Downloader</h1>
      <div id="nav"></div>
      <button className="nav" onClick={() => setPage("Collections")}>Collections</button>
      <button className="nav" onClick={() => setPage("User Collections")}>
        User Collections
      </button>
      <button className="nav" onClick={() => setPage("Downloader")}>Downloader</button>
      {renderPage()}
    </div>
  );
}

export default App;
