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
import { useEffect } from "react";
import useToggleAsset from "./store/assetStore";
import Footer from "./Components/Footer";
import Contact from "./Pages/Contact";

const App = () => {
  const location = useLocation();
  const userInfo = useUserInfo();

  const { resetasset } = useToggleAsset();
  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    if (!location.pathname.includes("/receipts")) {
      resetasset();
    }
  }, [location.pathname]);

  return (
    <div
      className={`${location.pathname !== "/login" && "pl-12"} flex flex-col min-h-screen`}
    >
      {!userInfo && (
        <FloatingNotification
          message={"Login to view statements"}
          duration={4000}
        />
      )}{" "}
      {!isLoginPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/particulars"
          element={
            <ProtectedRoute>
              <Particulars />
            </ProtectedRoute>
          }
        />

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
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {!isLoginPage && <Footer />}
    </div>
  );
};

export default App;
