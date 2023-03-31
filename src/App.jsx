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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Private */}
        <Route path="/dash" element={<DashLayout />}>
          <Route index element={<DashHome />} />
        </Route>
        {/* Dash end */}
      </Routes>
      <ToTop />
    </>
  );
}

export default App;
