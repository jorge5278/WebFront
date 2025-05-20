import React, { useState, useEffect } from "react";
import { Container, Box, TextField, Button } from "@mui/material";

const Contact = () => {
  // Estados
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [storedEmail, setStoredEmail] = useState('');
  const [storedMessage, setStoredMessage] = useState('');

  // Guardar datos
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedMessage = localStorage.getItem("message");
    if (savedEmail && savedMessage) {
      setStoredEmail(savedEmail);
      setStoredMessage(savedMessage);
    }
  }, []);

  // Handle
  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("email", email);
    localStorage.setItem("message", message);
    setStoredEmail(email);
    setStoredMessage(message);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            padding: 4,
            textAlign: "center",
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
          }}
        >
          <h2 style={{ marginBottom: "16px", color: "black" }}>Contacto</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Correo electrónico"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Mensaje"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
              Guardar
            </Button>
          </form>
          {storedEmail && storedMessage && (
            <Box mt={2}>
              <h3>Guardado en memoria:</h3>
              <p style={{ color: "black" }}>Correo: {storedEmail}</p>
              <p style={{ color: "black" }}>Mensaje: {storedMessage}</p>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
