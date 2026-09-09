import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Spinner from "./components/Spinner";
import { getUser } from "./Redux/Reducer/authReducer";

const MAIN_LOGIN_URL =
  "https://lotterry.marinclub.site/login";

const PrivateRoute = () => {
  const dispatch = useDispatch();

  const { userInfo, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!userInfo) {
      dispatch(getUser());
    }
  }, [dispatch, userInfo]);

  // Authentication check hone tak loader
  if (loading) {
    return <Spinner />;
  }

  // Subdomain par user nahi hai
  // → Main domain login par redirect
  if (!userInfo) {
    window.location.replace(MAIN_LOGIN_URL);
    return <Spinner />;
  }

  // User authenticated hai
  return <Outlet />;
};

export default PrivateRoute;
