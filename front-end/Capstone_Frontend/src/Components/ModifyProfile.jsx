import { useSelector } from "react-redux";

const ModifyProfile = () => {
  const userData = useSelector((state) => state.userData.data);
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
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400">
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
      <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400">
        Salva
      </button>
    </>
  );
};

export default ModifyProfile;
