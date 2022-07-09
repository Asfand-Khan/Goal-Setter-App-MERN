import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalsSlice";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { goals, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.goals
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (isError) {
      toast.error("Invalid User");
    }

    if (isError) {
      toast.success("Goal Created");
    }

    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [navigate, user]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name.toUpperCase()}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className="content">
        {goals.map((goal) => (
          <GoalItem key={goal._id} goal={goal} />
        ))}
      </section>
    </>
  );
};

export default Dashboard;
