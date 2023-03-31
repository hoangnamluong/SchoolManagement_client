import { Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { ToastContainer } from "react-toastify";
import FullPageLayout from "./components/Layout/FullPageLayout/FullPageLayout";
import { Container } from "react-bootstrap";
import Header from "./components/Layout/Header/Header";
import Footer from "./components/Layout/Footer/Footer";
import ToTop from "./components/misc/ToTop";

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
        <Route element={<FullPageLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<Header />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
      <Footer />
      <ToTop />
    </>
  );
}

export default App;
