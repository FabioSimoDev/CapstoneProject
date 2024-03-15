import { useSelector } from "react-redux";
import { formatDate } from "../../utils/dateUtils";

export default function PersonalInfoResume() {
  const personalData = useSelector((state) => state.userData.currentUser);
  return (
    <>
      <div className="py-2 text-lg font-bold uppercase post-title">
        User Details
      </div>
      <div className="">
        <div className="flex items-center space-x-4">
          <img
            src={personalData?.avatarURL}
            alt="User Avatar"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <p className="text-xl font-semibold">
              {personalData?.name} {personalData?.surname}
            </p>
            <p className="text-gray-600">
              <span className="font-bold underline decoration-indigo-500/50 decoration-2">
                Username
              </span>
              : {personalData?.username}
            </p>
            <p className="text-gray-600">
              <span className="font-bold underline decoration-indigo-500/50 decoration-2">
                Email
              </span>
              : {personalData?.email}
            </p>
            <p className="text-gray-600">
              <span className="font-bold underline decoration-indigo-500/50 decoration-2">
                Subscription Date
              </span>
              : {formatDate(personalData?.signUpDate)}
            </p>
          </div>
        </div>
        <div className="mt-4 pt-5">
          <p className="text-lg font-semibold">Biography</p>
          <p className="text-gray-600">{personalData?.biography}</p>
        </div>
        <div className="mt-4">
          <p className="text-lg font-semibold">Reputation</p>
          <p className="text-gray-600">{personalData?.reputation?.points}</p>
        </div>
      </div>
    </>
  );
}
