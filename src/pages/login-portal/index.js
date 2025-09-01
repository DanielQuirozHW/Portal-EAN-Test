// ** React Imports
import { useState } from "react";

// ** Next Imports
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// ** MUI Components - Carga dinámica
const Button = dynamic(() => import("@mui/material/Button"));
const Checkbox = dynamic(() => import("@mui/material/Checkbox"));
const TextField = dynamic(() => import("@mui/material/TextField"));
const InputLabel = dynamic(() => import("@mui/material/InputLabel"));
const IconButton = dynamic(() => import("@mui/material/IconButton"));
const Box = dynamic(() => import("@mui/material/Box"));
const FormControl = dynamic(() => import("@mui/material/FormControl"));
const OutlinedInput = dynamic(() => import("@mui/material/OutlinedInput"));
const FormHelperText = dynamic(() => import("@mui/material/FormHelperText"));
const InputAdornment = dynamic(() => import("@mui/material/InputAdornment"));
const Typography = dynamic(() => import("@mui/material/Typography"));
const CircularProgress = dynamic(() => import("@mui/material/CircularProgress"));
const MuiFormControlLabel = dynamic(() => import("@mui/material/FormControlLabel"));

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

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  "& .MuiFormControlLabel-label": {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
  },
}));

const BlackTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#040404 !important",
    color: "#fff",
    "& input": {
      color: "#fff !important",
      backgroundColor: "transparent !important",
    },
    "& fieldset": {
      borderColor: "#3bac52",
    },
    "&:hover fieldset": {
      borderColor: "#3bac52",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3bac52",
    },
    "&.Mui-focused": {
      backgroundColor: "#040404 !important",
    },
    // Override any autofill styles
    "& input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px #040404 inset !important",
      WebkitTextFillColor: "#fff !important",
      backgroundColor: "#040404 !important",
    },
    "& input:-webkit-autofill:hover": {
      WebkitBoxShadow: "0 0 0 1000px #040404 inset !important",
      WebkitTextFillColor: "#fff !important",
    },
    "& input:-webkit-autofill:focus": {
      WebkitBoxShadow: "0 0 0 1000px #040404 inset !important",
      WebkitTextFillColor: "#fff !important",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#3bac52",
    "&.Mui-focused": {
      color: "#3bac52",
    },
  },
}))

// Custom styled OutlinedInput with black background
const BlackOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  backgroundColor: "#040404 !important",
  color: "#fff",
  "& input": {
    color: "#fff !important",
    backgroundColor: "transparent !important",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#3bac52",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#3bac52",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#3bac52",
  },
  "&.Mui-focused": {
    backgroundColor: "#040404 !important",
  },
  // Override any autofill styles
  "& input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 1000px #040404 inset !important",
    WebkitTextFillColor: "#fff !important",
    backgroundColor: "#040404 !important",
  },
  "& input:-webkit-autofill:hover": {
    WebkitBoxShadow: "0 0 0 1000px #040404 inset !important",
    WebkitTextFillColor: "#fff !important",
  },
  "& input:-webkit-autofill:focus": {
    WebkitBoxShadow: "0 0 0 1000px #040404 inset !important",
    WebkitTextFillColor: "#fff !important",
  },
}))

const FormControlLabelStyled = styled(FormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    color: '#ffffff',
    fontSize: '0.875rem',
  },
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
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // ** Hooks
  const auth = useAuth();
  const theme = useTheme();
  const { settings } = useSettings();
  const hidden = useMediaQuery(theme.breakpoints.down("md"));

  // ** Vars
  const { skin } = settings;

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const { email, password } = data;
    const recordar = rememberMe;
    setLoading(true); // Establece loading en true antes de la llamada a auth.login

    try {
      // Realiza la operación asincrónica (auth.login)
      await auth.login({ email, password, recordar });
      setLoading(false);
    } catch (error) {
      // En caso de error, también debes establecer loading en false
      setLoading(false);

      // Resto del manejo de errores
      if (error?.message === "No existe una cuenta con ese correo en nuestro sistema") {
        setError("email", {
          type: "manual",
          message: "No existe una cuenta con ese correo en nuestro sistema",
        });
      }
      if (
        (error?.code && error.code === "auth/user-not-found") ||
        error.code === "email is not defined" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-login-credentials"
      ) {
        setError("email", {
          type: "manual",
          message: "El correo electrónico o la contraseña no son válidos",
        });
      } else {
        console.error(error);
      }
    }
  };

  return (
    <Box className="content-right" sx={{ display: "flex" }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            width: '50%',
            position: 'relative',
            height: '100vh',
            overflow: 'hidden',
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
            // loading="lazy" //Para cuando es una imagen no prioritaria, de footer por ej
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          />
        </Box>
      ) : null}
      <RightWrapper sx={skin === "bordered" && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
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
              <TypographyStyled variant="h6" sx={{ color: theme.palette.mode === "dark" ? "#F5F5F5" : "#F5F5F5" }}>Bienvenido al {themeConfig.templateName}👋🏻</TypographyStyled>
                <Typography variant="body2" sx={{ color: theme.palette.mode === "dark" ? "#F5F5F5" : "#F5F5F5" }}>Te invitamos a iniciar sesión.</Typography>
            </Box>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <BlackTextField
                      autoFocus
                      label="Correo Electrónico"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      placeholder="user@email.com"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
                {errors.email && <FormHelperText sx={{ color: "error.main" }}>{errors.email.message}</FormHelperText>}
              </FormControl>

              {/* Password Field */}
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <FormControl fullWidth sx={{ mt: 4 }} variant="outlined">
                    <BlackOutlinedInput
                      id="auth-login-v2-password"
                      type={showPassword ? "text" : "password"}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      label="Contraseña"
                      placeholder="Ingrese su contraseña"
                      error={Boolean(errors.password)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                            sx={{ color: "#fff" }}
                          >
                            <Icon icon={showPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"} fontSize={20} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <InputLabel
                      htmlFor="auth-login-v2-password"
                      shrink
                      error={Boolean(errors.password)}
                      sx={{
                        color: "#3bac52",
                        position: "absolute",
                        top: "-7px",
                        fontSize: "0.975rem",
                        "&.Mui-focused": {
                          color: "#3bac52",
                        },
                      }}
                    >
                      Contraseña
                    </InputLabel>
                    {errors.password && (
                      <FormHelperText sx={{ color: "error.main" }}>{errors.password.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />

              <Box
                sx={{ mb: 4, display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "space-between" }}
              >
                <FormControlLabelStyled
                  label="Recuerdame"
                  control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}  
                  sx={{
                    color: '#3bac52',
                    '&.Mui-checked': {
                      color: '#3bac52',
                    }
                  }} 
                />}
                />
                <LinkStyled href="/olvidaste-contrasena" sx={{ color: '#3bac52' }}>Olvidaste la contraseña?</LinkStyled>
              </Box>
              <Box sx={{ mt: 3, mb: 2, position: "relative" }}>
                <Button fullWidth size="large" type="submit" variant="contained" 
                  sx={{ 
                    mb: 7, 
                    backgroundColor: '#3bac52',
                    '&:hover': {
                      backgroundColor: '#2e8d45' 
                    }
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
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  );
};
LoginPage.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default LoginPage;