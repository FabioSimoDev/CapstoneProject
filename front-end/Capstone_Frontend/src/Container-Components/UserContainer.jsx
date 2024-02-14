import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserData } from "../Redux/actions/userDataActions";

const UserContainer = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(loadUserData(token));
    }
  }, [token]);

  return null;
};

export default UserContainer;
