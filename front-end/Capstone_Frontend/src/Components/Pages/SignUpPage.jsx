import { useEffect, useRef } from "react";
import "../../styles/test.css";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../Redux/actions/authActions";
// import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { setDarkMode } from "../../Redux/actions/themeActions";

const SignUpPage = () => {
  // const [darkMode, setDarkMode] = useState(true);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const error = useSelector((state) => state.auth.error);
  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.auth.isLoading);
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const surnameRef = useRef();
  const usernameRef = useRef();
  const confirmPasswordRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startSignUp = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;
    const surname = surnameRef.current.value;
    const username = usernameRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (email && password && name && username && surname && confirmPassword) {
      if (password === confirmPassword) {
        const userData = {
          email: email,
          username: username,
          surname: surname,
          name: name,
          password: password
        };
        const emptyProperty = checkIfEmpty(userData);
        if (!emptyProperty) {
          console.log(checkIfEmpty(email, username, surname, name, password));
          console.log(userData);
          dispatch(register(userData)).then((err) => {
            if (!err) {
              navigate("/login");
            }
          });
        } else {
          alert(emptyProperty);
        }
      } else {
        alert("Le password non corrispondono");
      }
    }
  };

  const checkIfEmpty = (objArgs) => {
    console.log(objArgs);
    for (const property in objArgs) {
      console.log(property);
      if (objArgs[property].trim() === "") {
        return property;
      }
    }
    return null;
  };

  useEffect(() => {
    if (token && !error) {
      navigate("/home");
    }
  }, [token, error]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen flex items-center justify-center bg-gray-300 dark:bg-gray-900 gap-5">
        <div className="md:max-w-md max-w-sm sm:w-full w-11/12 px-6 py-8 bg-white dark:bg-gray-800 shadow-md rounded-md">
          <h2 className="text-center mb-8 text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center justify-center">
            Sign up
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-800 dark:text-gray-100 text-sm font-semibold mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                ref={emailRef}
                className="w-full px-3 shadow-md py-2 border rounded-md text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 bg-gray-100 dark:bg-[#2b2a33]"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-800 dark:text-gray-100 text-sm font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                ref={passwordRef}
                className="w-full px-3 py-2 shadow-md border rounded-md text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 bg-gray-100 dark:bg-[#2b2a33]"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirm-password"
                className="block text-gray-800 dark:text-gray-100 text-sm font-semibold mb-2"
              >
                Conferma password
              </label>
              <input
                type="password"
                id="confirm-password"
                ref={confirmPasswordRef}
                className="w-full px-3 py-2 shadow-md border rounded-md text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 bg-gray-100 dark:bg-[#2b2a33]"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-gray-800 dark:text-gray-100 text-sm font-semibold mb-2"
              >
                Nome
              </label>
              <input
                type="text"
                id="name"
                ref={nameRef}
                className="w-full px-3 py-2 shadow-md border rounded-md text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 bg-gray-100 dark:bg-[#2b2a33]"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="surname"
                className="block text-gray-800 dark:text-gray-100 text-sm font-semibold mb-2"
              >
                Cognome
              </label>
              <input
                type="text"
                id="surname"
                ref={surnameRef}
                className="w-full px-3 py-2 shadow-md border rounded-md text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 bg-gray-100 dark:bg-[#2b2a33]"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block text-gray-800 dark:text-gray-100 text-sm font-semibold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                ref={usernameRef}
                className="w-full px-3 py-2 shadow-md border rounded-md text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 bg-gray-100 dark:bg-[#2b2a33]"
              />
            </div>
            <button
              type="submit"
              onClick={startSignUp}
              className="w-full primary-button"
            >
              Sign Up
            </button>
            {error !== null ? (
              <p className="text-red-700 dark:text-red-500 text-center py-2">
                {error}
              </p>
            ) : loading ? (
              <div className="loader mx-auto my-4"></div>
            ) : null}

            <hr className="my-8" />
          </form>
          <div className="md:max-w-md max-w-sm sm:w-full w-11/12 px-6 py-8 bg-white dark:bg-gray-800 shadow-md rounded-md">
            <p className="text-center dark:text-white text-black">
              Hai gia un account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Accedi
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="absolute top-4 right-4">
        <button
          onClick={() => dispatch(setDarkMode(!darkMode))}
          className="bg-gray-200 dark:bg-gray-800 p-3 rounded-md focus:outline-none shadow-lg"
        >
          {darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
