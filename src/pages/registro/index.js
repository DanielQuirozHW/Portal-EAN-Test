// ** React Imports
import { useState } from "react";

// ** Next Import
import Link from "next/link";

// ** MUI Components
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import useMediaQuery from "@mui/material/useMediaQuery";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled, useTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";

// ** Icon Imports
import Icon from "../../@core/components/icon";

// ** Third Party Imports
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Hooks
import { useAuth } from "../../hooks/useAuth";
import { useSettings } from "../../@core/hooks/useSettings";

// ** Configs
import themeConfig from "../../configs/themeConfig";

// ** Layout Import
import BlankLayout from "../../@core/layouts/BlankLayout";
import { CircularProgress, FormHelperText } from "@mui/material";

// ** Styled Components
const styles = {
  background: {
    flex: 1,
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "url(/images/fondo_login.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover", // Utiliza 'cover' para que la imagen se ajuste al tamaño del Box
    width: "100%",
    height: "100vh", // Ajusta la altura al 100% de la altura de la ventana (viewport)
  },
};
const RegisterIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: "0 !important",
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(10),
  },
}));

const RegisterIllustration = styled("img")(({ theme }) => ({
  maxWidth: "30rem",
  [theme.breakpoints.down("lg")]: {
    maxWidth: "25rem",
  },
}));

const RightWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    maxWidth: 450,
  },
}));

const BoxWrapper = styled(Box)(({ theme }) => ({
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

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState(false);

  // ** Hooks
  const auth = useAuth();
  const theme = useTheme();
  const { settings } = useSettings();
  const hidden = useMediaQuery(theme.breakpoints.down("md"));

  // ** Vars
  const { skin } = settings;

  const defaultValues = {
    email: "",
    password: "",
    repassword: "",
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Ingresa una dirección de correo electrónico válida")
      .required("El campo de correo electrónico es requerido"),
    password: yup
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
      .matches(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
      .matches(/\d/, "La contraseña debe contener al menos un número")
      .matches(/\W/, "La contraseña debe contener al menos un carácter especial")
      .max(15, "La contraseña no puede superar los 15 caracteres")
      .required("La contraseña es requerida"),
    repassword: yup
      .string()
      .required("Repetir contraseña es requerida")
      .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir"),
  });
  
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors, touched },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const [loading, setloading] = useState(false);

  const onSubmit = async (data) => {
    const { email, password } = data;
    setloading(true);
    let errorMessage = "";
    try {
      // Llama a la función de registro en el contexto de autenticación
      await auth.register({ email, password });
      setloading(false);
    } catch (error) {
      setloading(false);

      // Maneja errores de Firebase Auth aquí
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "El correo electrónico ya está en uso por otra cuenta.";
          break;
        case "auth/invalid-email":
          errorMessage = "La dirección de correo electrónico proporcionada no es válida.";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "La operación de registro no está permitida.";
          break;
        case "auth/weak-password":
          errorMessage = "La contraseña proporcionada es demasiado débil.";
          break;
        case "auth/network-request-failed":
          errorMessage = "Hubo un problema de red al registrar la cuenta.";
          break;
        case "auth/app-deleted":
          errorMessage = "La instancia de la aplicación Firebase ha sido eliminada.";
          break;
        case "auth/app-not-authorized":
          errorMessage = "La aplicación no está autorizada para acceder a Firebase.";
          break;
        case "auth/argument-error":
          errorMessage = "Error de argumento al registrar la cuenta.";
          break;
        case "auth/internal-error":
          errorMessage = "Error interno al registrar la cuenta.";
          break;
        case "auth/missing-iframe-start":
          errorMessage = "Falta el iframe de inicio al registrar la cuenta.";
          break;
        default:
          // Puedes agregar más casos según sea necesario para otros códigos de error
          break;
      }

      setError("email", {
        type: "manual",
        message: errorMessage,
      });
    }
  };

  return (
    <Box className="content-right">
      {!hidden ? <Box sx={styles.background}>{/* Tu contenido aquí */}</Box> : null}
      <RightWrapper sx={skin === "bordered" && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
        <Box
          sx={{
            p: 12,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "background.paper",
          }}
        >
          <BoxWrapper>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: "flex",
                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></Box>
            <Box sx={{ mb: 6 }}>
              <TypographyStyled variant="h5">Regístrate y descubre 🚀</TypographyStyled>
              <Typography variant="body2">Forma parte de nuestra comunidad en solo unos pasos!</Typography>
            </Box>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      type="email"
                      label="Correo electrónico"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      placeholder="Correo electrónico"
                    />
                  )}
                />
                {errors.email && <FormHelperText sx={{ color: "error.main" }}>{errors.email.message}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor="auth-login-v2-password" error={Boolean(errors.password)}>
                  Contraseña
                </InputLabel>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      onBlur={onBlur}
                      label="Password"
                      onChange={onChange}
                      id="auth-login-v2-password"
                      error={Boolean(errors.password)}
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon icon={showPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"} fontSize={20} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: "error.main" }} id="">
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="auth-login-v2-repassword" error={Boolean(errors.repassword)}>
                  Repetir Contraseña
                </InputLabel>
                <Controller
                  name="repassword"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      onBlur={onBlur}
                      label="Repetir Contraseña"
                      onChange={onChange}
                      id="auth-login-v2-repassword"
                      error={Boolean(errors.repassword)}
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon icon={showPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"} fontSize={20} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.repassword && (
                  <FormHelperText sx={{ color: "error.main" }} id="">
                    {errors.repassword.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Box
                sx={{
                  mb: 4,
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  mt: 7,
                }}
              >
                <Box sx={{ mt: 3, mb: 2, position: "relative" }}>
                  <Button fullWidth size="large" type="submit" variant="contained" sx={{ mb: 7 }} disabled={loading}>
                    Registrar
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
                <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
                  <Typography variant="body2" sx={{ mr: 2 }}>
                    Ya tienes una cuenta?
                  </Typography>
                  <Typography variant="body2">
                    <LinkStyled href="/login">Inicia Sesión</LinkStyled>
                  </Typography>
                </Box>
              </Box>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  );
};
Register.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default Register;
