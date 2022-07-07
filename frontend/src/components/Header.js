import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/auth";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = (e) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };
  return (
    <div>
      <header className="header">
        <div className="logo">
          <Link to="/dashboard">GoalSetter</Link>
        </div>
        <ul>
          {user ? (
            <li>
              <button className="btn" onClick={logOut}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/">
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <FaUser /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </div>
  );
};

export default Header;
