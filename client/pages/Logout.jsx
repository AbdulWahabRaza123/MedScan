import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { NavContext } from "../pages/_app";

const Logout = () => {
  const router = useRouter();
  const { NavState, NavDispatch } = useContext(NavContext);
  useEffect(() => {
    NavDispatch({ type: "Nav", payload: true });
    localStorage.removeItem("login");
    router.push("/");
  }, []);
};

export default Logout;
