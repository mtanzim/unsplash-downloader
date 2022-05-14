import { useState } from "react";
import "./App.css";
import { Download } from "../wailsjs/go/main/App";
import { Collections } from "./components/Collections";
import { Downloader } from "./components/Downloader";

type Pages = "Downloader" | "Collections";

function App() {
  const [page, setPage] = useState<Pages>("Collections");

  const renderPage = () => {
    switch (page) {
      case "Collections":
        return <Collections />;
      case "Downloader":
        return <Downloader />;
      default:
        return <div>Page not found</div>;
    }
  };
  return (
    <>
      <button onClick={() => setPage("Collections")}>Collections</button>
      <button onClick={() => setPage("Downloader")}>Downloader</button>
      {renderPage()}
    </>
  );
}

export default App;
