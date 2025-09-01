import axios from "axios"
import { toast } from "react-toastify"
import { UrlApi } from "@/keys"
import moment from "moment"

let loadingToast = null

const ToastLoading = (msj) => {
  loadingToast = toast.info(msj, {
    theme: "dark",
    position: "top-center",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  })
}

const ToastSuccess = (msj) => {
  toast.success(msj, {
    theme: "dark",
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    onOpen: () => {
      if (loadingToast !== null) {
        toast.dismiss(loadingToast)
      }
    },
  })
}

const ToastError = (msj) => {
  toast.error(msj, {
    theme: "dark",
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    onOpen: () => {
      if (loadingToast !== null) {
        toast.dismiss(loadingToast)
      }
    },
  })
}

const dataInicial = {
  objetivosLocales: [],
  objetivosPGD: [],
  getPgdObjetivos: false,
  evaluacionesPendientes: [],
  evaluacionPGD: [],
  getEvaluacionPDG: false,
  itemsEvaluacionPGD: [],
  getItemsEvaluacionPDG: false,
  misEvaluacionesCompletadasVencidas: [],
  evaluacionId: [],
  getEvaluacionId: false,
  encuestaDocente: [],
  encuestaDocenteCompleta: [],
  loadingEvaluacionesPendientes: false,
  loadingMisEvaluaciones: false,
  loadingEvaluacion: false,
  loadingEncuesta: false,
  loadingEncuestaCompleta: false,
  modificacionEvaluacion: "",
  setObjetivo: "",
  loadingObsEv: false,
  observacionesEv: [],
  loadingAvanceObj: false,
  avanceObj: [],
  modificacion: "",
  empleadosReportaA: []
}

const LOADING_EVALUACIONES_PENDIENTES = "LOADING_EVALUACIONES_PENDIENTES"
const EVALUACIONES_PENDIENTES = "EVALUACIONES_PENDIENTES"
const EVALUACIONES_PENDIENTES_ERROR = "EVALUACIONES_PENDIENTES_ERROR"

const LOADING_EV_COMPLETADAS_VENCIDAS = "LOADING_EV_COMPLETADAS_VENCIDAS"
const EV_COMPLETADAS_VENCIDAS = "EV_COMPLETADAS_VENCIDAS"
const EV_COMPLETADAS_VENCIDAS_ERROR = "EV_COMPLETADAS_VENCIDAS_ERROR"

const LOADING_EVALUACION_ID = "LOADING_EVALUACION_ID"
const EVALUACION_ID = "EVALUACION_ID"
const EVALUACION_ID_ERROR = "EVALUACION_ID_ERROR"

const LOADING_EVALUACION_PGD = "LOADING_EVALUACION_PGD"
const EVALUACION_PGD = "EVALUACION_PGD"
const EVALUACION_PGD_ERROR = "EVALUACION_PGD_ERROR"

const LOADING_OBJETIVOS_PGD = "LOADING_OBJETIVOS_PGD"
const OBJETIVOS_PGD = "OBJETIVOS_PGD"
const ERROR_OBJETIVOS_PGD = "ERROR_OBJETIVOS_PGD"

const LOADING_ITEMS_EVALUACION_PGD = "LOADING_ITEMS_EVALUACION_PGD"
const ITEMS_EVALUACION_PGD = "ITEMS_EVALUACION_PGD"
const ERROR_ITEMS_EVALUACION_PGD = "ERROR_ITEMS_EVALUACION_PGD"

const LOADING_ENCUESTA = "LOADING_ENCUESTA"
const ENCUESTA_DOCENTE = "ENCUESTA_DOCENTE"
const ENCUESTA_DOCENTE_ERROR = "ENCUESTA_DOCENTE_ERROR"

const LOADING_ENCUESTA_COMPLETA = "LOADING_ENCUESTA_COMPLETA"
const ENCUESTA_DOCENTE_COMPLETA = "ENCUESTA_DOCENTE_COMPLETA"
const ENCUESTA_DOCENTE_COMPLETA_ERROR = "ENCUESTA_DOCENTE_COMPLETA_ERROR"

const LOADING_ACTUALIZACION = "LOADING_ACTUALIZACION"
const ACTUALIZACION_EXITO = "ACTUALIZACION_EXITO"
const ACTUALIZACION_ERROR = "ACTUALIZACION_ERROR"

const CLEAR_EVALUACIONES_PGD = "CLEAR_EVALUACIONES_PGD"
const CLEAR_OBJETIVOS_PGD = "CLEAR_OBJETIVOS_PGD"

const LOADING_PGD_METAS = "LOADING_PGD_METAS"
const PGD_METAS = "PGD_METAS"
const ERROR_PGD_METAS = "ERROR_PGD_METAS"

const EDITAR_OBJETIVO_LOADING = "EDITAR_OBJETIVO_LOADING"
const EDITAR_OBJETIVO_EXITO = "EDITAR_OBJETIVO_EXITO"
const EDITAR_OBJETIVO_ERROR = "EDITAR_OBJETIVO_ERROR"

const NUEVO_OBJETIVO_LOADING = "NUEVO_OBJETIVO_LOADING"
const NUEVO_OBJETIVO_EXITO = "NUEVO_OBJETIVO_EXITO"
const NUEVO_OBJETIVO_ERROR = "NUEVO_OBJETIVO_ERROR"

const LOADING_OBSERVACIONES_EV = 'LOADING_OBSERVACIONES_EV'
const OBSERVACIONES_EV = 'OBSERVACIONES_EV'
const OBSERVACIONES_EV_ERROR = 'OBSERVACIONES_EV_ERROR'

const LOADING_AVANCE_X_OBJETIVO = "LOADING_AVANCE_X_OBJETIVO"
const AVANCE_X_OBJETIVO = "AVANCE_X_OBJETIVO"
const AVANCE_X_OBJETIVO_ERROR = "AVANCE_X_OBJETIVO_ERROR"

const LIMPIAR_AVANCES_X_OBJETIVOS = 'LIMPIAR_AVANCES_X_OBJETIVOS'

const MODIFICAR_EXITO = 'MODIFICAR_EXITO'
const MODIFICAR_ERROR = 'MODIFICAR_ERROR'

const OBJETIVOS_LOADING = "OBJETIVOS_LOADING"
const OBJETIVOS_EXITO = "OBJETIVOS_EXITO"
const OBJETIVOS_ERROR = "OBJETIVOS_ERROR"

const EMPLEADOS_REPORTAA_LOADING = "EMPLEADOS_REPORTAA_LOADING"
const EMPLEADOS_REPORTAA_EXITO = "EMPLEADOS_REPORTAA_EXITO"
const EMPLEADOS_REPORTAA_ERROR = "EMPLEADOS_REPORTAA_ERROR"

const ACTUALIZAR_PGD_LOADING = "ACTUALIZAR_PGD_LOADING"
const ACTUALIZAR_PGD_EXITO = "ACTUALIZAR_PGD_EXITO"
const ACTUALIZAR_PGD_ERROR = "ACTUALIZAR_PGD_ERROR"

const ACTUALIZAR_COMPETENCIAS_LOADING = "ACTUALIZAR_COMPETENCIAS_LOADING"
const ACTUALIZAR_COMPETENCIAS_EXITO = "ACTUALIZAR_COMPETENCIAS_EXITO"
const ACTUALIZAR_COMPETENCIAS_ERROR = "ACTUALIZAR_COMPETENCIAS_ERROR"

const CALCULAR_OBJETIVOS_LOADING = "CALCULAR_OBJETIVOS_LOADING"
const CALCULAR_OBJETIVOS_EXITO = "CALCULAR_OBJETIVOS_EXITO"
const CALCULAR_OBJETIVOS_ERROR = "CALCULAR_OBJETIVOS_ERROR"

const LIMPIAR_OBSERVACIONES_MENSUALES = 'LIMPIAR_OBSERVACIONES_MENSUALES'

const SET_OBJETIVOS_LOCALES = "SET_OBJETIVOS_LOCALES"
const ADD_OBJETIVO_LOCAL = "ADD_OBJETIVO_LOCAL"

export default function evaluacionesReducer(state = dataInicial, action) {
  switch (action.type) {
    case CLEAR_EVALUACIONES_PGD:
      return {
        ...state,
        objetivosPGD: [],
        evaluacionPGD: {},
        itemsEvaluacionPGD: [],
        getPgdObjetivos: false,
        getEvaluacionPDG: false,
        getItemsEvaluacionPDG: false,
        pgdMetas: [],
        getPgdMetas: false,
      }
    case LIMPIAR_AVANCES_X_OBJETIVOS:
      return {
        ...state,
        loadingAvanceObj: false,
        avanceObj: []
      }
    case CLEAR_OBJETIVOS_PGD:
      return {
        ...state,
        objetivosPGD: [],
        getPgdObjetivos: false,
      }
    case LIMPIAR_OBSERVACIONES_MENSUALES:
      return {
        ...state,
        loadingObsEv: false,
        observacionesEv: [],
      }
    case LOADING_EVALUACION_ID:
      return { ...state, getEvaluacionId: action.getEvaluacionId }
    case EVALUACION_ID:
      return { ...state, evaluacionId: action.payload, getEvaluacionId: action.getEvaluacionId }
    case EVALUACION_ID_ERROR:
      return { ...state, getEvaluacionId: action.getEvaluacionId }
    case LOADING_OBJETIVOS_PGD:
      return { ...state, getPgdObjetivos: action.getPgdObjetivos }
    case OBJETIVOS_PGD:
      return { ...state, objetivosPGD: action.payload, getPgdObjetivos: action.getPgdObjetivos }
    case ERROR_OBJETIVOS_PGD:
      return { ...state, getPgdObjetivos: action.getPgdObjetivos }
    case LOADING_ITEMS_EVALUACION_PGD:
      return { ...state, getItemsEvaluacionPDG: action.getItemsEvaluacionPDG }
    case ITEMS_EVALUACION_PGD:
      return { ...state, itemsEvaluacionPGD: action.payload, getItemsEvaluacionPDG: action.getItemsEvaluacionPDG }
    case ERROR_ITEMS_EVALUACION_PGD:
      return { ...state, getItemsEvaluacionPDG: action.getItemsEvaluacionPDG }
    case LOADING_EVALUACION_PGD:
      return { ...state, getEvaluacionPDG: action.getEvaluacionPDG }
    case EVALUACION_PGD:
      return { ...state, evaluacionPGD: action.payload, getEvaluacionPDG: action.getEvaluacionPDG }
    case EVALUACION_PGD_ERROR:
      return { ...state, getEvaluacionPDG: action.getEvaluacionPDG }
    case EVALUACIONES_PENDIENTES:
      return {
        ...state,
        evaluacionesPendientes: action.payload,
        loadingEvaluacionesPendientes: action.loadingEvaluacionesPendientes,
      }
    case EV_COMPLETADAS_VENCIDAS:
      return {
        ...state,
        misEvaluacionesCompletadasVencidas: action.payload,
        loadingMisEvaluaciones: action.loadingMisEvaluaciones,
      }
    case ENCUESTA_DOCENTE:
      return { ...state, encuestaDocente: action.payload, loadingEncuesta: action.loadingEncuesta }
    case ENCUESTA_DOCENTE_COMPLETA:
      return { ...state, encuestaDocenteCompleta: action.payload, loadingEncuestaCompleta: action.loadingEncuestaCompleta }
    case ACTUALIZACION_EXITO:
      return { ...state, modificacionEvaluacion: action.modificacionEvaluacion }
    case LOADING_EVALUACIONES_PENDIENTES:
      return { ...state, loadingEvaluacionesPendientes: action.loadingEvaluacionesPendientes }
    case LOADING_EV_COMPLETADAS_VENCIDAS:
      return { ...state, loadingMisEvaluaciones: action.loadingMisEvaluaciones }
    case LOADING_ENCUESTA:
      return { ...state, loadingEncuesta: action.loadingEncuesta }
    case LOADING_ENCUESTA_COMPLETA:
      return { ...state, loadingEncuestaCompleta: action.loadingEncuestaCompleta }
    case LOADING_PGD_METAS:
      return { ...state, getPgdMetas: action.getPgdMetas }
    case PGD_METAS:
      return { ...state, pgdMetas: action.payload, getPgdMetas: action.getPgdMetas }
    case ERROR_PGD_METAS:
      return { ...state, getPgdMetas: action.getPgdMetas }
    case EDITAR_OBJETIVO_LOADING:
      return { ...state, setObjetivo: action.resultado }
    case EDITAR_OBJETIVO_EXITO:
      return { ...state, setObjetivo: action.resultado }
    case EDITAR_OBJETIVO_ERROR:
      return { ...state, setObjetivo: action.resultado }
    case NUEVO_OBJETIVO_LOADING:
      return { ...state, setObjetivo: action.resultado }
    case NUEVO_OBJETIVO_EXITO:
      return { ...state, setObjetivo: action.resultado }
    case NUEVO_OBJETIVO_ERROR:
      return { ...state, setObjetivo: action.resultado }
    case LOADING_OBSERVACIONES_EV:
      return { ...state, loadingObsEv: action.loadingObsEv }
    case OBSERVACIONES_EV:
      return { ...state, observacionesEv: action.payload, loadingObsEv: action.loadingObsEv }
    case OBSERVACIONES_EV_ERROR:
      return { ...state, loadingObsEv: action.loadingObsEv }
    case LOADING_AVANCE_X_OBJETIVO:
      return { ...state, loadingAvanceObj: action.loadingAvanceObj }
    case AVANCE_X_OBJETIVO:
      return { ...state, avanceObj: action.payload, loadingAvanceObj: action.loadingAvanceObj }
    case AVANCE_X_OBJETIVO_ERROR:
      return { ...state, loadingAvanceObj: action.loadingAvanceObj }
    case MODIFICAR_EXITO:
      return { ...state, modificacion: action.modificacion }
    case MODIFICAR_ERROR:
      return { ...state, modificacion: action.modificacion }
    case OBJETIVOS_LOADING:
      return { ...state, setObjetivo: action.resultado }
    case OBJETIVOS_EXITO:
      return { ...state, setObjetivo: action.resultado }
    case OBJETIVOS_ERROR:
      return { ...state, setObjetivo: action.resultado }
    case EMPLEADOS_REPORTAA_LOADING:
      return { ...state}
    case EMPLEADOS_REPORTAA_EXITO:
      return { ...state, empleadosReportaA: action.payload }
    case EMPLEADOS_REPORTAA_ERROR:
      return { ...state}  
    case SET_OBJETIVOS_LOCALES:
      return { ...state, objetivosLocales: action.payload }
    case ADD_OBJETIVO_LOCAL:
      return { ...state, objetivosLocales: [...state.objetivosLocales, action.payload] };
      
    default:
      return { ...state }
  }
}


export const setearObjetivos = (respuesta) => ({
  type: 'SET_OBJETIVOS_LOCALES',
  payload: respuesta,
});
export const addObjetivo = (nuevoObjetivo) => ({
  type: 'ADD_OBJETIVO_LOCAL',
  payload: nuevoObjetivo,
});

export const limpiarObservacionesMensuales = () => async (dispatch) => {
  dispatch({
      type: LIMPIAR_OBSERVACIONES_MENSUALES,
    })
};

export const clearEvaluacionesPGD = () => async (dispatch) => {
  dispatch({
    type: CLEAR_EVALUACIONES_PGD,
  })
}
export const clearDefinicionObjetivosPGD = () => async (dispatch) => {
  dispatch({
    type: CLEAR_OBJETIVOS_PGD,
  })
}

export const evaluacionesPend = (token, fechahoy, empleadoid) => async (dispatch) => {
  dispatch({
    type: LOADING_EVALUACIONES_PENDIENTES,
    loadingEvaluacionesPendientes: false,
  })
  try {
    var entidad = "new_evaluacions"
    var fetch =
      "<entity name='new_evaluacion'>" +
      "<attribute name='new_evaluacionid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<attribute name='new_tipodeevaluacion' />" +
      "<attribute name='new_valoracionfinal' />" +
      "<attribute name='new_periodo' />" +
      "<attribute name='new_evaluador' />" +
      "<attribute name='new_evaluado' />" +
      "<attribute name='new_materia' />" +
      "<attribute name='new_ciclo' />" +
      "<attribute name='new_anio' />" +
      "<attribute name='new_fechadevencimiento' />" +
      "<attribute name='statuscode' />" +
      "<attribute name='new_alumnoevaluador' />" +
      "<order attribute='new_name' descending='false' />" +
      "<filter type='and'>" +
      "<condition attribute='new_tipodeevaluacion' operator='in'>" +
      "<value>1</value>" +
      "<value>6</value>" +
      "</condition>" +
      "<condition attribute='statuscode' operator='eq' value='1' />" +
      "<condition attribute='new_alumnoevaluador' operator='eq' value='" +
      empleadoid +
      "'/>" +
      "<condition attribute='new_fechadeinicio' operator='on-or-before' value='" + fechahoy + "' />" +
      "<condition attribute='new_fechadevencimiento' operator='on-or-after' value='" + fechahoy + "' />" +
      "</filter>" +
      "</entity>"

    const response = await axios.post(
      `${UrlApi}api/consultafetchs`,
      {
        entidad: entidad,
        fetch: fetch,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    dispatch({
      type: EVALUACIONES_PENDIENTES,
      payload: response.data,
      loadingEvaluacionesPendientes: true,
    })
  } catch (error) {
    dispatch({
      type: EVALUACIONES_PENDIENTES_ERROR,
      loadingEvaluacionesPendientes: true,
    })
  }
}

export const misEvaluacionesCompletadasVencidas = (token, fechahoy, empleadoid) => async (dispatch) => {
  dispatch({
    type: LOADING_EV_COMPLETADAS_VENCIDAS,
    loadingMisEvaluaciones: false,
  })
  debugger
  try {
    var entidad = "new_evaluacions"
    var fetch = `
    <entity name='new_evaluacion'>
      <attribute name='new_evaluacionid' />
      <attribute name='new_name' />
      <attribute name='createdon' />
      <attribute name='new_valoracionfinal' />
      <attribute name='new_tipodeevaluacion' />
      <attribute name='statuscode' />
      <attribute name='new_periodo' />
      <attribute name='new_evaluador' />
      <attribute name='new_evaluado' />
      <attribute name='new_alumnoevaluador' />
      <attribute name='new_fechadevencimiento' />
      <attribute name='new_materia' />
      <attribute name='new_ciclo' />
      <attribute name='new_anio' />
      <order attribute='new_name' descending='false' />
      <filter type='and'>
        <condition attribute='new_alumnoevaluador' operator='eq' uitype='new_empleado' value='${empleadoid}' />
        <condition attribute='new_tipodeevaluacion' operator='in'>
          <value>1</value>
          <value>6</value>
        </condition>
        <filter type='or'>
          <filter type='and'>
            <condition attribute='statuscode' operator='eq' value='1' />
            <condition attribute='new_fechadevencimiento' operator='lt' value='${fechahoy}' />
          </filter>
          <filter type='and'>
            <condition attribute='statuscode' operator='eq' value='100000000' />
          </filter>
          <filter type='and'>
            <condition attribute='statuscode' operator='eq' value='100000001' />
            <condition attribute='new_fechadevencimiento' operator='on-or-before' value='${fechahoy}' />
          </filter>
        </filter>
      </filter>
    </entity>`;

    const response = await axios.post(
      `${UrlApi}api/consultafetchs`,
      {
        entidad: entidad,
        fetch: fetch,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    dispatch({
      type: EV_COMPLETADAS_VENCIDAS,
      payload: response.data,
      loadingMisEvaluaciones: true,
    })
  } catch (error) {
    dispatch({
      type: EV_COMPLETADAS_VENCIDAS_ERROR,
      loadingMisEvaluaciones: true,
    })
  }
}

export const objetivosPorPGD = (token, id) => async (dispatch) => {
  dispatch({
    type: LOADING_OBJETIVOS_PGD,
    getPgdObjetivos: false,
  })
  try {
    var entidad = "new_objetivodeevaluacions"
    var fetch =
      "<entity name='new_objetivodeevaluacion'>" +
      "<attribute name='new_objetivodeevaluacionid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<attribute name='statuscode' />" +
      "<attribute name='new_empleado' />" +
      "<attribute name='new_evaluaciondepgd' />" +
      "<attribute name='new_competencia' />" +
      "<attribute name='new_competencia2' />" +
      "<attribute name='new_resultadoclave' />" +
      "<attribute name='new_indicador2' />" +
      "<attribute name='new_indicador3' />" +
      "<attribute name='new_indicador4' />" +
      "<attribute name='new_indicador5' />" +
      "<attribute name='new_ponderacionlider' />" +
      "<attribute name='new_status' />" +
      "<attribute name='new_motivodecancelaciondeobjetivo' />" +
      "<attribute name='new_fechadecumplimiento' />" +
      "<attribute name='new_deavance' />" +
      "<attribute name='new_estadofinal' />" +
      "<order attribute='new_name' descending='false' />" +
      "<filter type='and'>" +
      "<condition attribute='statecode' operator='eq' value='0' />" +
      "<condition attribute='new_evaluaciondepgd' operator='eq' value='" +
      id +
      "'/>" +
      "</filter>" +
      "<link-entity name='new_evaluaciondepgd' from='new_evaluaciondepgdid' to='new_evaluaciondepgd' alias='evaluacion'>" +
      "<attribute name='statuscode' />" +
      "</link-entity>" +
      "</entity>"

    const response = await axios.post(
      `${UrlApi}api/consultafetchs`,
      {
        entidad: entidad,
        fetch: fetch,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )


    response.data.sort((a, b) => {
      const order = {
        100000004: 1, // No Iniciado
        100000000: 2, // En Progreso
        100000001: 3, // Completo
        100000003: 4, // Cancelado
      };
    
      return order[a.new_status] - order[b.new_status];
    });
    
    dispatch({
      type: OBJETIVOS_PGD,
      payload: response.data,
      getPgdObjetivos: true,
    })
  } catch (error) {
    dispatch({
      type: ERROR_OBJETIVOS_PGD,
      getPgdObjetivos: true,
    })
  }
}

export const evaluacionPorPGD = (token, id) => async (dispatch) => {
  dispatch({
    type: LOADING_EVALUACION_PGD,
    getEvaluacionPDG: false,
  })
  try {
    var entidad = "new_evaluaciondepgds"
    var fetch =
      "<entity name='new_evaluaciondepgd'>" +
      "<attribute name='new_evaluaciondepgdid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<attribute name='new_fechainicioautoevaluacion' />" +
      "<attribute name='new_puntajeevaluacionpgd' />" +
      "<attribute name='new_promedioevaluacionpgd' />" +
      "<attribute name='new_porcentajedecumplimientodemetas' />" +
      "<attribute name='new_performanceindividual' />" +
      "<attribute name='new_miproposito' />" +
      "<attribute name='statuscode' />" +
      "<attribute name='processid' />" +
      "<attribute name='new_feedback' />" +
      "<attribute name='new_fechayhoradelencuentrodefeedback' />" +
      "<attribute name='modifiedon' />" +
      "<attribute name='overriddencreatedon' />" +
      "<attribute name='new_lder' />" +
      "<attribute name='new_evaluaciondellder'/>" +
      "<attribute name='new_evaluado' />" +
      "<attribute name='new_evaluaciondellder' />" +
      "<attribute name='new_evaluaciondecompetencias' />" +
      "<attribute name='new_estadofinaldelaevaluacindepgd' />" +
      "<attribute name='new_estadodelencuentrodefeedback' />" +
      "<attribute name='new_estadodelaevaluacindellder' />" +
      "<attribute name='statecode' />" +
      "<attribute name='new_comentariosyobservacionesdelfeedbacklider' />" +
      "<attribute name='new_comentariosyobservacionesdelfeedback' />" +
      "<attribute name='new_unidadorganizativaaspiracionalprximos6mes' />" +
      "<attribute name='new_unidadorganizativaaspiracionalprximos12me' />" +
      "<attribute name='new_resultadotrimestralautoevaluacion' />" +
      "<attribute name='new_puestoaspiracionalprximos6meses' />" +
      "<attribute name='new_puestoaspiracionalprximos12meses' />" +
      "<attribute name='new_posicinaspiracionalprximos6meses' />" +
      "<attribute name='new_posicinaspiracionalprximos12meses' />" +
      "<attribute name='new_niveldelogroresultadotrimestralautoevalua' />" +
      "<attribute name='new_miproposito' />" +
      "<attribute name='new_interesendesarrolloprximos12meses' />" +
      "<attribute name='new_interesendesarrolloprox6meses' />" +
      "<attribute name='new_elcolaboradorhacambiadosupropsito' />" +
      "<attribute name='new_comentariosyobservacionesdemiproposito' />" +
      "<attribute name='new_comentariosyobservaciones' />" +
      "<attribute name='new_comentariosyobervacionesdesuproposito' />" +
      "<attribute name='new_nuevoproposito' />" +
      "<attribute name='new_estadodelaautoevaluacin' />" +
      "<attribute name='new_ciclo' />" +
      "<attribute name='new_cantidadmetasprioritariasdefinidas' />" +
      "<attribute name='new_cantidadmetasprioritariascumplimentadas' />" +
      "<attribute name='new_cantidadcompetencias' />" +
      "<attribute name='new_autoevaluacion' />" +
      "<attribute name='new_scoreglobaldeobjetivos' />" +
      "<attribute name='new_scoreglobaldedompetencias' />" +
      "<attribute name='new_feedbackdecompetencias' />" +
      "<order attribute='new_name' descending='false' />" +
      "<filter type='and'>" +
      "<condition attribute='new_evaluaciondepgdid' operator='eq' uitype='new_ciclodepgd' value='" +
      id +
      "'/>" +
      "</filter>" +
      "</entity>"

    const response = await axios.post(
      `${UrlApi}api/consultafetchs`,
      {
        entidad: entidad,
        fetch: fetch,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    dispatch({
      type: EVALUACION_PGD,
      payload: response.data,
      getEvaluacionPDG: true,
    })
  } catch (error) {
    dispatch({
      type: EVALUACION_PGD_ERROR,
      getEvaluacionPDG: true,
    })
  }
}

export const itemsEvaluacionPGDFetch = (token, id) => async (dispatch) => {
  dispatch({
    type: LOADING_ITEMS_EVALUACION_PGD,
    getItemsEvaluacionPDG: false,
  })
  try {
    var entidad = "new_itemdeevaluaciondedesempeos"
    var fetch =
      "<entity name='new_itemdeevaluaciondedesempeo'>" +
      "<attribute name='new_itemdeevaluaciondedesempeoid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<attribute name='new_valoracin' />" +
      "<attribute name='new_competencia' />" +
      "<attribute name='new_valoraciondellider' />" +
      "<order attribute='new_name' descending='false' />" +
      "<filter type='and'>" +
      "<condition attribute='new_evaluaciondepgd' operator='eq' uitype='new_evaluaciondepgd' value='" +
      id +
      "' />" +
      "</filter>" +
      "<link-entity name='new_competencia' from='new_competenciaid' to='new_competencia' alias='aa'>" +
      "<attribute name='new_descripcion' />" +
      "<attribute name='new_definicionderangos' />" +
      "</link-entity>" +
      "</entity>"

    const response = await axios.post(
      `${UrlApi}api/consultafetchs`,
      {
        entidad: entidad,
        fetch: fetch,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    dispatch({
      type: ITEMS_EVALUACION_PGD,
      payload: response.data,
      getItemsEvaluacionPDG: true,
    })
  } catch (error) {
    dispatch({
      type: ERROR_ITEMS_EVALUACION_PGD,
      getItemsEvaluacionPDG: true,
    })
  }
}

export const evaluacionPorId = (token, id) => async (dispatch) => {
  dispatch({
    type: LOADING_EVALUACION_ID,
    getEvaluacionId: false,
  })
  try {
    var entidad = "new_preguntadelaevaluacions"
    var fetch =
      "<entity name='new_preguntadelaevaluacion'>" +
      "<attribute name='new_textodelapregunta'/>" +
      "<attribute name='new_orden'/>" +
      "<attribute name='new_areadecompetencia'/>" +
      "<attribute name='new_opcionpolivalencia'/>" +
      "<attribute name='new_preguntadelaevaluacionid'/>" +
      "<order attribute='new_orden' descending='false'/>" +
      "<filter type='and'>" +
      "<condition attribute='statecode' operator='eq' value='0'/>" +
      "<condition attribute='new_evaluacion' operator='eq' uitype='new_evaluacion' value='" + id + "'/>" +
      "</filter>" +
      "<link-entity name='new_templatedepregunta' from='new_templatedepreguntaid' to='new_templatedepreguntas' link-type='outer' alias='ab'>" +
        "<attribute name='new_areadecompetencia'/>" +
        "<attribute name='new_competencias'/>" +
        "<attribute name='new_atributo'/>" +
        "<attribute name='new_tipoderespuesta' />" +
      "<link-entity name='new_competencia' from='new_competenciaid' to='new_competencias' link-type='outer' alias='ac'>" +
      "<attribute name='new_descripcion' />" +
      "<attribute name='new_competenciaid' />" +
      "</link-entity>" +
      "</link-entity>" +
      "</entity>"

    const response = await axios.post(
      `${UrlApi}api/consultafetchs`,
      {
        entidad: entidad,
        fetch: fetch,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    dispatch({
      type: EVALUACION_ID,
      payload: response.data,
      getEvaluacionId: true,
    })
  } catch (error) {
    dispatch({
      type: EVALUACION_ID_ERROR,
      getEvaluacionId: true,
    })
  }
}


export const actualizarEvaluacion = (token, id, array) => async (dispatch) => {
  dispatch({
    type: LOADING_ACTUALIZACION,
    loadingEvaluacion: true,
    // modificacionEvaluacion: 'Cargando...',
  })
  console.log(array)
  try {
      debugger

    const updateEvaluacion = () =>
      new Promise(async (resolve, reject) => {
        await axios
          .put(
            `${UrlApi}api/hrfactors/evaluaciondocente`,
            {
              new_evaluacionid: id,
              itemsDeLaEvalucion: array,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            dispatch({
              type: ACTUALIZACION_EXITO,
              modificacionEvaluacion: "EXITO",
              loadingEvaluacion: false,
            })
            resolve(response.data)
          })
          .catch((err) => {
            reject(err)
            console.log(err)
          })
      })

    const response = await toast.promise(
      updateEvaluacion,
      {
        pending: "Procesando...",
        success: "Evaluación completada con éxito!",
        error: {
          render({ data }) {
            // console.log(data)
            return `${data}`
          },
        },
      },
      {
        theme: "dark",
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    )
  } catch (error) {
    console.log(error)
    dispatch({
      type: ACTUALIZACION_ERROR,
      modificacionEvaluacion: "ERROR",
      loadingEvaluacion: false,
    })
  }
}


export const encuestasDocente = (token, id) => async (dispatch) => {
  dispatch({
    type: LOADING_ENCUESTA,
    loadingEncuesta: true,
  })
  try {
    var entidad = "new_evaluacions"
    var fetch =
      "<entity name='new_evaluacion'>" +
      "<attribute name='createdon'/>" +
      "<attribute name='new_valoracionfinal'/>" +
      "<attribute name='new_periodo'/>" +
      "<attribute name='new_modalidad'/>" +
      "<attribute name='new_materia'/>" +
      "<attribute name='new_evaluado'/>" +
      "<attribute name='new_cualitativo'/>" +
      "<attribute name='new_tipodeevaluacion'/>" +
      "<attribute name='new_seccion'/>" +
      "<attribute name='new_evaluacionid'/>" +
      "<attribute name='new_evaluador'/>" +
      "<attribute name='new_divisin'/>" +
      "<attribute name='new_cualitativo'/>" +
      "<attribute name='statuscode'/>" +
      "<attribute name='new_fechadevencimiento' />" +
      "<order attribute='new_valoracionfinal' descending='false'/>" +
      "<filter type='and'>" +
      "<condition attribute='statuscode' operator='eq' value='1'/>" +
      "<condition attribute='new_tipodeevaluacion' operator='eq' value='1'/>" +
      "<condition attribute='new_evaluador' operator='eq' uitype='new_empleado' value='" +
      id +
      "'/>" +
      "</filter>" +
      "</entity>"

    const response = await axios.post(
      `${UrlApi}api/consultafetchs`,
      {
        entidad: entidad,
        fetch: fetch,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    dispatch({
      type: ENCUESTA_DOCENTE,
      payload: response.data,
      loadingEncuesta: false,
    })
  } catch (error) {
    dispatch({
      type: ENCUESTA_DOCENTE_ERROR,
      loadingEncuesta: false,
    })
  }
}

export const encuestasDocenteCompletada = (token, id) => async (dispatch) => {
  dispatch({
    type: LOADING_ENCUESTA_COMPLETA,
    loadingEncuestaCompleta: true,
  })
  try {
    var entidad = "new_evaluacions"
    var fetch =
      "<entity name='new_evaluacion'>" +
      "<attribute name='new_valoracionfinal'/>" +
      "<attribute name='new_periodo'/>" +
      "<attribute name='new_modalidad'/>" +
      "<attribute name='new_materia'/>" +
      "<attribute name='new_evaluado'/>" +
      "<attribute name='new_cualitativo'/>" +
      "<attribute name='new_tipodeevaluacion'/>" +
      "<attribute name='new_seccion'/>" +
      "<attribute name='new_evaluacionid'/>" +
      "<order attribute='new_valoracionfinal' descending='false'/>" +
      "<filter type='and'>" +
      "<condition attribute='new_tipodeevaluacion' operator='eq' value='1'/>" +
      "<condition attribute='new_evaluador' operator='eq' uitype='new_empleado' value='" +
      id +
      "'/>" +
      "<condition attribute='statuscode' operator='eq' value='100000000'/>" +
      "</filter>" +
      "</entity>"

    const response = await axios.post(
      `${UrlApi}api/consultafetchs`,
      {
        entidad: entidad,
        fetch: fetch,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    dispatch({
      type: ENCUESTA_DOCENTE_COMPLETA,
      payload: response.data,
      loadingEncuestaCompleta: false,
    })
  } catch (error) {
    dispatch({
      type: ENCUESTA_DOCENTE_COMPLETA_ERROR,
      loadingEncuestaCompleta: false,
    })
  }
}

export const metaPrioritariaFetch = (token, evaluacionpgdId) => async (dispatch) => {
  dispatch({
    type: LOADING_PGD_METAS,
    getPgdMetas: false,
  })

  try {
    var entidad = "new_metaprioritarias"
    var fetch =
      "<entity name='new_metaprioritaria'>" +
      "<attribute name='new_metaprioritariaid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<attribute name='statuscode' />" +
      "<attribute name='new_fechahasta' />" +
      "<attribute name='new_fechadesde' />" +
      "<attribute name='new_evidencia' />" +
      "<attribute name='new_comentarios' />" +
      "<attribute name='new_accion' />" +
      "<attribute name='new_tipodeaccin' />" +
      "<order attribute='new_name' descending='false' />" +
      "<filter type='and'>" +
      "<condition attribute='new_evaluacionpgd' operator='eq' value='" +
      evaluacionpgdId +
      "' />" +
      "</filter>" +
      "</entity>"

    const response = await axios.post(
      `${UrlApi}api/consultafetchs`,
      {
        entidad: entidad,
        fetch: fetch,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    dispatch({
      type: PGD_METAS,
      payload: response.data,
      getPgdMetas: true,
    })
  } catch (error) {
    dispatch({
      type: ERROR_PGD_METAS,
      getPgdMetas: true,
    })
  }
}

export const editarObjetivo = (token, datos, idPGD, empleado) => async (dispatch) => {
  dispatch({
    type: EDITAR_OBJETIVO_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...")
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios.put(`${UrlApi}api/hrfactors/objetivo`,
        {
          "new_objetivodeevaluacionid": datos.id,
          "new_resultadoclave": datos.indicador,
          "new_indicador2": datos.indicador2,
          "new_indicador3": datos.indicador3,
          "new_indicador4": datos.indicador4,
          "new_indicador5": datos.indicador5,
          "new_ponderacionlider": datos.peso,
          "new_fechadecumplimiento": datos.fechaDeCumplimiento
        }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          dispatch({
            type: NUEVO_OBJETIVO_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Actualización cargada con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          dispatch({
            type: NUEVO_OBJETIVO_ERROR,
            resultado: "ERROR",
          });

          ToastError(error.response.data);
          reject(error);
        });
    }
  });
};

export const nuevoObjetivo = (token, datos, idPGD, empleado) => async (dispatch) => {
  dispatch({
    type: NUEVO_OBJETIVO_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...")
  return new Promise((resolve, reject) => {
    if (Object.keys(datos).length > 0 && token) {
      axios.post(`${UrlApi}api/hrfactors/objetivo`,
        {
          "new_objetivodeevaluacionid": "",
          "new_name": datos.objetivo,
          "new_evaluaciondepgd": idPGD,
          "new_resultadoclave": datos.indicador,
          "new_indicador2": datos.indicador2,
          "new_indicador3": datos.indicador3,
          "new_indicador4": datos.indicador4,
          "new_indicador5": datos.indicador5,
          "new_ponderacionlider": datos.peso,
          "new_competencia": datos.competencia.value,
          "new_competencia2": datos.competencia2.value,
          "new_fechadecumplimiento": moment(datos.fechaDeCumplimiento).format('YYYY-MM-DD')
        }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          dispatch({
            type: NUEVO_OBJETIVO_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Objetivo cargado con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);

          dispatch({
            type: NUEVO_OBJETIVO_ERROR,
            resultado: "ERROR",
          });

          ToastError(error.response.data);
          reject(error);
        });
    }
  });
};

export const observacionesEvaluacionPGD = (token, id) => async (dispatch) => {
  dispatch({
    type: LOADING_OBSERVACIONES_EV,
    loadingObsEv: false,
  })
  try {
    var entidad = "new_observaciondeobjetivos"
    var fetch = `<entity name="new_observaciondeobjetivo">
    <attribute name="new_mes"/>
    <attribute name="new_feedbacklider"/>
    <attribute name="new_indicemensual"/>
    <attribute name="new_observaciondeobjetivoid"/>
    <attribute name="new_evaluaciondepgd"/>
    <order attribute="new_indicemensual" descending="false"/>
    <filter type="and">
    <condition attribute="statecode" operator="eq" value="0"/>
    <condition attribute="new_indicemensual" operator="eq" value="6"/>
    <condition attribute="new_evaluaciondepgd" operator="eq" uitype="new_evaluaciondepgd" value="${id}"/>
    </filter>
    </entity>`

    const response = await axios.post(
      `${UrlApi}api/consultafetchs`,
      {
        entidad: entidad,
        fetch: fetch,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    dispatch({
      type: OBSERVACIONES_EV,
      payload: response.data,
      loadingObsEv: true,
    })
  } catch (error) {
    dispatch({
      type: OBSERVACIONES_EV_ERROR,
      loadingObsEv: true,
    })
  }
}

export const avanceMensualXobjetivo = (token, id) => async (dispatch) => {
  dispatch({
    type: LOADING_AVANCE_X_OBJETIVO,
    loadingAvanceObj: true,
  })
  try {
    var entidad = "new_avancemensuals"
    var fetch = `<entity name="new_avancemensual">
    <attribute name="new_mes"/>
    <attribute name="new_deavance"/>
    <attribute name="new_indicemensual"/>
    <attribute name="new_avancemensualid"/>
    <order attribute="new_indicemensual" descending="false"/>
    <filter type="and">
    <condition attribute="new_objetivodeevaluacion" operator="eq" uitype="new_objetivodeevaluacion" value="${id}"/>
    </filter>
    <link-entity name="new_objetivodeevaluacion" from="new_objetivodeevaluacionid" to="new_objetivodeevaluacion" visible="false" link-type="outer" alias="ab">
      <attribute name="new_status"/>
      <link-entity name="new_evaluaciondepgd" from="new_evaluaciondepgdid" to="new_evaluaciondepgd" link-type="outer" alias="af">
        <attribute name="new_estadodelencuentrodefeedback"/>
        <attribute name="new_scoreglobaldeobjetivos"/>
      </link-entity>
    </link-entity>
    </entity>`

    const response = await axios.post(
      `${UrlApi}api/consultafetchs`,
      {
        entidad: entidad,
        fetch: fetch,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    dispatch({
      type: AVANCE_X_OBJETIVO,
      payload: response.data,
      loadingAvanceObj: false,
    })
  } catch (error) {
    dispatch({
      type: AVANCE_X_OBJETIVO_ERROR,
      loadingAvanceObj: false,
    })
  }
}

export const editarAvancesMensualesObjetivos = (token, datos) => async (dispatch) => {
  return toast.promise(
    new Promise((resolve, reject) => {
      const newDeavanceAsNumber = parseFloat(datos.new_deavance);
      axios.put(
        `${UrlApi}api/hrfactors/avancemensual`,
        {
          "new_avancemensualid": datos.id,
          "new_deavance": newDeavanceAsNumber,
          "new_objetivodeevaluacion": datos.new_objetivodeevaluacion,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          dispatch({
            type: MODIFICAR_EXITO,
            payload: response.data,
            modificacion: "EXITO",
          });
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          dispatch({
            type: MODIFICAR_ERROR,
            modificacion: "ERROR",
          });
          reject(error);
        });
    }),
    {
      pending: "Procesando...",
      success: "Avance cargado con éxito!",
      error: {
        render({ data }) {
          return `${data}`;
        },
      },
    },
    {
      theme: "dark",
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
  )
};

export const editarObservacionesMensualesLider = (token, datos) => async (dispatch) => {
  return toast.promise(
    new Promise((resolve, reject) => {
      axios.put(
        `${UrlApi}api/hrfactors/observacionesmensuales`,
        {
          "new_observaciondeobjetivoid": datos.id,
          "new_feedbacklider": datos.new_feedbacklider
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          dispatch({
            type: MODIFICAR_EXITO,
            payload: response.data,
            modificacion: "EXITO",
          });
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          dispatch({
            type: MODIFICAR_ERROR,
            modificacion: "ERROR",
          });
          reject(error);
        });
    }),
    {
      pending: "Procesando...",
      success: "Observación cargada con éxito!",
      error: {
        render({ data }) {
          return `${data}`;
        },
      },
    },
    {
      theme: "dark",
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
  )
};

export const limpiarAvancesXobjetivos = () => async (dispatch) => {
  dispatch({
    type: LIMPIAR_AVANCES_X_OBJETIVOS,
  })
}

export const enviarObjetivos = (token, objetivos) => async (dispatch) => {
  dispatch({
    type: OBJETIVOS_LOADING,
  })
  try {
    console.log(objetivos)
    const updateEvaluacion = () =>
      new Promise(async (resolve, reject) => {
        await axios
          .post(
            `${UrlApi}api/hrfactors/objetivos`,
            objetivos,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            dispatch({
              type: OBJETIVOS_EXITO,
            })
            resolve(response.data)
          })
          .catch((err) => {
            reject(err)
            console.log(err)
          })
      })
 
    const response = await toast.promise(
      updateEvaluacion,
      {
        pending: "Procesando...",
        success: "Evaluación completada con éxito!",
        error: {
          render({ data }) {
            // console.log(data)
            return `${data}`
          },
        },
      },
      {
        theme: "dark",
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    )
  } catch (error) {
    console.log(error)
    dispatch({
      type: OBJETIVOS_ERROR,
    })
  }
}



export const obtenerEmpleadosQueReportanAUsuario = (token, id) => async (dispatch) => {
  dispatch({
    type: EMPLEADOS_REPORTAA_LOADING,
  })

  try {
    var entidad = "new_empleados"
    var fetch =
      "<entity name='new_empleado'>" +
      "<attribute name='new_name' />" +
      "<attribute name='new_cuitcuil' />" +
      "<attribute name='new_correoelectronico' />" +
      "<attribute name='new_numerolegajo' />" +
      "<attribute name='new_empleadoid' />" +
      "<order attribute='new_numerolegajo' descending='false' />" +
      "<filter type='and'>" +
      "<condition attribute='new_reportaaid' operator='eq' uitype='new_empleado' value='" + id + "'/>" +
      "</filter>" +
      "</entity>";

    const response = await axios.post(`${UrlApi}api/consultafetchs`,
      {
        "entidad": entidad,
        "fetch": fetch
      },
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    )
    dispatch({
      type: EMPLEADOS_REPORTAA_EXITO,
      payload: response.data,
    })
  }
  catch (error) {
    dispatch({
      type: EMPLEADOS_REPORTAA_ERROR,
    })
  }
}



export const ActualizarEvaluacionPGD = (token, id, datos) => async (dispatch) => {
  dispatch({
    type: ACTUALIZAR_PGD_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...")

  return new Promise((resolve, reject) => {
    if (token) {
      axios.put(`${UrlApi}api/hrfactors/evaluacionpgd`,
        {
          "new_evaluaciondepgdid": id,
          "new_comentariosyobservacionesdelfeedback": datos.comentariosEvaluado,
          "new_comentariosyobservacionesdelfeedbacklider": datos.comentariosLider,
          "new_estadodelencuentrodefeedback": datos.new_estadodelencuentrodefeedback,
          "new_scoreglobaldedompetencias": datos.new_scoreglobaldedompetencias
        }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          dispatch({
            type: ACTUALIZAR_PGD_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("PGD actualizado con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);

          dispatch({
            type: ACTUALIZAR_PGD_ERROR,
            resultado: "ERROR",
          });

          ToastError(error.response.data);
          reject(error);
        });
    }
  });
};

export const EnviarCompetencias = (token, arrayDatos, objetoDatos) => async (dispatch) => {
  dispatch({
    type: ACTUALIZAR_COMPETENCIAS_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...")

  return new Promise((resolve, reject) => {
    if (token) {
      axios.put(`${UrlApi}api/hrfactors/itemdeevaluacionpgd`,
        {
          "itemsDeEvaluacionPGD": arrayDatos,
          "evaluacionPGD": objetoDatos
        }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          dispatch({
            type: ACTUALIZAR_COMPETENCIAS_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("PGD actualizado con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);

          dispatch({
            type: ACTUALIZAR_COMPETENCIAS_ERROR,
            resultado: "ERROR",
          });

          ToastError(error.response.data);
          reject(error);
        });
    }
  });
};


export const EnviarCompetencia = (token, data) => async (dispatch) => {
  dispatch({
    type: ACTUALIZAR_COMPETENCIAS_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...")

  return new Promise((resolve, reject) => {
    if (token) {
      axios.put(`${UrlApi}api/hrfactors/itemdeevaluacion`,
        {
          "new_itemdeevaluaciondedesempeoid": data.new_itemdeevaluaciondedesempeoid,
          "new_valoraciondellider": data.new_valoraciondellider,
          "new_valoracin": data.new_valoracin,
        }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          dispatch({
            type: ACTUALIZAR_COMPETENCIAS_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("Competencia actualizada con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);

          dispatch({
            type: ACTUALIZAR_COMPETENCIAS_ERROR,
            resultado: "ERROR",
          });

          ToastError(error.response.data);
          reject(error);
        });
    }
  });
};


export const EnviarObjetivos = (token, id ) => async (dispatch) => {
  dispatch({
    type: CALCULAR_OBJETIVOS_LOADING,
    resultado: "LOADING",
  });
  ToastLoading("Procesando...")

  return new Promise((resolve, reject) => {
    if (token) {
      axios.put(`${UrlApi}api/hrfactors/finalizarobjetivos`,
        {
          "new_evaluaciondepgdid": id,
        }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          dispatch({
            type: CALCULAR_OBJETIVOS_EXITO,
            resultado: "EXITO",
            payload: response.data,
          });

          ToastSuccess("PGD actualizado con éxito");
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);

          dispatch({
            type: CALCULAR_OBJETIVOS_ERROR,
            resultado: "ERROR",
          });

          ToastError(error.response.data);
          reject(error);
        });
    }
  });
};