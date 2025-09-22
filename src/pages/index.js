// ** React Imports
import { useContext } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AuthContext } from "@/context/AuthContext";
import { useTheme } from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";

const Index = () => {
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const isMobileL = useMediaQuery("(max-width:425px)");

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        alt="Campus Background"
        src="/images/2.jpg"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: isMobileL ? "center left" : "left center",
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: theme.palette.mode === "dark" ? "#012821" : "#8c8a8aab",
          opacity: theme.palette.mode === "dark" ? 0.9 : 0.3,
          filter: theme.palette.mode === "dark" ? "opacity(0.4)" : "brightness(1) opacity(0.7)",
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: theme.palette.mode === "dark" ? "#fff" : (isMobileL ? "#171717dc" : "#FAFAFA"), mb: 4, textAlign: "center", fontWeight: 700 }}>
        
            <>
              TeachReady
            </>

          
        </Typography>
        <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
              maxWidth: "900px",
              mx: { xs: 2, sm: 50, lg: 50, xl: 60 },
              ml: { xl: 85 }
            }}
          >
        <Typography variant="subtitle" sx={{ color: theme.palette.mode === "dark" ? "#fff" : (isMobileL ? "#171717dc" : "#f2eeee"), mx: 25, textAlign: "center", fontWeight: '600', textShadow:
            theme.palette.mode === "light" && !isMobileL
              ? "5px 20px 45px rgba(0, 0, 0, 0.8)"
              : "none", // 👈 solo sombra si NO es mobile y está en modo claro
        }}>

            <>
              Te damos la bienvenida a nuestro portal de gestión profesoral. 
              Una plataforma donde podrás aportar a la calidad académica a partir de tu retroalimentación constructiva. 
            </>
        </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
