import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home";
import Detail from "./pages/detail";
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
import NoAccess from "./pages/noAccess"; // Added
import Seller from "./pages/Seller/seller";
import PrivateRoutes from "./utils/privateRoutes";
import Header from "./components/header";
import Footer from "./components/Footer/footer";
import SellerProducts from "./pages/Seller/sellerProducts";
import SellerEarningsPage from "./pages/Seller/SellerEarningsPage";
import PrivacyPolicy from "./pages/privacyPolicy";
import Return from "./pages/return";
import Shipping from "./pages/shipping";
import Success from "./pages/success";
import Cancel from "./pages/cancel";
import { theme } from "./constants/theme";
import { ThemeProvider } from "@mui/material";
import ComingSoon from "./pages/coming";

const queryClient = new QueryClient();

function MainLayout() {
  const location = useLocation();

  const noFooterRoutes = ["/login", "/signup"];

  const currentPath = location.pathname.toLowerCase().replace(/\/$/, "");

  return (
    <>
      <ThemeProvider theme={theme}>
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
            path="/coming"
            element={
              <PrivateRoutes allowedRoles={["USER","SELLER"]}>
                <ComingSoon />
              </PrivateRoutes>
            }
          />
          <Route path="/Contact" element={
              <PrivateRoutes allowedRoles={["SELLER"]}>
                <Contact />
              </PrivateRoutes>
            } />
          <Route path="/About" element={<About />} />
          <Route
            path="/Women"
            element={
              <PrivateRoutes allowedRoles={["USER"]}>
                <Women />
              </PrivateRoutes>
            }
          />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
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
          <Route
            path="/sellerProducts"
            element={
              <PrivateRoutes allowedRoles={["SELLER"]}>
                <SellerProducts />
              </PrivateRoutes>
            }
          />
          <Route
            path="/sellerEarnings"
            element={
              <PrivateRoutes allowedRoles={["SELLER"]}>
                <SellerEarningsPage />
              </PrivateRoutes>
            }
          />
          <Route path="/private" element={<PrivateRoutes />} />
          <Route path="/not-found" element={<NoAccess />} />{" "}
          {/* Not Found Page */}
          <Route path="/policy" element={<PrivacyPolicy />} />
          <Route path="/return" element={<Return />} />
          <Route path="/shipping" element={<Shipping />} />
        </Routes>

        {!noFooterRoutes.includes(currentPath) && <Footer />}
      </ThemeProvider>
    </>
  );
}

function App() {
  return (
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ToastContainer />
          <MainLayout />
        </BrowserRouter>
      </QueryClientProvider>
    </UserContextProvider>
  );
}

export default App;
