import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import UploadFiles from "./components/Uploadfiles";
import RegisterForm from "./components/register";
import Header from "./components/header";
import Home from "./components/home";
import TranscriptionResults from "./components/TranscriptionResults";
import SentimentAnalysis from "./components/sentimentAnalysis";
import Profile from "./components/Profile";
import Login from "./components/login";


function App() {
  const location = useLocation();
  
  // Show header on all pages except home page
  const showHeader = location.pathname !== '/';

  return (
    <div className="App">
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/UploadFiles" element={<UploadFiles />} />
        <Route path="/transcription-results" element={<TranscriptionResults />} />
        <Route path="/sentiment-analysis" element={<SentimentAnalysis />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </div>
  );
}

export default App;