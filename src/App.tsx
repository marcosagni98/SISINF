import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Auth/Login';
import './App.css';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import NewUser from './components/User/NewUser';
import CreateIncidence from './components/Incidences/CreateIncidence';
import ConfigUsers from './components/User/ConfigUsers';
import Users from './components/User/ConfigUsers';
import MyIncidences from './components/Incidences/MyIncidences';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/newuser" element={<NewUser />} />
        <Route path="/newincidence" element={<CreateIncidence />} />
        <Route path="/users" element={<Users />} />
        <Route path="/mis-incidencias" element={<MyIncidences />} />
        </Routes>
    </Router>
  );
}

export default App;
