import { AuthContext } from "./auth.context.ts";
import { Navigate, Outlet } from "react-router-dom";
import { getSession } from "../utils/session.ts";

export const PrivateRouteGuard = () => {
  const session = getSession();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return (
      <AuthContext.Provider value={session}>
        <Outlet />
      </AuthContext.Provider>
  )
}

export default PrivateRouteGuard;