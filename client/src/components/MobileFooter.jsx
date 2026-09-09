import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import {
  FaChartArea,
  FaHistory,
  FaQuestionCircle,
  FaUser,
} from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { getUser, Logout } from "../Redux/Reducer/authReducer";
import Top from "./top";

export default function MobileFooter() {
  const [activeMenu, setActiveMenu] = useState(false);
  const [top, setTop] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems = [
    { id: "gallery", icon: FaChartArea, label: "Gallery", href: "/SideNavbar" },
    { id: "help", icon: FaQuestionCircle, label: "Help", href: "/support" },
    {
      id: "user",
      icon: FaUser,
      label: "Profile",
      href: "/Deposite?trading=Account",
    },
    {
      id: "trophy",
      icon: FaHistory,
      label: "History",
      href: "/Deposite?trading=Trades",
      notifications: 4,
    },
    // { id: "more", icon: FaWallet, label: "More", href: "/Deposite?trading=Withdrawal" },
  ];

  const handleLogout = () => {
    dispatch(Logout()).then((res) => {
      if (res?.payload?.success) {
        setActiveMenu(false);
        localStorage.removeItem("token");
        toast.success(res.payload.message);
        dispatch(getUser());
        window.location.reload();
        navigate("/");
      } else {
        toast.error(res.payload.message);
      }
    });
  };

  const handlenavigate = (path) => {
    setActiveMenu(false);
    navigate(path);
  };

  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E7D7AF] h-14 flex items-center justify-around px-2 z-50 lg:hidden shadow-[0_-3px_12px_rgba(126,92,20,0.10)]">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <>
              <span
                key={item.id}
                onClick={() => handlenavigate(item.href)}
                className="relative flex flex-col items-center justify-center cursor-pointer"
              >
                <Icon className="h-6 w-6 text-[#B8860B]" />
                <span className="sr-only">{item.label}</span>
              </span>
            </>
          );
        })}

        <span
          onClick={() => setActiveMenu(!activeMenu)}
          className="relative flex flex-col items-center justify-center cursor-pointer"
        >
          <BsThreeDots className="h-6 w-6 text-[#B8860B]" />
          <span className="sr-only">More</span>
        </span>
      </footer>

      <div
        className={`fixed bg-white z-20 top-0 h-[100vh] transform w-full ${
          activeMenu ? "translate-x-[0%]" : "-translate-x-[100%]"
        } transition-transform duration-300`}
      >
        <div className="flex flex-col h-[90vh] w-full">
          <h2 className="text-3xl font-semibold text-[#2F281D] p-4 border-b border-[#E7D7AF] bg-gradient-to-r from-white via-[#FFFDF8] to-[#FBF5E8]">
            More
          </h2>

          <div className="px-3 pt-3">
            <ul className="space-y-2">
              <li className="p-3 bg-[#FBF6E9] border border-[#E7D7AF] rounded-xl shadow-[0_2px_8px_rgba(126,92,20,0.06)]">
                <span
                  onClick={() => setTop(true)}
                  className="flex flex-col items-center justify-center font-semibold text-base gap-1 text-[#8A6514] cursor-pointer"
                >
                  Top
                </span>
              </li>

              <li className="p-3 bg-[#FBF6E9] border border-[#E7D7AF] rounded-xl shadow-[0_2px_8px_rgba(126,92,20,0.06)]">
                <Link
                  to="/Deposite?trading=Deposit"
                  onClick={() => setActiveMenu(false)}
                  className="flex flex-col items-center justify-center font-semibold text-base gap-1 text-[#8A6514]"
                >
                  Deposit
                </Link>
              </li>

              <li className="p-3 bg-[#FBF6E9] border border-[#E7D7AF] rounded-xl shadow-[0_2px_8px_rgba(126,92,20,0.06)]">
                <Link
                  to="/Deposite?trading=Withdrawal"
                  onClick={() => setActiveMenu(false)}
                  className="flex flex-col items-center justify-center font-semibold text-base gap-1 text-[#8A6514]"
                >
                  Withdrawal
                </Link>
              </li>

              <li className="p-3 bg-[#FBF6E9] border border-[#E7D7AF] rounded-xl shadow-[0_2px_8px_rgba(126,92,20,0.06)]">
                <Link
                  to="/Deposite?trading=Transactions"
                  onClick={() => setActiveMenu(false)}
                  className="flex flex-col items-center justify-center font-semibold text-base gap-1 text-[#8A6514]"
                >
                  Transactions
                </Link>
              </li>

              <li className="p-3 bg-[#FBF6E9] border border-[#E7D7AF] rounded-xl shadow-[0_2px_8px_rgba(126,92,20,0.06)]">
                <Link
                  to="/Deposite?trading=Trades"
                  onClick={() => setActiveMenu(false)}
                  className="flex flex-col items-center justify-center font-semibold text-base gap-1 text-[#8A6514]"
                >
                  Trades
                </Link>
              </li>

              <li className="p-3 bg-[#FBF6E9] border border-[#E7D7AF] rounded-xl shadow-[0_2px_8px_rgba(126,92,20,0.06)]">
                <Link
                  to="/Deposite?trading=Account"
                  onClick={() => setActiveMenu(false)}
                  className="flex flex-col items-center justify-center font-semibold text-base gap-1 text-[#8A6514]"
                >
                  Account
                </Link>
              </li>

              <li className="p-3 bg-[#FFF4F1] border border-[#F0D2CC] rounded-xl shadow-[0_2px_8px_rgba(120,55,45,0.05)]">
                <span
                  onClick={handleLogout}
                  className="flex flex-col items-center justify-center font-semibold text-base gap-1 text-[#D94B3F] cursor-pointer"
                >
                  Logout
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {top && (
        <div className="fixed top-0 w-full z-50">
          <div
            onClick={() => setTop(false)}
            className="cursor-pointer absolute right-3 top-4 text-[#8A6514] text-2xl w-9 h-9 rounded-full bg-[#FBF5E5] border border-[#E7D7AF] flex items-center justify-center shadow-sm"
          >
            <RxCross1 />
          </div>
          <Top />
        </div>
      )}
    </>
  );
}
