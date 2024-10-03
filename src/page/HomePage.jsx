import { Typography, Box } from "@mui/material";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',   
        backgroundColor: 'white',  
        display: "flex",
        justifyContent: "center",  
        textWrap: "pretty",
        alignItems: "center",      
        flexDirection: "column",
        textAlign: "center",       
        padding: '20px',           
      }}
    >
      <Typography
        component="h1"
        variant="h3"
        sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)', marginBottom: 2 }}
      >
        WELCOME !!!
      </Typography>
      <Typography
        component="p"
        variant="body1"
        sx={{ fontSize: 'clamp(1rem, 5vw, 1.5rem)' }}
      >
        If you want to create your own phonebook, this is the perfect site for you! To use my awesome app, you must <NavLink to="/signin">sign up</NavLink>, or if you already have an account, use the Login option in the navigation bar.
      </Typography>
    </Box>
  );
};

export default HomePage;
