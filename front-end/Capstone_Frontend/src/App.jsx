import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "./Redux/actions/authActions";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    // dispatch(
    //   register({
    //     name: "Fabio",
    //     surname: "Simonelli",
    //     username: "FabioSimo",
    //     email: "fabio@gmail.com",
    //     password: "1234"
    //   })
    // );
    dispatch(login({ email: "fabio@gmail.com", password: "1234" }));
  });
  if (token) {
    return (
      <>
        {" "}
        <h1 className="font-bold text-white">{token}</h1>
      </>
    );
  }
  return (
    <>
      <div className="mx-auto px-3">
        <h1 className="font-bold text-white">
          PROGETTO SOCIAL - JAVA, SPRING, TAILWIND, REACT
        </h1>
      </div>
    </>
  );
}

export default App;
