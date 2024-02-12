import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import SignUpPage from "./Components/SignUpPage";
import Home from "./Components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
