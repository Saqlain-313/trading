import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getUser } from '../utils/adminSlice';
import Loader from '../Pages/Spinner';

const PrivateRoute = () => {
    const dispatch = useDispatch();
    const { userInfo, errorMessage, successMessage, loading } = useSelector(
        (state) => state.admin
      );
    const [ok, setOk] = useState(true);

    // Memoize the userInfo processing to avoid unnecessary computations
    const processedUserInfo = useMemo(() => {
        return userInfo ? userInfo : null;
    }, [userInfo]);

    useEffect(() => {
        if (!processedUserInfo) {
            dispatch(getUser());
        }
    }, [dispatch, processedUserInfo]);

    useEffect(() => {
        setOk(!!processedUserInfo);
    }, [processedUserInfo]);

    return ok ? <Outlet /> : <Loader />;
};

export default PrivateRoute;
