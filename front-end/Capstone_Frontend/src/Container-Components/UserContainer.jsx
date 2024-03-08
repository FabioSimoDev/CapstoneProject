import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserData } from "../Redux/actions/userDataActions";
import { useNavigate } from "react-router";

const UserContainer = () => {
  const token = useSelector((state) => state.auth.token);
  const userDataError = useSelector((state) => state.userData.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      dispatch(loadUserData(token));
    } else {
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (userDataError) {
      alert(userDataError);
      localStorage.removeItem("TOKEN");
      navigate("/login");
    }
  }, [userDataError, navigate]);

  return null;
};

export default UserContainer;
