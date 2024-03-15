import { useSelector } from "react-redux";

export default function UserInfo() {
  const currentUser = useSelector((state) => state.userData.currentUser);

  return (
    <div className="flex gap-2 items-center">
      <div className="w-[30px] aspect-square rounded-full overflow-hidden">
        <img
          src={currentUser?.avatarURL}
          alt="avatar object cover w-full h-full"
        />
      </div>
      <span>{currentUser.username}</span>
    </div>
  );
}
