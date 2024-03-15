import { useDispatch } from "react-redux";
import Checkbox from "./Checkbox";
import { useEffect, useState } from "react";
import { setDarkMode } from "../../Redux/actions/themeActions";

const ColorThemeSettings = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch();

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const localStorageValue = localStorage.getItem("defaultTheme");
    if (localStorageValue) setSelectedOption(localStorageValue);
  }, []);

  useEffect(() => {
    const localStorageValue = localStorage.getItem("defaultValue");
    if (selectedOption === "dark") {
      if (localStorageValue === "dark") return;
      localStorage.setItem("defaultTheme", "dark");
      dispatch(setDarkMode(true));
    } else if (selectedOption === "light") {
      if (localStorageValue === "light") return;
      localStorage.setItem("defaultTheme", "light");
      dispatch(setDarkMode(false));
    }
  }, [selectedOption]);

  return (
    <>
      <h1>Tema colori predefinito:</h1>
      <Checkbox
        label={"dark"}
        checked={selectedOption === "dark"}
        onChange={() => handleOptionChange("dark")}
      />
      <Checkbox
        label={"light"}
        checked={selectedOption === "light"}
        onChange={() => handleOptionChange("light")}
      />
      <small className="dark:text-white/50 text-black/50">
        Cambiando questa impostazione stabilisci il nuovo tema di default
        utilizzato da EduShare.
      </small>
    </>
  );
};

export default ColorThemeSettings;
