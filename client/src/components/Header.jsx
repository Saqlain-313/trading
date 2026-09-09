import { LogIn, Menu, UserPlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../Redux/Reducer/authReducer";

const Header = () => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [activeAccount, setActiveAccount] = useState("demo");
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [Active, SetActive] = useState("");
  const menuButtonRef = useRef(null);
  const sidebarRef = useRef(null);

  const dropdownRef = useRef(null);

  // --------------------------------------------------
  // SAFE USER VALUES
  // --------------------------------------------------

  // const balance = Number(userInfo?.money ?? 0);

  // const formattedBalance = balance.toLocaleString("en-IN", {
  //   minimumFractionDigits: 2,
  //   maximumFractionDigits: 2,
  // });

  // const userEmail = userInfo?.email ?? "-";
  // const userId = userInfo?.userId ?? "-";
  // const currency = userInfo?.currency ?? "USD";

  // --------------------------------------------------
  // GET USER
  // --------------------------------------------------

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // --------------------------------------------------
  // ACTIVE / DEPOSIT STATUS
  // --------------------------------------------------

  // --------------------------------------------------
  // CLOSE DROPDOWN OUTSIDE CLICK
  // --------------------------------------------------

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  // --------------------------------------------------
  // TOKEN
  // --------------------------------------------------

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  // WINZOX Logo Component
  const WinzoxLogo = ({ className = "h-48" }) => (
    <img
      src="https://i.ibb.co/bRDCrgMB/4f0fb13d-8dd5-44fd-9bfa-d1e47e94d5a7.png"
      alt="WINZOX"
      className={`${className} object-contain w-auto`}
    />
  );

  // --------------------------------------------------
  // RETURN
  // --------------------------------------------------

  return (
    <div className="h-16 border-b border-white/40 bg-white/80 backdrop-blur-xl sticky top-0 z-40 shadow-lg shadow-gray-100/50 transform-gpu">
      <div className="h-full flex items-center px-4 sm:px-6">
        {/* Left - Menu Button & Logo */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            onClick={(e) => {
              e.stopPropagation();
              setIsSidebarOpen(!isSidebarOpen);
            }}
            className="md:hidden text-gray-700 hover:text-yellow-500 transition-all duration-500 p-2 -ml-2 hover:bg-gradient-to-r hover:from-yellow-50/60 hover:to-orange-50/60 rounded-2xl transform-gpu hover:scale-110 hover:rotate-y-6 [transform-style:preserve-3d]"
            aria-label="Toggle menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo - Always Left Aligned */}
          <Link
            to="/"
            className="flex items-center transform-gpu hover:scale-105 transition-all duration-500"
          >
            <WinzoxLogo className="h-12 md:h-10" />
          </Link>
        </div>

        {/* Center - Empty for spacing */}
        <div className="flex-1"></div>

        {/* Right - Login & Register Buttons */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              {/* Desktop Avatar/Name */}
              <Link
                to="/account"
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl text-black hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={getAvatar()}
                  alt={getUserDisplayName()}
                  className="w-7 h-7 rounded-full object-cover border-2 border-yellow-400 shadow-lg transform-gpu hover:scale-110 transition-all duration-300"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      getUserDisplayName(),
                    )}&background=FBBF24&color=fff&size=128`;
                  }}
                />
                <span className="text-sm font-bold">
                  {getUserDisplayName()}
                </span>
              </Link>

              {/* Mobile Avatar only */}
              <Link to="/account" className="md:hidden flex items-center">
                <img
                  src={getAvatar()}
                  alt={getUserDisplayName()}
                  className="w-8 h-8 rounded-full object-cover border-2 border-yellow-400 shadow-lg transform-gpu hover:scale-110 transition-all duration-300"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      getUserDisplayName(),
                    )}&background=FBBF24&color=fff&size=128`;
                  }}
                />
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border border-gray-400 text-black text-sm"
              >
                <LogIn size={16} />
                <span className="hidden sm:inline">LOGIN</span>
                <span className="sm:hidden">Login</span>
              </Link>
              <Link
                to="/register"
                className="flex ml-3 items-center gap-1.5 px-2 py-1.5 rounded-lg bg-gradient-to-b from-[#FFF19A] via-[#FFC928] to-[#D99200]
border border-[#FFD75A]
shadow-[inset_0_1px_2px_rgba(255,255,255,0.95),0_2px_7px_rgba(210,145,0,0.45)] text-black text-sm"
              >
                <UserPlus size={16} />
                <span className="hidden sm:inline">REGISTER</span>
                <span className="sm:hidden">Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
