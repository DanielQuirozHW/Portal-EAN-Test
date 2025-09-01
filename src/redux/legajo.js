import { UrlApi } from "@/keys"
import axios from "axios"
import toast from "react-hot-toast";

const handleSuccess = (msj) => {
  toast.success(msj, {
    duration: 2500,
  });
};

const handleError = (msj) => {
  toast.error(msj, {
    duration: 2500,
  });
};


const dataInicial = {
  legajo: [],
  loadingLegajo: false,
  estadoActualizacion: "",
  respuestaActualizacion: "",
  usuarioAsociado: [],
  loadingUsuarioAsociado: false,
  usuarioLider: [],
  loadingUsuarioLider: false
}

const LOADING_LEGAJO = "LOADING_LEGAJO"
const LEGAJO_EXITO = "LEGAJO_EXITO"
const LEGAJO_ERROR = "LEGAJO_ERROR"

const ACTUALIZACION_LEGAJO_LOADING = "ACTUALIZACION_LEGAJO_LOADING"
const ACTUALIZACION_LEGAJO_EXITO = "ACTUALIZACION_LEGAJO_EXITO"
const ACTUALIZACION_LEGAJO_ERROR = "ACTUALIZACION_LEGAJO_ERROR"

const USUARIO_ASOCIADO_LOADING = 'USUARIO_ASOCIADO_LOADING'
const USUARIO_ASOCIADO_EXITO = 'USUARIO_ASOCIADO_EXITO'
const USUARIO_ASOCIADO_ERROR = 'USUARIO_ASOCIADO_ERROR'

const LOADING_USUARIO_LIDER = 'LOADING_USUARIO_LIDER'
const USUARIO_LIDER = 'USUARIO_LIDER'
const USUARIO_LIDER_ERROR = 'USUARIO_LIDER_ERROR'

//Reducers
export default function legajoReducer(state = dataInicial, action) {
  switch (action.type) {
    case LOADING_LEGAJO:
      return { ...state, loadingLegajo: action.loadingLegajo }
    case LEGAJO_EXITO:
      return { ...state, legajo: action.payload, loadingLegajo: action.loadingLegajo }
    case LEGAJO_ERROR:
        return { ...state, loadingLegajo: action.loadingLegajo }
    case ACTUALIZACION_LEGAJO_LOADING:
      return { ...state, estadoActualizacion: action.resultado }
    case ACTUALIZACION_LEGAJO_EXITO:
      return { ...state, respuestaActualizacion: action.payload, estadoActualizacion: action.resultado }
    case ACTUALIZACION_LEGAJO_ERROR:
      return { ...state, estadoActualizacion: action.resultado }
    case USUARIO_ASOCIADO_LOADING:
      return { ...state, loadingUsuarioAsociado: action.loadingUsuarioAsociado }
    case USUARIO_ASOCIADO_EXITO:
      return { ...state, usuarioAsociado: action.payload, loadingUsuarioAsociado: action.loadingUsuarioAsociado }
    case USUARIO_ASOCIADO_ERROR:
      return { ...state, loadingUsuarioAsociado: action.loadingUsuarioAsociado }  
    case LOADING_USUARIO_LIDER:
      return { ...state, loadingUsuarioLider: action.loadingUsuarioLider }
    case USUARIO_LIDER:
      return { ...state, usuarioLider: action.payload, loadingUsuarioLider: action.loadingUsuarioLider }
    case USUARIO_LIDER_ERROR:
      return { ...state, loadingUsuarioLider: action.loadingUsuarioLider }
    default:
      return { ...state }
  }
}

export const miLegajo = (token, empleadoid) => async (dispatch) => {
  dispatch({
    type: LOADING_LEGAJO,
    loadingLegajo: false,
  })

  try {
    var entidad = "new_alumnos"
    var fetch =
      "<entity name='new_alumno'>" +
      "<attribute name='new_alumnoid'/>" +
      "<attribute name='new_name'/>" +
      "<attribute name='createdon'/>" +
      "<attribute name='new_tipodocumento'/>" +
      "<attribute name='statuscode'/>" +
      "<attribute name='new_nrodocumento'/>" +
      "<attribute name='new_nombredepila'/>" +
      "<attribute name='new_segundoapellido'/>" +
      "<attribute name='new_segundonombre'/>" +
      "<attribute name='new_id'/>" +
      "<attribute name='new_gneroautopercibido' />" +
      "<attribute name='new_correoelectronico' />" +
      "<attribute name='new_apellido' />" +
      "<order attribute='new_id' descending='false'/>" +
      "<filter type='and'>" +
      "<condition attribute='statecode' operator='eq' value='0'/>" +
      "<condition attribute='new_alumnoid' operator='eq' uitype='new_empleado' value='" +
      empleadoid +
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
      type: LEGAJO_EXITO,
      payload: response.data,
      loadingLegajo: true,
    })
  } catch (error) {
    dispatch({
      type: LEGAJO_ERROR,
      loadingLegajo: true,
    })
  }
}

export const actualizacionLegajo = (token, empleadoId, datos) => async (dispatch) => {
  dispatch({
    type: ACTUALIZACION_LEGAJO_LOADING,
    resultado: "LOADING",
  });

  const toastLoading = toast.loading("Loading...");

  if (!token || Object.keys(datos).length === 0) {
    toast.dismiss(toastLoading);
    dispatch({
      type: ACTUALIZACION_LEGAJO_ERROR,
      resultado: "ERROR",
    });
    handleError("Token inválido o datos incompletos");
    return;
  }

  const payload = {
    new_empleadoid: empleadoId,
    new_estadocivil: datos.estadoCivil?.value ? Number(datos.estadoCivil.value) : 0,
    new_telefonomovil: datos.telefonoMovil?.toString(),
    new_telefonoparticular: datos.telefonoParticular?.toString(),
    new_extenciontelefonica: datos.extencionTefefonica?.toString(),
    new_paisnacimiento: datos.paisNacimiento?.value || "",
    new_calle: datos.calle || "",
    new_nro: datos.nroCalle?.toString(),
    new_piso: datos.piso?.toString(),
    new_depto: datos.depto?.toString(),
    new_localidad: datos.localidad?.value || "",
    new_codigopostal: datos.codigoPostal?.toString(),
    new_provincia: datos.provincia?.value || "",
    new_provincianacimiento: datos.provinciaNacimiento?.value || "",
    new_pais: datos.pais?.value || "",
  };

  try {
    const response = await axios.put(
      `${UrlApi}api/hrfactors/empleado`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: ACTUALIZACION_LEGAJO_EXITO,
      resultado: "EXITO",
      payload: response.data,
    });

    toast.dismiss(toastLoading);
    handleSuccess("Legajo actualizado con éxito");
    return response.data;
  } catch (error) {
    console.error(error);
    toast.dismiss(toastLoading);
    handleError(`Error: ${error.message}`);

    dispatch({
      type: ACTUALIZACION_LEGAJO_ERROR,
      resultado: "ERROR",
    });
  }
};

export const usuario = (token, correo) => async (dispatch) => {
  dispatch({
    type: USUARIO_ASOCIADO_LOADING,
    loadingUsuarioAsociado: true,
  })
  try {
    var entidad = "systemusers"
    var fetch = `<entity name="systemuser">
    <attribute name="systemuserid"/>
    <attribute name="internalemailaddress"/>
    <order attribute="fullname" descending="false"/>
    <filter type="and">
      <condition attribute="internalemailaddress" operator="eq" value="${correo}"/>
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
      type: USUARIO_ASOCIADO_EXITO,
      payload: response.data,
      loadingUsuarioAsociado: false,
    })
  } catch (error) {
    dispatch({
      type: USUARIO_ASOCIADO_ERROR,
      loadingUsuarioAsociado: false,
    })
  }
}

export const usuarioLider = (token, empleadoid) => async (dispatch) => {
  dispatch({
    type: LOADING_USUARIO_LIDER,
    loadingUsuarioLider: true,
  })
  try {

    var entidad = "new_empleados"
    var fetch = `<entity name="new_empleado">
    <attribute name="new_name"/>
    <attribute name="new_cuitcuil"/>
    <attribute name="new_correoelectronico"/>
    <attribute name="new_numerolegajo"/>
    <attribute name="new_empleadoid"/>
    <order attribute="new_numerolegajo" descending="false"/>
    <filter type="and">
      <condition attribute="new_reportaaid" operator="eq" value="${empleadoid}"/>
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
      type: USUARIO_LIDER,
      payload: response.data,
      loadingUsuarioLider: false,
    })
  } catch (error) {
    dispatch({
      type: USUARIO_LIDER_ERROR,
      loadingUsuarioLider: false,
    })
  }
}