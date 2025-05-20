import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import Dashboard from "./pages/dashboard";
import Contact from "./pages/Contact";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { isAuthenticated, logout } from "./services/authService";

// Navbar
const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" onClick={() => navigate("/dashboard")}>Inicio</Button>
        <Button color="inherit" onClick={() => navigate("/contact")}>Contacto</Button>
        <Button color="inherit" onClick={() => navigate("/users")}>Usuarios</Button>
        <Button color="inherit" onClick={onLogout}>Salir</Button>
      </Toolbar>
    </AppBar>
  );
};
// Rutas privadas autenticadas
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "white" }}>
      <Router>
        {isLoggedIn && <Navbar onLogout={() => { logout(); setIsLoggedIn(false); }} />}
        <Routes>
          <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/contact" element={<PrivateRoute element={<Contact />} />} />
          <Route path="/users" element={<PrivateRoute element={<Users />} />} />
          <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
