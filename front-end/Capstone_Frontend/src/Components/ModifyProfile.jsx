import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { updateAvatar } from "../Redux/actions/userProfileActions";

const ModifyProfile = () => {
  const userData = useSelector((state) => state.userData.data);
  const [selectedFile, setSelectedFile] = useState(null);
  const [biography, setBiography] = useState(null);
  const fileInputRef = useRef(null);
  const errorDisplay = useRef(null);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSave = () => {
    if (!selectedFile) {
      if (!biography) {
        return;
      }
    }
    const formData = new FormData();
    formData.append("avatar", selectedFile);
    dispatch(updateAvatar(token, formData));
    console.log("Dati pronti per essere inviati al backend:", formData);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  if (!userData) {
    return <h1>CARICAMENTO</h1>;
  }
  return (
    <>
      <h1 className="font-bold text-xl">Modifica profilo</h1>
      <div className="dark:bg-[#262626] dark:border-0 dark:shadow-none shadow border py-5 px-5 rounded-xl transition-colors flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <img
            src={userData.avatarURL}
            alt="avatar"
            width={60}
            className="rounded-full"
          />
          <div>
            <p>{userData.username}</p>
            <p className="text-sm ps-1">{userData.name}</p>
          </div>
        </div>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
          ref={fileInputRef}
        />
        <button
          onClick={handleClick}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        >
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
          placeholder={userData.biography ?? "Inserisci la biografia"}
        ></textarea>
      </div>
      <p ref={errorDisplay}></p>
      <button
        onClick={handleSave}
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
      >
        Salva
      </button>
    </>
  );
};

export default ModifyProfile;
