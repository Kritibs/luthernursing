import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

function RequireAuth({
  children,
  redirectTo,
  isAuthenticated,
  isLoading,
  is_admin,
}) {
  if (isLoading) {
    return <h2>Loading..</h2>;
  }
  if (isAuthenticated) {
    return children;
  } else return <Navigate to={redirectTo} />;
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  is_admin: state.auth.is_admin,
  isLoading: state.auth.isLoading,
});
export default connect(mapStateToProps)(RequireAuth);
