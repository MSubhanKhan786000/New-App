import "./App.css";
import Layout from "./components/layout";
import Home from "./pages/home";
import Detail from "./pages/detail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Earn from "./pages/earn";
import Contact from "./pages/contact";
import About from "./pages/about";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import Women from "./pages/women";
import Men from "./pages/men";
import Products from "./pages/products";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartTab from "./components/cartTab";
import { ToastContainer } from "react-toastify";
import RentDetail from "./pages/rentDetail";
import Profile from "./pages/profile";
import { UserContextProvider } from "./context/UserContext";
import NoAccess from "./pages/noAccess";
import Seller from "./pages/Seller/seller";
import PrivateRoutes from "./utils/privateRoutes";
import Header from "./components/header";
import { ThemeProvider } from "styled-components";


const queryClient = new QueryClient();
const theme = {
  colors: {
    heading: "rgb(24 24 29)",
    text: "rgb(24 24 29)",
    white: "#fff",
    black: " #212529",
    helper: "#8490ff",
    bg: "rgb(249 249 255)",
    footer_bg: "#0a1435",
    btn: "rgb(98 84 243)",
    border: "rgba(98, 84, 243, 0.5)",
    hr: "#ffffff",
    gradient:
      "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
    shadow:
      "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
    shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
  },
  media: { mobile: "768px", tab: "998px" },
};
function App() {
  return (
    <ThemeProvider theme={theme}>
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ToastContainer />
          <Header />
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />

            <Route
              path="/"
              element={
                <PrivateRoutes allowedRoles={["USER"]}>
                  <Home />
                </PrivateRoutes>
              }
            />
            <Route
              path="/detail/:id"
              element={
                <PrivateRoutes allowedRoles={["USER"]}>
                  <Detail />
                </PrivateRoutes>
              }
            />
            <Route
              path="/earn"
              element={
                <PrivateRoutes allowedRoles={["SELLER"]}>
                  <Earn />
                </PrivateRoutes>
              }
            />
            <Route
              path="/Contact"
              element={
                <PrivateRoutes allowedRoles={["USER","SELLER"]}>
                  <Contact />
                </PrivateRoutes>
              }
            />
            <Route
              path="/About"
              element={
                <PrivateRoutes allowedRoles={["USER","SELLER"]}>
                  <About />
                </PrivateRoutes>
              }
            />
            <Route
              path="/Women"
              element={
                <PrivateRoutes allowedRoles={["USER"]}>
                  <Women />
                </PrivateRoutes>
              }
            />
            <Route
              path="/Men"
              element={
                <PrivateRoutes allowedRoles={["USER"]}>
                  <Men />
                </PrivateRoutes>
              }
            />
            <Route
              path="/Products"
              element={
                <PrivateRoutes allowedRoles={["USER"]}>
                  <Products />
                </PrivateRoutes>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoutes allowedRoles={["USER"]}>
                  <CartTab />
                </PrivateRoutes>
              }
            />
            <Route
              path="/rentDetail/:id"
              element={
                <PrivateRoutes allowedRoles={["USER"]}>
                  <RentDetail />
                </PrivateRoutes>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoutes allowedRoles={["USER", "SELLER"]}>
                  <Profile />
                </PrivateRoutes>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoutes allowedRoles={["USER", "SELLER"]}>
                  <Seller />
                </PrivateRoutes>
              }
            />
            <Route path="/private" element={<PrivateRoutes />} />

            <Route path="/not-found" element={<NoAccess />} />
            
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </UserContextProvider>
</ThemeProvider>

  );
}

export default App;
