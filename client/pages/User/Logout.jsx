import React, { useState, useEffect, useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { NavContext } from "../_app.js";

const Logout = () => {
  const router = useRouter();
  const { NavState, NavDispatch } = useContext(NavContext);
  useEffect(() => {
    NavDispatch({ type: "Nav", payload: "simple" });
    localStorage.removeItem("login");
    router.push("/");
  }, []);
};

export default Logout;
