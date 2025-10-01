import { Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Receipts from "./Components/Receipts";
import ProtectedRoute from "./Components/ProtectedRoute";
import useUserInfo from "./CustomHooks/useUserInfo";
import Particulars from "./Pages/Particulars";
import FloatingNotification from "./Components/FloatingNotification";
import Dashboard from "./Pages/Dashboard";
import { useContext, useEffect } from "react";
import { AppContext } from "./Components/Context";

const App = () => {
  const location = useLocation();
  const userInfo = useUserInfo();

  const { setIsAsset } = useContext(AppContext);
  useEffect(() => {
    if (!location.pathname.includes("/receipts")) {
      setIsAsset(false);
    }
  }, [location.pathname]);

  return (
    <div className={`${location.pathname !== "/login" && "pl-12"}`}>
      {!userInfo && (
        <FloatingNotification
          message={"Login to view statements"}
          duration={4000}
        />
      )}{" "}
      {location.pathname !== "/login" && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/particulars" element={<Particulars />} />

        <Route
          path="/receipts"
          element={
            <ProtectedRoute>
              <Receipts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/receipts/:mrnumber"
          element={
            <ProtectedRoute>
              <Receipts />
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
