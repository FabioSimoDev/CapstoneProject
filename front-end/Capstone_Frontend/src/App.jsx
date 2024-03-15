import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/Pages/LoginPage";
import SignUpPage from "./Components/Pages/SignUpPage";
import Home from "./Components/Pages/Home";
import UserContainer from "./Container-Components/UserContainer";
import SettinsPage from "./Components/Pages/SettingsPage";
import Profile from "./Components/Pages/Profile";
import SearchPage from "./Components/Pages/SearchPage";
import Folder from "./Components/Misc/Folder";

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
        <Route path="/profile/:userId?" element={<Profile />} />
        <Route path="/folder/:folderId" element={<Folder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
