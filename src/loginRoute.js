import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginRoute = ({ children, redirectPath = "/login" }) => {
  const user = useSelector((store) => store.chat.user)
  console.log(user)
  if (user !== null) {
    return children
  }
  return <Navigate to={redirectPath} replace />;
}

export default LoginRoute