import { useState } from "react";

const AccountPrivacy = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <h1 className="font-bold text-xl">Privacy dell&#39;account</h1>
      <div className="flex justify-between">
        <p className="font-semibold">Account privato</p>{" "}
        <label className="flex cursor-pointer select-none items-center">
          <div className="relative">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="sr-only"
            />
            <div
              className={`box block h-7 w-12 rounded-full ${
                isChecked ? "bg-indigo-500" : "bg-gray-500"
              }`}
            ></div>
            <div
              className={`absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white transition ${
                isChecked ? "translate-x-full" : ""
              }`}
            ></div>
          </div>
        </label>
      </div>
      <small className="dark:text-white/50 text-black/50 text-xs">
        Se imposti il tuo account come pubblico, chiunque su EduShare e fuori da
        EduShare può vedere il tuo profilo e i relativi post, anche se non ha un
        account EduShare.<br></br>
        <br></br> Se imposti il tuo account come privato, solo i follower che
        approvi possono vedere cosa condividi, inclusi i tuoi video o le tue
        foto nelle pagine degli hashtag e dei luoghi, e le liste dei follower e
        delle persone che segui.
      </small>
    </>
  );
};

export default AccountPrivacy;
