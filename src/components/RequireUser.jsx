import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context";

export const RequireUser = ({ children }) => {
  const { user } = useGlobalContext();

  console.log(user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};
