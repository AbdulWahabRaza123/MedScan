import React, { useState, useEffect, useContext } from "react";
import { NavContext } from "../../_app";
const Dashboard = () => {
  const { NavState, NavDispatch } = useContext(NavContext);
  useEffect(() => {
    console.log("This is Nav which is opened", NavState);
  }, []);
  return <div>Dashboard</div>;
};

export default Dashboard;
