import { Routes, Route } from "react-router-dom";
import "./App.css";
import UploadFiles from "./components/Uploadfiles";
import Header from "./components/header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/UploadFiles" element={<UploadFiles />} />
      </Routes>
    </div>
  );
}

export default App;
