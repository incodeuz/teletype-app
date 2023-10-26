import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <header className="py-[15px] shadow">
        <Navbar />
      </header>

      <main className="w-full mx-auto max-w-[800px] mt-[50px]">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
