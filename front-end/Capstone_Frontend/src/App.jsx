import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import SignUpPage from "./Components/SignUpPage";
import Home from "./Components/Home";
import UserContainer from "./Container-Components/UserContainer";
import SettinsPage from "./Components/SettingsPage";

function App() {
  return (
    <BrowserRouter>
      <UserContainer />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<SettinsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
