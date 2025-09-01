
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../hooks/useAuth";
import { useSettings } from "../../@core/hooks/useSettings";
import themeConfig from "../../configs/themeConfig";
import BlankLayout from "../../@core/layouts/BlankLayout";
import WindowIcon from '@mui/icons-material/Window';
import { CircularProgress } from "@mui/material";

const Button = dynamic(() => import("@mui/material/Button"));
const Box = dynamic(() => import("@mui/material/Box"));
const Typography = dynamic(() => import("@mui/material/Typography"));

const RightWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    maxWidth: 450,
  },
}));

const BoxWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "#040404",
  [theme.breakpoints.down("xl")]: {
    width: "100%",
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: 400,
  },
}));

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down("md")]: { mt: theme.spacing(8) },
}));

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Ingresa una dirección de correo electrónico válida")
    .required("El campo de correo electrónico es requerido"),
  password: yup.string().min(5).required("El campo de contraseña es requerido"),
});

const defaultValues = {
  password: "",
  email: "",
};

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  // ** Hooks
  const auth = useAuth();
  const theme = useTheme();
  const { settings } = useSettings();
  const hidden = useMediaQuery(theme.breakpoints.down("md"));

  // ** Vars
  const { skin } = settings;

  const handleLoginSAML = async () => {
    setLoading(true);
    try {
      await auth.loginSAML();
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="content-right" sx={{ display: "flex" }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            width: "50%",
            position: "relative",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <Image
            src="/images/FondoPrincipal.jpg"
            alt="Fondo de pantalla"
            layout="fill"
            objectFit="cover"
            quality={50}
            priority
            objectPosition="left center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          />
        </Box>
      ) : null}

      <RightWrapper
        sx={skin === "bordered" && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}
      >
        <Box
          sx={{
            p: 10,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#040404",
          }}
        >
          <BoxWrapper>
            <Box sx={{ mb: 6 }}>
              <TypographyStyled
                variant="h6"
                sx={{ color: theme.palette.mode === "dark" ? "#F5F5F5" : "#F5F5F5" }}
              >
                Bienvenido al {themeConfig.templateName} 👋🏻
              </TypographyStyled>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.mode === "dark" ? "#F5F5F5" : "#F5F5F5" }}
              >
                Te invitamos a iniciar sesión con tu cuenta institucional.
              </Typography>
            </Box>

            <Box sx={{ mt: 3, mb: 2, position: "relative" }}>
              <Button
                fullWidth
                size="large"
                onClick={handleLoginSAML}
                variant="contained"
                sx={{
                  mb: 7,
                  backgroundColor: "#3bac52",
                  "&:hover": {
                    backgroundColor: "#2e8d45",
                  },
                }}
                disabled={loading}
              >
                Ingresar
              </Button>
              {loading && (
                <CircularProgress
                  size={30}
                  sx={{
                    color: "green",
                    position: "absolute",
                    top: "30%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Box>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  );
};
LoginPage.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default LoginPage;