import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getPersonalPosts } from "../Redux/actions/postActions";
import { IoMdGrid } from "react-icons/io";
import { CgBookmark } from "react-icons/cg";

const Profile = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [userData, setUserData] = useState(null);
  const [selectedView, setSelectedView] = useState("POST");
  const token = useSelector((state) => state.auth.token);
  const personalData = useSelector((state) => state.userData.data);
  const posts = useSelector((state) => state.posts.posts);
  const { userId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && userId) {
      if (userId === "me") {
        dispatch(getPersonalPosts(token));
      }
    }
  }, [token, userId]);

  useEffect(() => {
    if (userId === "me") {
      setUserData(personalData);
    }
  }, [userId, personalData]);

  if (!userData || !posts) {
    return null;
  }

  return (
    <div className={` ${darkMode ? "dark" : null}`}>
      <div className={`custom-base-container`}>
        <Sidebar />
        <div className="max-w-[65rem] w-full mx-auto py-9 px-5">
          <div className="flex gap-24 mx-auto mb-14">
            <div className="w-[10rem] h-[10rem] shrink-0">
              <img
                src={userData.avatarURL}
                alt="avatar"
                className="rounded-full w-full h-full object-cover"
              />
            </div>
            <div className="w-full flex flex-col justify-evenly gap-2">
              <div className="flex gap-8 items-center">
                <h1 className="text-xl">{userData.username}</h1>
                <button className="secondary-button">Modifica profilo</button>
              </div>
              <div className="flex gap-8 items-center">
                <p className="font-semibold">
                  {posts.length} <span className="font-normal">post</span>
                </p>
                <p className="font-semibold">
                  - <span className="font-normal">follower</span>
                </p>
                <p className="font-semibold">
                  - <span className="font-normal">seguiti</span>
                </p>
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-sm">{userData.name}</p>
                <p className="text-sm">{userData.biography}</p>
              </div>
            </div>
          </div>
          <div
            role="menu"
            className="border-t border-black/30 dark:border-white/50"
          ></div>
          <div className="flex justify-center gap-10 dark:text-white/50 text-black/50 text-sm">
            <p
              className={`${
                selectedView !== "POST"
                  ? "dark:border-white/0 border-black/0"
                  : "border-black dark:border-white"
              } border-t pt-1 flex items-center gap-1 cursor-pointer`}
              onClick={() => setSelectedView("POST")}
            >
              <IoMdGrid size={16} />
              POST
            </p>
            <p
              className={`${
                selectedView !== "SALVATI"
                  ? "dark:border-white/0 border-black/0"
                  : "border-black dark:border-white"
              } border-t pt-1 flex items-center gap-1 cursor-pointer`}
              onClick={() => setSelectedView("SALVATI")}
            >
              <CgBookmark size={16} />
              ELEMENTI SALVATI
            </p>
          </div>
          {posts.length === 0 && <h1>Non sono presenti post</h1>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
