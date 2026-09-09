import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Loader = ({ path = "" }) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();
    const { userInfo } = useSelector((state) => state.admin);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 500);

        if (userInfo) {
            // If user is authenticated, navigate to the specified path or home
            navigate(path || "/", {
                state: location.pathname,
            });
        } else if (count === 0) {
            // If count reaches 0 and no userInfo, redirect to login
            navigate("/login", {
                state: location.pathname,
            });
        }

        return () => clearInterval(interval);
    }, [count, navigate, location, path, userInfo]);

    return (
        <>
            {count !== 0 && (
                /* From Uiverse.io by clarencedion */ 
                <div className="flex items-center justify-center fixed h-full w-full bg-[#00000032]">
                    <div className="relative">
                        <div className="relative w-32 h-32">
                            <div
                                className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-[#22c55e] border-b-[#22c55e] animate-spin"
                                style={{ animationDuration: '3s' }}
                            ></div>
                            <div
                                className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-[#22c55e] animate-spin"
                                style={{ animationDuration: '2s', animationDirection: 'reverse' }}
                            ></div>
                        </div>
                        <div
                            className="absolute inset-0 bg-gradient-to-tr from-[#0ff]/10 via-transparent to-[#0ff]/5 animate-pulse rounded-full blur-sm"
                        ></div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Loader;