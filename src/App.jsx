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

const queryClient = new QueryClient();

function App() {
  return (
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
  );
}

export default App;
