import { AuthContext } from "@/context/AuthContext"
import { useDispatch } from "react-redux"
import { useState, useContext, useEffect } from "react"
import {
  Box,
  Dialog,
  DialogContent,
  Grid,
  Button,
  TextField,
  Typography,
  ListItem,
  DialogActions,
  List,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  ToggleButtonGroup, 
  ToggleButton 
} from "@mui/material";
import CustomTextField from "@/@core/components/customFields/CustomTextField";
import { actualizarEvaluacion, evaluacionesPend, misEvaluacionesCompletadasVencidas } from '@/redux/evaluaciones'
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import CustomSearchSelect from "@/@core/components/customFields/CustomSearchSelect";
import { useTheme } from "@emotion/react";

const conjuntoDeOpciones = [
  { value: 100000004, label: "Muy deficiente" },
  { value: 100000003, label: "Deficiente" },
  { value: 100000002, label: "Regular" },
  { value: 100000001, label: "Bueno" },
  { value: 100000000, label: "Excelente" }
]

const ModalEvaluaciones = ({ open, handleClose, data, evaluacionPendiente, itemsEvaluacion, idEvaluacion, loadingEvaluacion }) => {
  const dispatch = useDispatch();
  const { token, user } = useContext(AuthContext);
  const [fullWidth] = useState(true);
  const [maxWidth] = useState('lg');
  const theme = useTheme();

  const evaluacionData = Array.isArray(evaluacionPendiente) ? evaluacionPendiente[0] : evaluacionPendiente;
  const { id, _new_evaluado_value, new_tipodeevaluacion, _new_periodo_value, _new_materia_value, _new_evaluador_value, new_evaluador, new_name } = evaluacionData || {};

  const [items, setItems] = useState([]);
  const [respuestas, setRespuestas] = useState([]);
  const [preguntasAgrupadas, setPreguntasAgrupadas] = useState([]);
  const [errores, setErrores] = useState(new Set())

  const fechaHoy = new Date().toISOString().slice(0, 10); // '2025-07-10'

  useEffect(() => {
    if (itemsEvaluacion.length > 0) {
      const mappedItems = itemsEvaluacion.map(item => ({
        new_preguntadelaevaluacionid: item.new_preguntadelaevaluacionid,
        new_textodelapregunta: item.new_textodelapregunta,
        new_areadecompetencia: item["_new_areadecompetencia_value@OData.Community.Display.V1.FormattedValue"], //dimension
        _new_areadecompetencia_value: item._new_areadecompetencia_value, 
        new_descripcion: item['ac.new_descripcion'], // explicacion
        idCriterio: item['ab.new_competencias'],
        criterio: item['ab.new_competencias@OData.Community.Display.V1.FormattedValue'], //criterio
        tipoRespuesta: item['ab.new_tipoderespuesta'],
        orden: item.new_orden
      }));
      setItems(mappedItems);
    } else {
      setItems([]);
    }
  }, [itemsEvaluacion]);
  
  useEffect(() => {
    if (items.length > 0) {
      const agrupadas = items.reduce((acc, item) => {
        const key = item.idCriterio;
        const existente = acc.find(g => g.idCriterio === key);
        if (existente) {
          existente.preguntas.push(item);
        } else {
          acc.push({
            idCriterio: item.idCriterio,
            criterio: item.criterio,
            new_descripcion: item.new_descripcion,
            orden: item.orden,
            preguntas: [item],
          });
        }
        return acc;
      }, []);
      setPreguntasAgrupadas(agrupadas);
    }
  }, [items]);

  const handleOptionChange = (id, value) => {
    const valorNumerico = value === "si" ? 100000000 : 100000001
    const updated = [...respuestas]
    const index = updated.findIndex((r) => r.new_preguntadelaevaluacionid === id)

    const base = {
      new_preguntadelaevaluacionid: id,
      new_respuestabool: valorNumerico,
      new_respuesta: null,
      new_respuestatexto: null,
      new_feedbackrespuesta: "",
    }

    if (index !== -1) {
      updated[index] = { ...updated[index], ...base }
    } else {
      updated.push(base)
    }

    setRespuestas(updated)

    setErrores((prev) => {
      const nuevo = new Set(prev)
      nuevo.delete(id)
      return nuevo
    })
  }

  const handleJustificacionChange = (id, text) => {
    const updated = respuestas.map((r) =>
      r.new_preguntadelaevaluacionid === id ? { ...r, new_feedbackrespuesta: text } : r,
    )
    setRespuestas(updated)

    if (text?.trim()) {
      setErrores((prev) => {
        const nuevo = new Set(prev)
        nuevo.delete(id)
        return nuevo
      })
    }
  }

  const handleRespuestaTipo1 = (id, selectedOption) => {
    if (!selectedOption || !selectedOption.value) return;

    const updated = [...respuestas];
    const index = updated.findIndex(r => r.new_preguntadelaevaluacionid === id);

    const base = {
      new_preguntadelaevaluacionid: id,
      new_respuestabool: null,
      new_respuesta: selectedOption.value, // ← usamos .value del objeto
      new_respuestatexto: null,
      new_feedbackrespuesta: ""
    };

    if (index !== -1) {
      updated[index] = { ...updated[index], ...base };
    } else {
      updated.push(base);
    }

    setRespuestas(updated);

    setErrores(prev => {
      const nuevo = new Set(prev);
      nuevo.delete(id);
      return nuevo;
    });
  };

  const handleRespuestaTipo2 = (id, text) => {
    const updated = [...respuestas];
    const index = updated.findIndex(r => r.new_preguntadelaevaluacionid === id);
   
    const base = {
      new_preguntadelaevaluacionid: id,
      new_respuestabool: null,
      new_respuesta: null,
      new_respuestatexto: text,
      new_feedbackrespuesta: ""
    };

    if (index !== -1) {
      updated[index] = { ...updated[index], ...base };
    } else {
      updated.push(base);
    }

    setRespuestas(updated);

    if (text?.trim()) {
      setErrores(prev => {
        const nuevo = new Set(prev);
        nuevo.delete(id);
        return nuevo;
      });
    }
  };

  const handleEnviar = () => {
    const erroresDetectados = new Set()

    if (respuestas.length < items.length) {
      items.forEach((item) => {
        const r = respuestas.find((res) => res.new_preguntadelaevaluacionid === item.new_preguntadelaevaluacionid)
        if (!r) erroresDetectados.add(item.new_preguntadelaevaluacionid)
      })
    }

    respuestas.forEach((r) => {
      const esNo = r.new_respuestabool === 100000001
      const justificacionVacia = !r.new_feedbackrespuesta?.trim()

      if (esNo && justificacionVacia) {
        erroresDetectados.add(r.new_preguntadelaevaluacionid)
      }
    })

    if (erroresDetectados.size > 0) {
      setErrores(erroresDetectados)

      const hasUnanswered = respuestas.length < items.length
      const hasNoWithoutJustification = Array.from(erroresDetectados).some((id) => {
        const respuesta = respuestas.find((r) => r.new_preguntadelaevaluacionid === id)
        return respuesta?.new_respuestabool === 100000001
      })

      if (hasUnanswered) {
        toast.error("Por favor, responda todas las preguntas antes de enviar.")
      } else if (hasNoWithoutJustification) {
        toast.error("Por favor, justifique todas las respuestas marcadas como 'No'.")
      }
      return
    }

    dispatch(actualizarEvaluacion(token, idEvaluacion, respuestas))
      .then(() => {
        handleClose()
        if (token && user) {
          dispatch(evaluacionesPend(token, fechaHoy, user.empleadoid))
          dispatch(misEvaluacionesCompletadasVencidas(token, fechaHoy, user.empleadoid))
        }
      })
      .catch((e) => {
        toast.error("Error al enviar la evaluación")
      })
  }


  const { setValue, ...methods } = useForm({
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: {
      new_name: null,
      new_evaluador: null,
      _new_periodo_value: null,
      new_tipodeevaluacion: null,
      _new_materia_value: null,
    },
  });

  useEffect(() => {
    if (data) {
      Object.keys(data).forEach((key) => {
        if (key === "new_ciclo" && data[key]?.label) {
          setValue(key, data[key].label); // solo el label, como string
        } else {
          setValue(key, data[key]);
        }
      });
    }
  }, [data, setValue]);

  return (
    <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open} onClose={handleClose}>
      <DialogContent>
        <FormProvider {...methods}>
          <Grid container spacing={2}>
            <Grid item xs={6}><CustomTextField Component={TextField} name="new_evaluador" label="Estudiante" readOnly 
              sx={{  input: { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                      "& .MuiInputBase-input": { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                      "& .MuiInputLabel-root": { color: theme.palette.mode === "dark" ? "#fff" : "#222" }, 
                }}
            /></Grid>
            <Grid item xs={3}><CustomTextField Component={TextField} name="new_anio" label="Año" readOnly 
              sx={{  input: { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                      "& .MuiInputBase-input": { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                      "& .MuiInputLabel-root": { color: theme.palette.mode === "dark" ? "#fff" : "#222" }, 
                }}
            /></Grid>
            <Grid item xs={3}><CustomTextField Component={TextField} name="new_ciclo" label="Ciclo" readOnly 
              sx={{  input: { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                      "& .MuiInputBase-input": { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                      "& .MuiInputLabel-root": { color: theme.palette.mode === "dark" ? "#fff" : "#222" }, 
                }}
            /></Grid>
            <Grid item xs={6}><CustomTextField Component={TextField} name="_new_evaluado_value" label="Profesor(a) a Evaluar" readOnly 
              sx={{  input: { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                      "& .MuiInputBase-input": { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                      "& .MuiInputLabel-root": { color: theme.palette.mode === "dark" ? "#fff" : "#222" }, 
                }}
            /></Grid>
            <Grid item xs={6}><CustomTextField Component={TextField} name="new_tipodeevaluacion" label="Tipo de Evaluación" readOnly 
              sx={{  input: { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                      "& .MuiInputBase-input": { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                      "& .MuiInputLabel-root": { color: theme.palette.mode === "dark" ? "#fff" : "#222" }, 
                }}
            /></Grid>
            <Grid item xs={6}><CustomTextField Component={TextField} name="_new_materia_value" label="Unidad Académica" readOnly 
              sx={{  input: { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                      "& .MuiInputBase-input": { color: theme.palette.mode === "dark" ? "#fff" : "#222" },
                      "& .MuiInputLabel-root": { color: theme.palette.mode === "dark" ? "#fff" : "#222" }, 
                }}
            /></Grid>

            <Grid item xs={12}>
              <Box sx={{ mt: 2, ml: 4 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, mb: 2 }}>
                  Encuesta de Evaluación Profesoral: Tu Opinión Cuenta
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Tu participación es fundamental para elevar la calidad educativa. 
                  Te invitamos a evaluar al profesor o profesora que impartió la unidad de estudio. Tu retroalimentación es crucial para identificar fortalezas y áreas de mejora, contribuyendo así a la excelencia académica. 
                  Agradecemos tu colaboración y honestidad en la evaluación.
                </Typography>
              </Box>
              <List>
                {loadingEvaluacion &&
                  preguntasAgrupadas.map((grupo) => (
                    <Box key={grupo.idCriterio} sx={{ my: 4, ml: 4 }}>
                      <Typography variant="h6" fontWeight="bold">
                        {grupo?.criterio}
                      </Typography>
                      <Typography variant="body2" sx={{ my: 3, color: theme.palette.mode === "dark" ? "#fff" : "#615f5f" }}>
                        {grupo?.new_descripcion}
                      </Typography>

                      {grupo?.preguntas?.map((item) => {
                        const respuestaActual =
                          respuestas.find(
                            (r) => r.new_preguntadelaevaluacionid === item.new_preguntadelaevaluacionid,
                          ) || {}
                        const tieneError = errores.has(item.new_preguntadelaevaluacionid)
                        const esNo = respuestaActual.new_respuestabool === 100000001
                        const esSi = respuestaActual.new_respuestabool === 100000000

                        return (
                          <Box key={item.new_preguntadelaevaluacionid} sx={{ mb: 10 }}>
                            <Typography variant="body1" gutterBottom>
                              {item?.orden}. {item?.new_textodelapregunta}
                            </Typography>

                            {/* 3 */}
                            {item?.tipoRespuesta === 3 && (
                              <>
                                <ToggleButtonGroup
                                  exclusive
                                  value={esSi ? "si" : esNo ? "no" : null}
                                  onChange={(e, newValue) => {
                                    if (newValue !== null) {
                                      handleOptionChange(item.new_preguntadelaevaluacionid, newValue)
                                    }
                                  }}
                                  sx={{ mt: 1, ml: 5,  borderColor: theme.palette.mode === "dark" ? "#fff" : "#a5a5a5", }}
                                >
                                  <ToggleButton
                                    value="si"
                                    sx={{
                                      border: tieneError && !esSi && !esNo ? "2px solid #f44336" : "1px solid #a5a5a5",
                                      color: theme.palette.mode === "dark" ? "#fff" : "#222",
                                      "&.Mui-selected": {
                                        backgroundColor: "#318ae410",
                                        color: "#318AE4"
                                      }
                                    }}
                                  >
                                    Sí
                                  </ToggleButton>
                                  <ToggleButton
                                    value="no"
                                    sx={{
                                      border: tieneError && !esSi && !esNo ? "2px solid #f44336" : "1px solid #a5a5a5",
                                      color: theme.palette.mode === "dark" ? "#fff" : "#222",
                                      "&.Mui-selected": {
                                        backgroundColor: "#318ae410",
                                        color: "#318AE4"
                                      }
                                    }}
                                  >
                                    No
                                  </ToggleButton>
                                </ToggleButtonGroup>

                                {/* No */}
                                {(esSi || esNo) && (
                                  <TextField
                                    fullWidth
                                    label={
                                      esSi ? "Motivo o Comentarios" : "¿Cuál es la razón detrás de tu respuesta?"
                                    }
                                    value={respuestaActual.new_feedbackrespuesta || ""}
                                    onChange={(e) =>
                                      handleJustificacionChange(item.new_preguntadelaevaluacionid, e.target.value)
                                    }
                                    variant="standard"
                                    multiline
                                    // required={esNo}
                                    error={esNo && tieneError}
                                    helperText={
                                      esNo && tieneError
                                        ? 'La justificación es obligatoria cuando selecciona "No"'
                                        : esNo
                                          ? "Campo obligatorio"
                                          : ""
                                    }
                                     sx={{
                                      mt: 2,
                                      ml: 5,
                                      "& .MuiInputLabel-root": {
                                        color: (esNo && !respuestaActual.new_feedbackrespuesta?.trim()) || tieneError  ? "#f44336" : undefined,
                                      },
                                      "& .MuiInputBase-root:before": {
                                        borderBottom: (esNo && !respuestaActual.new_feedbackrespuesta?.trim()) || tieneError ? "2px solid #f44336 !important" : undefined,
                                      },
                                      "& .MuiInputBase-root:after": {
                                        borderBottom: (esNo && !respuestaActual.new_feedbackrespuesta?.trim()) || tieneError ? "2px solid #f44336 !important" : undefined,
                                      },
                                      "& label.Mui-focused": {
                                        color: (esNo && !respuestaActual.new_feedbackrespuesta?.trim()) || tieneError ? "#f44336" : theme.palette.mode === "dark" ? "#fff" : "#222",
                                      }
                                    }}
                                  />
                                )}
                              </>
                            )}

                            {/*  1 */}
                            {item?.tipoRespuesta === 1 && (
                              <Grid item xs={6} sx={{ ml: 5 }}>
                                <FormControl fullWidth error={tieneError}>
                                  <InputLabel>Respuesta</InputLabel>
                                  <Select
                                    label="Respuesta"
                                    value={respuestaActual?.new_respuesta ?? ""}
                                    onChange={(e) => {
                                      handleRespuestaTipo1(item.new_preguntadelaevaluacionid, { value: e.target.value })
                                    }}
                                  >
                                    {conjuntoDeOpciones.map((opt) => (
                                      <MenuItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                  {tieneError && (
                                    <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                                      Este campo es obligatorio
                                    </Typography>
                                  )}
                                </FormControl>
                              </Grid>
                            )}

                            {/*  2 */}
                            {item?.tipoRespuesta === 2 && (
                              <TextField
                                fullWidth
                                label="Respuesta"
                                value={respuestaActual?.new_respuestatexto || ""}
                                onChange={(e) =>
                                  handleRespuestaTipo2(item.new_preguntadelaevaluacionid, e.target.value)
                                }
                                variant="standard"
                                error={tieneError}
                                helperText={tieneError ? "Este campo es obligatorio" : ""}
                                sx={{ mt: 2, ml: 5 }}
                              />
                            )}
                          </Box>
                        )
                      })}
                    </Box>
                  ))}
              </List>
            </Grid>
          </Grid>
        </FormProvider>
      </DialogContent>

      <DialogActions>
        <Box sx={{ p: 2, textAlign: "right" }}>
          <Button variant="text" color="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button
            variant="contained"
            onClick={handleEnviar}
            sx={{
              backgroundColor: "#3bac52",
              "&:hover": {
                backgroundColor: "#2e8d45",
              },
            }}
          >
            Enviar
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default ModalEvaluaciones
