import { useState } from "react";
import Checkbox from "../UI/Checkbox";

const CommentsSettings = () => {
  const [selectedOption, setSelectedOption] = useState("tutti");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  return (
    <>
      <h1 className="text-xl font-bold">Commenti</h1>
      <small className="font-semibold">Consenti commenti di</small>
      <div>
        <Checkbox
          label={"Tutti"}
          checked={selectedOption === "tutti"}
          onChange={() => handleOptionChange("tutti")}
        />
      </div>
      <div>
        <Checkbox
          label={"Persone che segui"}
          checked={selectedOption === "personeCheSegui"}
          onChange={() => handleOptionChange("personeCheSegui")}
        />
      </div>
      <div>
        <Checkbox
          label={"I tuoi follower"}
          checked={selectedOption === "iTuoiFollower"}
          onChange={() => handleOptionChange("iTuoiFollower")}
        />
      </div>
    </>
  );
};

export default CommentsSettings;
