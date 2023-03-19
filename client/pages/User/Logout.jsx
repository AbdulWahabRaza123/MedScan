import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { NavContext } from "../_app.js";
import Loading from "../../Components/Loading.jsx";
const Logout = () => {
  const router = useRouter();
  const { NavState, NavDispatch } = useContext(NavContext);
  const [mount,setMount]=useState(false);
  const adminUser = async () => {
    const res = await fetch("/UserLogout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (data.message === "done") {
      return true;
    } else {
     return false;
    }
  };
  useEffect(() => {
    async function verifyUser() {
      const temp=adminUser();
      if(temp){
        NavDispatch({ type: "Nav", payload: "simple" });
        localStorage.removeItem("login");
        setMount(true);
        router.push("/");
        }
        else{
          router.push("/User");
      }
    }
    verifyUser();
  
  }, [mount]);
  return mount?(<></>):<><Loading/></>
};

export default Logout;
