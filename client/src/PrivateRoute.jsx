import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import Spinner from "./components/Spinner";
import { getUser } from "./Redux/Reducer/authReducer";

const MAIN_LOGIN_URL =
  "https://lotterry.marinclub.site/login";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const redirecting = useRef(false);

  const {
    userInfo,
    loading,
    error,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    // Already authenticated
    if (userInfo) {
      return;
    }

    // Don't request repeatedly
    dispatch(getUser());
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (
      !loading &&
      !userInfo &&
      !redirecting.current
    ) {
      redirecting.current = true;

      console.log(
        "PROFILE AUTH FAILED:",
        error
      );

      window.location.replace(
        MAIN_LOGIN_URL
      );
    }
  }, [
    loading,
    userInfo,
    error,
  ]);

  if (loading || !userInfo) {
    return <Spinner />;
  }

  return <Outlet />;
};

export default PrivateRoute;