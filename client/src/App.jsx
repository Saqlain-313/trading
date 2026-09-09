import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TradeChart from "./Pages/TradeChart";
import SideNavbar from "./Pages/SideNavbar";
import PasswordRecovery from "./Pages/PasswordRecovery";
import Withdraw from "./Pages/Withdraw";
import Deposite from "./Pages/Deposite";
import TradePair from "./components/TradePair";
import Home from "./Pages/Home";
import PrivateRoute from "./PrivateRoute";
import Header from "./components/Header";
import BonusPage from "./Pages/BouncePage";
import DepositPayment from "./Pages/DepositPayment";
import MobileFooter from "./components/MobileFooter";
import SupportModal from "./Pages/Support";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./Redux/Reducer/authReducer";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  const {
    userInfo,
    loading,
  } = useSelector((state) => state.auth);

  // Check logged-in user
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Router>
      <Header />

      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}

        <Route
          path="/"
          element={
            userInfo ? <TradeChart /> : <Home />
          }
        />

        <Route
          path="/PasswordRecovery"
          element={<PasswordRecovery />}
        />

        {/* ================= PRIVATE ROUTES ================= */}

        <Route element={<PrivateRoute />}>
          <Route
            path="/TradeChart"
            element={<TradeChart />}
          />

          <Route
            path="/SideNavbar"
            element={<TradeChart />}
          />

          <Route
            path="/Withdraw"
            element={<Withdraw />}
          />

          <Route
            path="/Deposite"
            element={<Deposite />}
          />

          <Route
            path="/TradePair"
            element={<TradePair />}
          />

          <Route
            path="/bounce-page"
            element={<BonusPage />}
          />

          <Route
            path="/deposit-payment"
            element={<DepositPayment />}
          />

          <Route
            path="/support"
            element={<SupportModal />}
          />
        </Route>
      </Routes>

      {/* Mobile footer only for logged-in users */}
      {userInfo && <MobileFooter />}

      <ToastContainer
        theme="dark"
        autoClose={1000}
      />
    </Router>
  );
}

export default App;



