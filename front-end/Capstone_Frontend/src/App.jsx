import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import SignUpPage from "./Components/SignUpPage";
import Home from "./Components/Home";
import UserContainer from "./Container-Components/UserContainer";
import SettinsPage from "./Components/SettingsPage";
import Profile from "./Components/Profile";
import SearchPage from "./Components/SearchPage";

function App() {
  return (
    <BrowserRouter>
      <UserContainer />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search/:hashtag?" element={<SearchPage />} />
        <Route path="/settings" element={<SettinsPage />} />
        <Route path="/profile/:userId" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
