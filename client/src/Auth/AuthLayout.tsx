// import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <img
            src="/assets/logo.gif"
            alt="logo-sign"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          />
          <section className="flex flex-1 justify-center items-center flex-col">
            <Outlet />
          </section>
        </>
      )}
    </>
  );
};

export default AuthLayout;
