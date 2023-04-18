import { Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { ToastContainer } from "react-toastify";
import FullPageLayout from "./components/Layout/FullPageLayout/FullPageLayout";
import ToTop from "./components/misc/ToTop";
import DashLayout from "./components/Layout/Dash/DashLayout";
import PublicLayout from "./components/Layout/PublicLayout/PublicLayout";
import DashHome from "./pages/dash/dashHome/DashHome";
import PersistsLogin from "./components/auth/PersistsLogin";
import RequiredAuth from "./components/auth/RequiredAuth";

//lazy

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
      <Routes>
        {/* Public */}
        <Route element={<FullPageLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route path="" element={<PublicLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Private */}
        <Route element={<PersistsLogin />}>
          <Route element={<RequiredAuth />}>
            <Route path="user" element={<DashLayout />}>
              <Route path="home" element={<DashHome />} />
              <Route path="course" element={<></>} />
              <Route path="profile" element={<></>} />
            </Route>
          </Route>
        </Route>
        {/* Dash end */}
      </Routes>
      <ToTop />
    </>
  );
}

export default App;
