import { Activity, Gift, HomeIcon, Star, User, Wallet } from "lucide-react";
import { Link } from "react-router";

export default function MobileFooter() {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden perspective-1000">
        <div className="relative mx-auto max-w-full">
          <div className="relative h-[72px] bg-white/95 backdrop-blur-xl rounded-t-3xl border-t border-white/40 shadow-[0_-8px_40px_rgba(0,0,0,0.08)] transform-gpu translate-y-0 transition-all duration-700 [transform-style:preserve-3d]">
            {/* Grid Layout - 5 columns */}
            <div className="grid grid-cols-5 h-full w-full">
              {/* Home */}
              <Link
                to="/"
                className={`flex flex-col items-center justify-center text-[10px] transition-all duration-500 relative ${
                  location.pathname === "/"
                    ? "text-yellow-600"
                    : "text-gray-500 hover:text-yellow-600"
                } transform-gpu hover:scale-110 hover:-translate-y-2 hover:rotate-y-6 [transform-style:preserve-3d]`}
              >
                <HomeIcon
                  size={20}
                  strokeWidth={location.pathname === "/" ? 2.5 : 2}
                  className={`transition-all duration-500 ${
                    location.pathname === "/"
                      ? "text-yellow-600"
                      : "text-gray-500"
                  }`}
                />
                <span className="mt-0.5 font-bold text-[10px]">Home</span>
                {location.pathname === "/" && (
                  <div className="absolute top-[3.5rem] w-8 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg shadow-yellow-500/40 animate-pulse-slow"></div>
                )}
              </Link>

              {/* Activity */}
              <Link
                to="/activity"
                className={`flex flex-col items-center justify-center text-[10px] transition-all duration-500 relative ${
                  location.pathname === "/activity"
                    ? "text-yellow-600"
                    : "text-gray-500 hover:text-yellow-600"
                } transform-gpu hover:scale-110 hover:-translate-y-2 hover:rotate-y-6 [transform-style:preserve-3d]`}
              >
                <Activity
                  size={20}
                  strokeWidth={location.pathname === "/activity" ? 2.5 : 2}
                  className={`transition-all duration-500 ${
                    location.pathname === "/activity"
                      ? "text-yellow-600"
                      : "text-gray-500"
                  }`}
                />
                <span className="mt-0.5 font-bold text-[10px]">Activity</span>
                {location.pathname === "/activity" && (
                  <div className="absolute top-[3.5rem] w-8 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg shadow-yellow-500/40 animate-pulse-slow"></div>
                )}
              </Link>

              {/* Empty Space for Floating Button */}
              <div></div>

              {/* Wallet */}
              <Link
                to="/wallet"
                className={`flex flex-col items-center justify-center text-[10px] transition-all duration-500 relative ${
                  location.pathname === "/wallet"
                    ? "text-yellow-600"
                    : "text-gray-500 hover:text-yellow-600"
                } transform-gpu hover:scale-110 hover:-translate-y-2 hover:rotate-y-6 [transform-style:preserve-3d]`}
              >
                <Wallet
                  size={20}
                  strokeWidth={location.pathname === "/wallet" ? 2.5 : 2}
                  className={`transition-all duration-500 ${
                    location.pathname === "/wallet"
                      ? "text-yellow-600"
                      : "text-gray-500"
                  }`}
                />
                <span className="mt-0.5 font-bold text-[10px]">Wallet</span>
                {location.pathname === "/wallet" && (
                  <div className="absolute top-[3.5rem] w-8 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg shadow-yellow-500/40 animate-pulse-slow"></div>
                )}
              </Link>

              {/* Profile */}
              <Link
                to="/account"
                className={`flex flex-col items-center justify-center text-[10px] transition-all duration-500 relative ${
                  location.pathname === "/profile"
                    ? "text-yellow-600"
                    : "text-gray-500 hover:text-yellow-600"
                } transform-gpu hover:scale-110 hover:-translate-y-2 hover:rotate-y-6 [transform-style:preserve-3d]`}
              >
                <User
                  size={20}
                  strokeWidth={location.pathname === "/account" ? 2.5 : 2}
                  className={`transition-all duration-500 ${
                    location.pathname === "/account"
                      ? "text-yellow-600"
                      : "text-gray-500"
                  }`}
                />
                <span className="mt-0.5 font-bold text-[10px]">Account</span>
                {location.pathname === "/account" && (
                  <div className="absolute top-[3.5rem] w-8 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg shadow-yellow-500/40 animate-pulse-slow"></div>
                )}
              </Link>
            </div>

            {/* Floating Promo Button with 3D */}
            <Link
              to="/promo"
              className="absolute left-1/2 -translate-x-1/2 -top-7 group perspective-1000"
            >
              <div className="relative transform-gpu transition-all duration-700 hover:rotate-y-12 hover:scale-110 hover:-translate-y-2 [transform-style:preserve-3d]">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 blur-2xl opacity-30 group-hover:opacity-70 transition-all duration-700 animate-pulse-slow"></div>
                <div className="w-[78px] h-[78px] rounded-full bg-white shadow-2xl relative">
                  <div
                    className="w-full h-full rounded-full bg-gradient-to-b from-[#FFF19A] via-[#FFC928] to-[#D99200]
border border-[#FFD75A]
shadow-[inset_0_1px_2px_rgba(255,255,255,0.95),0_2px_7px_rgba(210,145,0,0.45)]"
                  >
                    <div
                      className="w-full h-full rounded-full bg-gradient-to-b from-[#FFF19A] via-[#FFC928] to-[#D99200]
border border-[#FFD75A]
shadow-[inset_0_1px_2px_rgba(255,255,255,0.95),0_2px_7px_rgba(210,145,0,0.45)] flex flex-col items-center justify-center group-hover:scale-105 transition-all duration-500"
                    >
                      <Gift
                        size={22}
                        className="text-black"
                        strokeWidth={2.3}
                      />
                      <span className="text-[9px] font-bold text-black leading-none mt-0.5">
                        Promo
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-pulse-slow">
                  <Star size={10} className="text-white" fill="white" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
