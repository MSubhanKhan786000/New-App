// App.jsx
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
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';



const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} /> {/* Update the path to use ID */}
            <Route path="/Earn" element={<Earn />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/About" element={<About />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Women" element={<Women />} />
            <Route path="/Men" element={<Men />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/cart" element={<CartTab />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
