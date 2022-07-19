import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import "../src/components/style/App.scss";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import ForgotPassword from "./components/pages/ForgotPassword";
import PaymentSuccess from "./components/pages/PaymentSuccess";
import PrivateRoute from "./components/Routes/PrivateRoute";
import SubDec from "./components/pages/Dashboard/Sub-Disc";
import Profile from "./components/pages/Dashboard/Profile";
import Challenges from "./components/pages/Dashboard/Challenges";
import SubmitChallenge from "./components/pages/Dashboard/Sub-Disc/SubmitChallenge";
import ResetPassword from "./components/pages/ResetPassword";
import PublicRoute from "./components/Routes/PublicRoute/indes";
import Logout from "./components/layout/Logout";
import SourceCode from "./components/pages/Dashboard/SourceCode";
import UserListingPage from "./components/pages/Admin/UserListing";
import AdminRoute from "./components/Routes/AdminRoute";

// scrol to top when change
const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return <></>;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Router  */}
        <Route path="/" element={<PublicRoute />}>
          <Route path="" element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/resetpass/:tokken" element={<ResetPassword />} />
        </Route>

        <Route
          path="/paymentSuccess/:paymentTokken"
          element={<PaymentSuccess />}
        />
        <Route path="/logout" element={<Logout />} />
        {/* Protected Routed  */}

        <Route path="/" element={<PrivateRoute />}>
          <Route path="home" element={<SourceCode />} />
          <Route
            path="challenges/practice"
            element={<Challenges type="practice" />}
          />
          <Route path="challenges/Cash" element={<Challenges type="cash" />} />
          <Route path="challenge/submit/:id" element={<SubmitChallenge />} />
          <Route path="sub-dic" element={<SubDec />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/admin" element={<AdminRoute />}>
          <Route path="" element={<UserListingPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
