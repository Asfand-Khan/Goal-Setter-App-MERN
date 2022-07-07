import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const { user, isSuccess } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return user && isSuccess ? <div>Dashboard</div> : navigate("/login");
};

export default Dashboard;
