import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "./Theme.css";
import CreateIncidence from "./pages/CreateIncidence";
import RecoverPassword from "./pages/RecoverPassword";
import Stadistics from "./pages/Stadistics";
import Dashboard from "./pages/Dashboard";
import MyIncidences from "./pages/MyIncidences";
import Historic from "./pages/Historic";
import Users from "./pages/Users";
import Unauthorized from "./pages/Unauthorized";
import { UserRole } from "./enums/userRole";
import IncidenceDetails from "./pages/IncidenceDetails";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import PrivateRoute from "./components/shared/PrivateRoute";

/**
 * Main application component that defines the routing structure.
 * Uses `PrivateRoute` to protect certain routes based on authentication and user roles.
 */
function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/recover-password" element={<RecoverPassword />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Redirect all unmatched routes to the dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />

      {/* Protected routes (requires authentication) */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/newincidence" element={<CreateIncidence />} />
      </Route>

      {/* Admin-only routes */}
      <Route element={<PrivateRoute roles={[UserRole.Administrator]} />}>
        <Route path="/users" element={<Users />} />
      </Route>

      {/* User routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/mis-incidencias" element={<MyIncidences />} />
      </Route>

      {/* Statistics page accessible to Admin only */}
      <Route element={<PrivateRoute roles={[UserRole.Administrator]} />}>
        <Route path="/stadistics" element={<Stadistics />} />
      </Route>

      {/* Technician and Admin-only routes */}
      <Route element={<PrivateRoute roles={[UserRole.Technician, UserRole.Administrator]} />}>
        <Route path="/historic" element={<Historic />} />
      </Route>

      {/* Incidence details route accessible to authenticated users */}
      <Route element={<PrivateRoute />}>
        <Route path="/incidence/:id" element={<IncidenceDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
