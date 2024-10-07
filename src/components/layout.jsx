import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import CartTab from "./cartTab";
import { useSelector } from "react-redux";

const Layout = () => {
  const statusTabCart = useSelector(store => store.cart.statusTab);
  return (
    <div>
      <Header />

      <main
        className={`
        ${statusTabCart === false ? "" : "-translate-x-56"}`}
      >
        <Outlet />
      </main>
      {/* <CartTab /> */}
    </div>
  );
};

export default Layout;
