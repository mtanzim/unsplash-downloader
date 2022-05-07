import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import {Download, Greet} from "../wailsjs/go/main/App";

function App() {
    const [resultText, setResultText] = useState("Please configure the downloads below");
    const [destPath, setDestPath] = useState('');
    const [collectionId, setCollectionId] = useState('');
    const updateDest = (e: any) => setDestPath(e.target.value);
    const updateCollection = (e: any) => setCollectionId(e.target.value);
    const updateResultText = (result: string) => setResultText(result);


    function download() {
        Download(destPath, collectionId).then(updateResultText);
    }

    return (
        <div id="App">
            <img src={logo} id="logo" alt="logo"/>
            <div id="result" className="result">{resultText}</div>
            <div id="input" className="input-box">
                <input placeholder="Enter destination here" id="destPath" onChange={updateDest} autoComplete="off" name="input" type="text"/>
                <input placeholder="Enter collection id here" id="collectionId" onChange={updateCollection} autoComplete="off" name="input" type="text"/>
                <button className="btn" onClick={download}>Download</button>
            </div>
        </div>
    )
}

export default App
