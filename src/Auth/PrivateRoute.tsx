import React from "react";
import { Route, Navigate } from "react-router-dom";
import { firebase } from "../../config";

interface PrivateRouteProps {
  element: React.ReactNode; // Specify the type explicitly
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
  const user = firebase.auth().currentUser; // Get the current user from Firebase

  return (
    <Route
      {...rest}
      element={user ? element : <Navigate to="/signin" />} // Redirect to signin if user is not authenticated
    />
  );
};

export default PrivateRoute;
