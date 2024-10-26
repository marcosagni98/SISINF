import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import './App.css';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import NewUser from './components/User/NewUser';
import CreateIncidence from './components/Incidences/CreateIncidence';
import Users from './components/User/ConfigUsers';
import RecoverPassword from './pages/RecoverPassword';
import MyIncidences from './components/Incidences/MyIncidences';
import Statics from './pages/Statics';
import HistoricIncidences from './components/Incidences/HistoricIncidences';
import Chat from './components/Chat/Chat';
import ResolveIncidence from './components/Incidences/ResolveIncidence';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/newuser" element={<NewUser />} />
        <Route path="/newincidence" element={<CreateIncidence />} />
        <Route path="/users" element={<Users />} />
        <Route path="/mis-incidencias" element={<MyIncidences />} />
        <Route path="/statics" element={<Statics />} />
        <Route path="/historic" element={<HistoricIncidences />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/resolveincidence" element={<ResolveIncidence />} />
        </Routes>
    </Router>
  );
}

export default App;

