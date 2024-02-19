import { useState } from "react";
import Checkbox from "./Checkbox";
import { useSelector } from "react-redux";

const RememberMeSettings = () => {
  const [selected, setSelected] = useState(
    localStorage.getItem("rememberAccess") === "true"
  );
  const token = useSelector((state) => state.auth.token);

  const handleChange = () => {
    console.log(selected);
    localStorage.setItem("rememberAccess", !selected);
    //lo stato react si aggiornerà al prossimo rendering,
    //quindi per tutta la durata di questa funzione avrà sempre lo stesso valore
    setSelected(!selected);
    if (!selected && !localStorage.getItem("TOKEN")) {
      localStorage.setItem("TOKEN", token);
    } else if (selected && localStorage.getItem("TOKEN")) {
      localStorage.removeItem("TOKEN");
    }
  };

  return (
    <>
      <Checkbox
        label={"Ricordami"}
        checked={selected}
        onChange={handleChange}
      />
      <p className="dark:text-white/50 text-black/50 text-sm">
        Spuntando questa casella, EduShare salverà il tuo accesso. <br />
        In questo modo non dovrai effettuare nuovamente il login ogni volta che
        utilizzi il nostro sito.
      </p>
    </>
  );
};

export default RememberMeSettings;
