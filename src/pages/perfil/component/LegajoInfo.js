import { useContext, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Tooltip,
  IconButton,
  Divider,
  useTheme,
} from "@mui/material";
import Icon from "@/@core/components/icon";
/** yup **/
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

/**fields */
import CustomTextField from "@/@core/components/customFields/CustomTextField";
import CustomSearchSelect from "@/@core/components/customFields/CustomSearchSelect";
import { useSelector } from "react-redux";
import useActualizarLegajo from "@/hooks/useActualizarLegajo";

import { AuthContext } from "@/context/AuthContext";

const tipoDocumentoOpciones = [
  { value: 100000000, label: "D.N.I." },
  { value: 100000001, label: "L.C." },
  { value: 100000002, label: "L.E." },
  { value: 100000003, label: "D.E." },
  { value: 100000004, label: "Pasaporte" },
];
const estadoCivilOpciones = [
  { value: 100000000, label: "Casado" },
  { value: 100000001, label: "Soltero" },
  { value: 100000002, label: "Divorciado" },
  { value: 100000003, label: "Viudo" },
  { value: 100000004, label: "Concubinato" },
  { value: 100000005, label: "Separado" },
];

const validacionSchema = yup.object().shape({});

const LegajoInfo = ({ empleado, paises, provincias, localidades }) => {
  const { user } = useContext(AuthContext)
  const theme = useTheme();

  const actualizarLegajo = useActualizarLegajo();
  const estadoActualizacion = useSelector((store) => store.legajo.estadoActualizacion);

  const { handleSubmit, setValue, ...methods } = useForm({
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: {
      new_nombredepila: "",
      new_usuariocanvas: "",
      new_apellidos: "",
      new_numerolegajo: "",
      new_tipodocumento: {},
      numeroDocumento: 0,
      new_cuitcuil: 0,
      genero: {},
      email: "",
      estadoCivil: {},
      telefonoMovil: 0,
      telefonoParticular: 0,
      extencionTefefonica: 0,
      tipoContratacion: {},
      fechaNacimiento: "",
      paisNacimiento: {},
      edad: 0,
      provinciaNacimiento: {},
      calle: "",
      nroCalle: 0,
      piso: "",
      depto: "",
      localidad: {},
      codigoPostal: 0,
      provincia: {},
      pais: {},
    },
    resolver: yupResolver(validacionSchema),
  });

  useEffect(() => {
    if (empleado) {
      Object.keys(empleado).forEach((key) => {
        setValue(key, empleado[key]);
      });
    }
  }, [empleado, setValue]);

  const actualizarPerfil = (datos) => {
    actualizarLegajo(datos)
  };

  if (empleado) {
    return (
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} xs={12}>
          {/* <Card sx={{ mb: 4, p: 2, display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 2 }}>
            <Icon icon="mdi:information-slab-circle-outline" fontSize={25} color="#12889A" />
            <Typography variant="subtitle2" color="inherit">
              Visualizá tus datos personales cargados en la organización. Si deseas modificarlos, debes realizarlo desde la sección <strong>“Solicitudes”</strong>.
            </Typography>
          </Card> */}
          <Card>
            <CardContent>
              <FormProvider {...methods}>
                <Grid container sx={{ my: 3 }}>
                  <Grid item xs={12}>
                    <Typography variant="body1" sx={{ textTransform: "uppercase" }}>
                      Datos Generales
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      Component={TextField}
                      type="text"
                      name="new_apellidos"
                      label="Primer Apellido"
                      readOnly={true}
                      iconoClose={true}
                      sx={{  input: { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                        "& .MuiInputBase-input": { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                        "& .MuiInputLabel-root": { color: theme.palette.mode === "dark" ? "#fff" : "#222" }, 
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      Component={TextField}
                      type="text"
                      name="new_segundoapellido"
                      label="Segundo Apellido"
                      readOnly={true}
                      iconoClose={true}
                      sx={{  input: { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                        "& .MuiInputBase-input": { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                        "& .MuiInputLabel-root": { color: theme.palette.mode === "dark" ? "#fff" : "#222" }, 
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      Component={TextField}
                      type="text"
                      name="new_nombredepila"
                      label="Primer Nombre"
                      readOnly={true}
                      iconoClose={true}
                      sx={{  input: { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                        "& .MuiInputBase-input": { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                        "& .MuiInputLabel-root": { color: theme.palette.mode === "dark" ? "#fff" : "#222" }, 
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      Component={TextField}
                      type="text"
                      name="new_segundonombre"
                      label="Segundo Nombre"
                      readOnly={true}
                      iconoClose={true}
                      sx={{  input: { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                        "& .MuiInputBase-input": { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                        "& .MuiInputLabel-root": { color: theme.palette.mode === "dark" ? "#fff" : "#222" }, 
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      Component={TextField}
                      type="text"
                      name="new_id"
                      label="ID Estudiante"
                      readOnly={true}
                      iconoClose={true}
                      sx={{  input: { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                        "& .MuiInputBase-input": { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                        "& .MuiInputLabel-root": { color: theme.palette.mode === "dark" ? "#fff" : "#222" }, 
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      Component={TextField}
                      type="text"
                      label="Género"
                      name="new_genero"
                      readOnly={true}
                      iconoClose={true}
                      sx={{  input: { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                        "& .MuiInputBase-input": { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                        "& .MuiInputLabel-root": { color: theme.palette.mode === "dark" ? "#fff" : "#222" }, 
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      Component={TextField}
                      type="text"
                      label="Tipo de Documento"
                      name="new_tipodocumento"
                      readOnly={true}
                      iconoClose={true}
                      sx={{  input: { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                        "& .MuiInputBase-input": { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                        "& .MuiInputLabel-root": { color: theme.palette.mode === "dark" ? "#fff" : "#222" }, 
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      Component={TextField}
                      type="number"
                      label="Nro. Documento"
                      name="numeroDocumento"
                      readOnly={true}
                      iconoClose={true}
                      sx={{  input: { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                        "& .MuiInputBase-input": { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                        "& .MuiInputLabel-root": { color: theme.palette.mode === "dark" ? "#fff" : "#222" }, 
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" sx={{ textTransform: "uppercase" }}>
                      Datos de Contacto
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      Component={TextField}
                      type="text"
                      label="Correo Institucional"
                      name="email"
                      readOnly={true}
                      iconoClose={true}
                      sx={{  input: { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                        "& .MuiInputBase-input": { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                        "& .MuiInputLabel-root": { color: theme.palette.mode === "dark" ? "#fff" : "#222" }, 
                      }}
                    />
                  </Grid>
                </Grid>
              </FormProvider>
            </CardContent>
            {/* {
              user?.puesto == 'codocente' && 
                <CardActions>
                <Box sx={{ mt: 3, mb: 2, position: "relative" }}>
                  <Button
                    onClick={handleSubmit(actualizarPerfil)}
                    size="large"
                    type="submit"
                    sx={{ mr: 2 }}
                    variant="contained"
                    disabled={estadoActualizacion === "LOADING"}
                  >
                    Actualizar
                    {estadoActualizacion === "LOADING" && (
                      <CircularProgress
                        size={27}
                        sx={{
                          color: "#fff",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          marginTop: "-12px",
                          marginLeft: "-12px",
                        }}
                      />
                    )}
                  </Button>
                </Box>
              </CardActions>
            } */}
            
          </Card>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};
export default LegajoInfo;
