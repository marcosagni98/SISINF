import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import "./App.css";
import Register from "./components/Auth/Register";
import CreateIncidence from "./pages/CreateIncidence";
import RecoverPassword from "./pages/RecoverPassword";
import Statics from "./pages/Statics";
import ResolveIncidence from "./components/Incidences/ResolveIncidence";
import Dashboard from "./pages/Dashboard";
import MyIncidences from "./pages/MyIncidences";
import Historic from "./pages/Historic";
import Users from "./pages/Users";
import Unauthorized from "./pages/Unauthorized";
import PrivateRoute from "./components/shared/PrivateRoute";
import { UserRole } from "./enums/userRole";
import IncidenceDetails from "./pages/IncidenceDetails";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recover-password" element={<RecoverPassword />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

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

      <Route element={<PrivateRoute />}>
        <Route path="/statics" element={<Statics />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/historic" element={<Historic />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/resolveincidence" element={<ResolveIncidence />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/incidence/:id" element={<IncidenceDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
