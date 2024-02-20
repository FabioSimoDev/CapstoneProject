import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { updateAvatar, updateUser } from "../Redux/actions/userProfileActions";

const ModifyProfile = () => {
  const currentUser = useSelector((state) => state.userData.currentUser);
  const userDataError = useSelector((state) => state.userData.error);
  const [selectedFile, setSelectedFile] = useState(null);
  const [detectedChanges, setDetectedChanges] = useState(false);
  const biographyRef = useRef(null);
  const fileInputRef = useRef(null);
  const errorDisplay = useRef(null);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    detectChanges();
  };

  const handleSave = () => {
    if (!detectedChanges) return;
    const biography = biographyRef.current.value;
    if (!selectedFile && !biography) return null;
    if (selectedFile) {
      const formData = new FormData();
      formData.append("avatar", selectedFile);
      dispatch(updateAvatar(token, formData));
    }
    if (biography) {
      dispatch(updateUser(token, { biography: biography }));
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const detectChanges = () => {
    if (!biographyRef.current) return;
    if (!detectedChanges) {
      setDetectedChanges(true);
    } else return;
  };

  if (!currentUser) {
    if (userDataError) {
      return <h1>{userDataError}</h1>;
    }
    return <h1>CARICAMENTO</h1>;
  }
  return (
    <>
      <h1 className="font-bold text-xl">Modifica profilo</h1>
      <div className="dark:bg-[#262626] dark:border-0 dark:shadow-none shadow border py-5 px-5 rounded-xl transition-colors flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="w-[60px] h-[60px]">
            <img
              src={currentUser.avatarURL}
              alt="avatar"
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <div>
            <p>{currentUser.username}</p>
            <p className="text-sm ps-1">{currentUser.name}</p>
          </div>
        </div>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
          ref={fileInputRef}
        />
        <button onClick={handleClick} className="primary-button">
          Cambia foto
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-bold text-lg">Biografia</p>
        <textarea
          name="biography"
          id="biographyTextArea"
          rows="2"
          maxLength={150}
          className="w-full overflow-y-auto rounded-xl dark:bg-black bg-white dark:border-white/25 dark:border border-2 p-3 outline-none text-lg"
          style={{ resize: "none" }}
          placeholder={currentUser.biography ?? "Inserisci la biografia"}
          ref={biographyRef}
          onChange={detectChanges}
        ></textarea>
      </div>
      <p ref={errorDisplay}></p>
      <button
        onClick={handleSave}
        className={`primary-button ${
          detectedChanges
            ? "bg-indigo-500 hover:bg-indigo-600"
            : "bg-indigo-500/50 hover:bg-indigo-600/50"
        }`}
      >
        Salva
      </button>
    </>
  );
};

export default ModifyProfile;
