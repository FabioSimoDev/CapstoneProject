import HorizontalSeparator from "../UI/HorizontalSeparator";
import { useEffect, useState } from "react";
import Sidebar from "../Navigation/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { IoMdGrid } from "react-icons/io";
import { CgBookmark } from "react-icons/cg";
import { loadUserDataById } from "../../Redux/actions/userDataActions";
import SkeletonProfile from "../Misc/SkeletonProfile";
import PostPreviewGrid from "../Posts/PostPreviewGrid";
import { useFolderQuery } from "../../hooks/useFolderQuery";
import FolderPreview from "../Misc/FolderPreview";
import CreateFolderPreviewSquare from "../Misc/CreateFolderPreviewSquare";
import UserProfileHeader from "../Misc/UserProfileHeader";
import { useProfilePost } from "../../hooks/useProfilePosts";

const Profile = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [userData, setUserData] = useState(null);
  const [selectedView, setSelectedView] = useState("POST");
  const token = useSelector((state) => state.auth.token);
  const personalData = useSelector((state) => state.userData.currentUser);
  const { userId } = useParams();
  const posts = useProfilePost(userId);
  const dispatch = useDispatch();
  const { data: folders } = useFolderQuery(selectedView === "SALVATI");

  useEffect(() => {
    if (userId === "me") {
      setUserData(personalData);
    } else {
      dispatch(loadUserDataById(token, userId)).then((userData) => {
        console.log(userData);
        setUserData(userData);
      });
    }
  }, [userId, personalData]);

  return (
    <div className={` ${darkMode ? "dark" : null}`}>
      <div className={`custom-base-container`}>
        <Sidebar />
        {!userData || !posts ? (
          <div className="max-w-[65rem] w-full mx-auto py-9 px-5">
            <SkeletonProfile />
          </div>
        ) : (
          <>
            <div className="w-full h-screen overflow-y-auto">
              <div className="max-w-[65rem] w-full mx-auto py-9 px-5">
                <UserProfileHeader
                  userData={userData}
                  userId={userId}
                  postCount={posts?.length}
                />
                <HorizontalSeparator />
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
                  {userData.id === personalData.id && (
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
                  )}
                </div>
                {selectedView !== "SALVATI" ? (
                  <>
                    {posts.length === 0 ? (
                      <p>Non sono presenti post</p>
                    ) : (
                      <PostPreviewGrid posts={posts} />
                    )}
                  </>
                ) : (
                  folders && (
                    <div className="grid grid-cols-3 gap-4 py-4">
                      {folders.content?.map((folder, index) => (
                        <FolderPreview folder={folder} key={index} />
                      ))}
                      <CreateFolderPreviewSquare />
                    </div>
                  )
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
