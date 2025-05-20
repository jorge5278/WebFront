import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Container, Typography, Alert, Box } from "@mui/material";
import { login } from "../services/authService";
// Estados
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
// Envio formulario
  const handleSubmit = async () => {
    const result = await login(email, password);
    if (result.success) {
      setError("");
      onLogin();
      navigate("/dashboard"); 
    } else {
      setError(result.message);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Container maxWidth="xs" sx={{ mt: 4, backgroundColor: "white", padding: 3, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" align="center" sx={{ color: "black" }}>Login</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField label="Correo Electrónico" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Contraseña" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>Ingresar</Button>
        <Button variant="text" color="secondary" fullWidth sx={{ mt: 1 }} onClick={() => navigate("/register")}>
          ¿No tienes cuenta? Regístrate aquí
        </Button>
      </Container>
    </Box>
  );
};

export default Login;
