import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "./Theme.css";
import CreateIncidence from "./pages/CreateIncidence";
import RecoverPassword from "./pages/RecoverPassword";
import Statics from "./pages/Statics";
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

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/recover-password" element={<RecoverPassword />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/newincidence" element={<CreateIncidence />} />
      </Route>

      <Route element={<PrivateRoute roles={[UserRole.Administrator]}/>}>
        <Route path="/users" element={<Users />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/mis-incidencias" element={<MyIncidences />} />
      </Route>

      <Route element={<PrivateRoute roles={[UserRole.Administrator]}/>}>
        <Route path="/statics" element={<Statics />} />
      </Route>

      <Route element={<PrivateRoute roles={[UserRole.Technician, UserRole.Administrator]}/>}>
        <Route path="/historic" element={<Historic />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/incidence/:id" element={<IncidenceDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
