import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import './App.css';
import Register from './components/Auth/Register';
import CreateIncidence from './pages/CreateIncidence';
import RecoverPassword from './pages/RecoverPassword';
import Statics from './pages/Statics';
import Chat from './components/Chat/Chat';
import ResolveIncidence from './components/Incidences/ResolveIncidence';
import Dashboard from './pages/Dashboard';
import MyIncidences from './pages/MyIncidences';
import Historic from './pages/Historic';
import Users from './pages/Users';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/newincidence" element={<CreateIncidence />} />
        <Route path="/users" element={<Users />} />
        <Route path="/mis-incidencias" element={<MyIncidences />} />
        <Route path="/statics" element={<Statics />} />
        <Route path="/historic" element={<Historic />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/resolveincidence" element={<ResolveIncidence />} />
        </Routes>
    </Router>
  );
}

export default App;

