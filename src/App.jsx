import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/home" element={<Home currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path="/dashboard" element={<Dashboard currentUser={currentUser} goBack={() => window.history.back()} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
