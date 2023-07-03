import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = UserAuth();
  if (user === undefined) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to={import.meta.env.BASE_URL + "auth"} />;
  }

  return children;
};

export default ProtectedRoute;
