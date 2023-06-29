import React, { ReactNode } from "react";
import { UserAuth } from "../AuthContext";
import { Navigate } from "react-router-dom";
import { User } from "firebase/auth";
import Loading from "./Loading";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = UserAuth();
  if (user === undefined) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoute;
