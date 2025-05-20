import React, { useState } from "react";
import Footer from "../components/Footer";
import { Avatar, Container, Typography, Box, Button } from "@mui/material";
import userImage from "../components/1.jpg"; 
import bigImage from "../components/Graph.png"; 

const Dashboard = () => {
  const [count, setCount] = useState(0);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "white", display: "flex", flexDirection: "column", color: "black" }}>
      <Container>
        <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
          <Avatar alt="User Avatar" src={userImage} sx={{ width: 80, height: 80 }} />
          <Typography variant="h5" sx={{ mt: 2, color: "black" }}>Bienvenido a tu dashboard Raul</Typography>
        </Box>

        <ParagraphSection text="Esta es la página principal de la aplicación." />
        <CustomControl count={count} increment={() => setCount(count + 1)} />

        <Box mt={4} display="flex" justifyContent="center">
          <img src={bigImage} alt="Imagen grande" style={{ width: "100%", maxWidth: "800px", height: "auto", borderRadius: "8px" }} />
        </Box>

      </Container>
      <Footer />
    </Box>
  );
};

const ParagraphSection = ({ text }) => (
  <Box sx={{ p: 2 }}>
    <Typography sx={{ color: "black" }}>{text}</Typography>
  </Box>
);

const CustomControl = ({ count, increment }) => (
  <Box textAlign="center" sx={{ p: 2 }}>
    <Typography sx={{ color: "black" }}>Valor actual: {count}</Typography>
    <Button variant="contained" color="primary" onClick={increment} sx={{ mt: 2 }}>
      Incrementar
    </Button>
  </Box>
);

export default Dashboard;
