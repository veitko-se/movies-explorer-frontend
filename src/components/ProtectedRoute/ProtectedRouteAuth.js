import { Navigate } from "react-router-dom";

function ProtectedRouteAuth({ element: Component, ...props  }) {
  return (
    !props.isLoggedIn ? <Component {...props} /> : <Navigate to={-1} replace/>
  );
}

export default ProtectedRouteAuth;
