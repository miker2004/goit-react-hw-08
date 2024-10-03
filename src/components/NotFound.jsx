import { Box, Button, Typography } from "@mui/material";

const NotFound = () => {
  return(
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
        NOTHING FOUND :(
      </Typography>
      <Button
        variant="contained"
        color="primary"
      >
        GO BACK
      </Button>
    </Box>
  );
}

export default NotFound;