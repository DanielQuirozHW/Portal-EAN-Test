import { UrlApi } from "@/keys";
import axios from "axios";

const dataInicial = {
  actividadAFIP: [],
  tiposDocumentos: [],
  paises: [],
  provincias: [],
  condicionAfip: [],
  loadingActividades: false,
  loadingTiposDocumentos: false,
  loadingPaises: false,
  puestos: [],
  unidadesOrganizativa: [],
  empleados: [],
  loadingEmpleados: false,
  getEmpleados: null,
  temas: [],
  loadingTemas: false,
  temasDocente: [],
  loadingtemasFiltradosDocente: false,
  temasFiltradosDocente: [],
  loadingTemasDocente: false,
  loadingLocalidades: [],
  universidades: [],
  bancos: [],
  decanatos: [],
  carreras: [],
  tipologias: [],
  parentescos: [],
  divisas: [],
  loadingDisciplinas: false,
  temasCodocente: [],
  loadingtemasFiltradosCodocente: false,
  temasFiltradosCodocente: [],
  loadingTlicencias: false,
  tLicencias: [],
  loadingCompLider: false,
  loadingCompEvaluado: false,
  competenciasLider: [],
  competenciasEvaluado: [],
  loadingLeyendaObjetivo: false,
  leyendaObjetivo: []
}
const LOADING_TIPODOCUMENTO = "LOADING_TIPODOCUMENTO"
const LOADING_ACTIVIDADES = "LOADING_ACTIVIDADES"
const LOADING_PAISES = "LOADING_PAISES"
const OBTENER_ACT_AFIP = "OBTENER_ACT_AFIP"
const TODOS_TIPDOCUMENTO_EXITO = "TODOS_TIPDOCUMENTO_EXITO"
const PAISES_FETCH_EXITO = "PAISES_FETCH_EXITO"
const PROVINCIA_EXITO = "PROVINCIA_EXITO"
const CONDICION_AFIP = "CONDICION_AFIP"

const ERROR = "ERROR";
const ERROR_ACTIVIDADES = "ERROR_ACTIVIDADES";
const ERROR_TIPODOCUMENTO = "ERROR_TIPODOCUMENTO";

const LOADING_PUESTOS = "LOADING_PUESTOS";
const PUESTOS = "PUESTOS";
const ERROR_PUESTOS = "ERROR_PUESTOS";

const LOADING_UNIDAD_ORGANIZATIVA = "LOADING_UNIDAD_ORGANIZATIVA";
const UNIDAD_ORGANIZATIVA = "UNIDAD_ORGANIZATIVA";
const ERROR_UNIDAD_ORGANIZATIVA = "ERROR_UNIDAD_ORGANIZATIVA";

const LOADING_EMPLEADOS = "LOADING_EMPLEADOS";
const EMPLEADOS = "EMPLEADOS";
const EMPLEADOS_ERROR = "EMPLEADOS_ERROR";

const LOCALIDADES_EXITO = "LOCALIDADES_EXITO";
const UNIVERSIDADES_EXITO = "UNIVERSIDADES_EXITO";
const BANCOS_EXITO = "BANCOS_EXITO";
const PARENTESCOS_EXITO = "PARENTESCOS_EXITO";
const DIVISAS_EXITO = "DIVISAS_EXITO";
const DECANATOS_EXITO = "DECANATOS_EXITO";
const CARRERAS_EXITO = "CARRERAS_EXITO";
const TIPOLOGIAS_EXITO = "TIPOLOGIAS_EXITO";

const LOADING_TEMAS = 'LOADING_TEMAS'
const TEMAS = 'TEMAS'
const TEMAS_ERROR = 'TEMAS_ERROR'

const LOADING_TEMAS_DOCENTE = 'LOADING_TEMAS_DOCENTE'
const TEMAS_DOCENTE = 'TEMAS_DOCENTE'
const TEMAS_DOCENTE_ERROR = 'TEMAS_DOCENTE_ERROR'

const TEMASFILTRADOS_DOCENTE_LOADING = "TEMASFILTRADOS_DOCENTE_LOADING"
const TEMASFILTRADOS_DOCENTE = "TEMASFILTRADOS_DOCENTE"
const TEMASFILTRADOS_DOCENTE_ERROR = "TEMASFILTRADOS_DOCENTE_ERROR"

const TEMAS_CODOCENTE_LOADING = "TEMAS_CODOCENTE_LOADING"
const TEMAS_CODOCENTE = "TEMAS_CODOCENTE"
const TEMAS_CODOCENTE_ERROR = "TEMAS_CODOCENTE_ERROR"

const TEMASFILTRADOS_CODOCENTE_LOADING = "TEMASFILTRADOS_CODOCENTE_LOADING"
const TEMASFILTRADOS_CODOCENTE = "TEMASFILTRADOS_CODOCENTE"
const TEMASFILTRADOS_CODOCENTE_ERROR = "TEMASFILTRADOS_CODOCENTE_ERROR"

const LOADING_T_LICENCIAS = "LOADING_T_LICENCIAS"
const T_LICENCIAS = "T_LICENCIAS"
const T_LICENCIAS_ERROR = "T_LICENCIAS_ERROR"

const LOADING_COMPETENCIAS_LIDER = 'LOADING_COMPETENCIAS_LIDER'
const COMPETENCIAS_LIDER = 'COMPETENCIAS_LIDER'
const COMPETENCIAS_LIDER_ERROR = 'COMPETENCIAS_LIDER_ERROR'

const LOADING_COMPETENCIAS_EVALUADO = 'LOADING_COMPETENCIAS_EVALUADO'
const COMPETENCIAS_EVALUADO = 'COMPETENCIAS_EVALUADO'
const COMPETENCIAS_EVALUADO_ERROR = 'COMPETENCIAS_EVALUADO_ERROR'

const LOADING_LEYENDA_OBJETIVOS = "LOADING_LEYENDA_OBJETIVOS"
const LEYENDA_OBJETIVOS = "LEYENDA_OBJETIVOS"
const LEYENDA_OBJETIVOS_ERROR = "LEYENDA_OBJETIVOS_ERROR"

//aca estaran todos los fetchs para los selects
export default function autocompletadosReducer(state = dataInicial, action) {
  switch (action.type) {
    case OBTENER_ACT_AFIP:
      return {
        ...state,
        actividadAFIP: action.payload,
        loadingActividades: action.loadingActividades,
      };
    case LOADING_ACTIVIDADES:
      return { ...state, loadingActividades: action.loadingActividades };
    case TODOS_TIPDOCUMENTO_EXITO:
      return {
        ...state,
        tiposDocumentos: action.payload,
        loadingTiposDocumentos: action.loadingTiposDocumentos,
      };
    case LOADING_TIPODOCUMENTO:
      return {
        ...state,
        loadingTiposDocumentos: action.loadingTiposDocumentos,
      };
    case PAISES_FETCH_EXITO:
      return {
        ...state,
        paises: action.payload,
        loadingPaises: action.loadingPaises,
      };
    case LOADING_PAISES:
      return { ...state, loadingPaises: action.loadingPaises };
    case LOCALIDADES_EXITO:
      return { ...state, loadingLocalidades: action.payload };
    case UNIVERSIDADES_EXITO:
      return { ...state, universidades: action.payload };
    case PROVINCIA_EXITO:
      return { ...state, provincias: action.payload };
    case PARENTESCOS_EXITO:
      return { ...state, parentescos: action.payload };
    case DIVISAS_EXITO:
      return { ...state, divisas: action.payload };
    case BANCOS_EXITO:
      return { ...state, bancos: action.payload };
    case DECANATOS_EXITO:
      return { ...state, decanatos: action.payload };
    case CARRERAS_EXITO:
      return { ...state, carreras: action.payload };
    case TIPOLOGIAS_EXITO:
      return { ...state, tipologias: action.payload };
    case CONDICION_AFIP:
      return { ...state, condicionAfip: action.payload };
    case PUESTOS:
      return { ...state, puestos: action.payload };
    case UNIDAD_ORGANIZATIVA:
      return { ...state, unidadesOrganizativa: action.payload }
    case EMPLEADOS:
      return { ...state, empleados: action.payload, loadingEmpleados: action.loadingEmpleados, getEmpleados: true }
    case LOADING_EMPLEADOS:
      return { ...state, loadingEmpleados: action.loadingEmpleados, getEmpleados: false }
    case EMPLEADOS_ERROR:
      return { ...state, loadingEmpleados: action.loadingEmpleados, getEmpleados: true }
    case TEMAS:
      return { ...state, temas: action.payload, loadingTemas: action.loadingTemas }
    case LOADING_TEMAS:
      return { ...state, loadingTemas: action.loadingTemas }
    case TEMAS_ERROR:
      return { ...state, loadingTemas: action.loadingTemas }
    case TEMAS_DOCENTE:
      return { ...state, temasDocente: action.payload, loadingTemasDocente: action.loadingTemasDocente }
    case LOADING_TEMAS_DOCENTE:
      return { ...state, loadingTemasDocente: action.loadingTemasDocente }
    case TEMAS_DOCENTE_ERROR:
      return { ...state, loadingTemasDocente: action.loadingTemasDocente }
    case TEMASFILTRADOS_DOCENTE_LOADING:
      return { ...state, loadingtemasFiltradosDocente: action.loadingtemasFiltradosDocente }
    case TEMASFILTRADOS_DOCENTE:
      return { ...state, temasFiltradosDocente: action.payload, loadingtemasFiltradosDocente: action.loadingtemasFiltradosDocente }
    case TEMASFILTRADOS_DOCENTE_ERROR:
      return { ...state, loadingtemasFiltradosDocente: action.loadingtemasFiltradosDocente }  
    case TEMAS_CODOCENTE_LOADING:
      return { ...state, loadingtemasCodocente: action.loadingtemasCodocente }
    case TEMAS_CODOCENTE:
      return { ...state, temasCodocente: action.payload, loadingtemasCodocente: action.loadingtemasCodocente }
    case TEMAS_CODOCENTE_ERROR:
      return { ...state, loadingtemasCodocente: action.loadingtemasCodocente }
    case TEMASFILTRADOS_CODOCENTE_LOADING:
      return { ...state, loadingtemasFiltradosCodocente: action.loadingtemasFiltradosCodocente }
    case TEMASFILTRADOS_CODOCENTE:
      return { ...state, temasFiltradosCodocente: action.payload, loadingtemasFiltradosCodocente: action.loadingtemasFiltradosCodocente }
    case TEMASFILTRADOS_CODOCENTE_ERROR:
      return { ...state, loadingtemasFiltradosCodocente: action.loadingtemasFiltradosCodocente }
    case LOADING_T_LICENCIAS:
      return { ...state, loadingTlicencias: action.loadingTlicencias }
    case T_LICENCIAS:
      return { ...state, tLicencias: action.payload, loadingTlicencias: action.loadingTlicencias }
    case T_LICENCIAS_ERROR:
      return { ...state, loadingTlicencias: action.loadingTlicencias }
    case LOADING_COMPETENCIAS_LIDER:
      return { ...state, loadingCompLider: action.loadingCompLider }
    case COMPETENCIAS_LIDER:
      return { ...state, competenciasLider: action.payload, loadingCompLider: action.loadingCompLider }
    case COMPETENCIAS_LIDER_ERROR:
      return { ...state, loadingCompLider: action.loadingCompLider }
    case LOADING_COMPETENCIAS_EVALUADO:
      return { ...state, loadingCompEvaluado: action.loadingCompEvaluado }
    case COMPETENCIAS_EVALUADO:
      return { ...state, competenciasEvaluado: action.payload, loadingCompEvaluado: action.loadingCompEvaluado }
    case COMPETENCIAS_EVALUADO_ERROR:
      return { ...state, loadingCompEvaluado: action.loadingCompEvaluado }
    case LOADING_LEYENDA_OBJETIVOS:
      return { ...state, loadingLeyendaObjetivo: action.loadingLeyendaObjetivo }
    case LEYENDA_OBJETIVOS:
      return { ...state, leyendaObjetivo: action.payload, loadingLeyendaObjetivo: action.loadingLeyendaObjetivo }
    case LEYENDA_OBJETIVOS_ERROR:
      return { ...state, loadingLeyendaObjetivo: action.loadingLeyendaObjetivo }
    default:
      return { ...state };
  }
}

export const obtenerActividadesAFIP = (token) => async (dispatch) => {
  dispatch({
    type: LOADING_ACTIVIDADES,
    loadingActividades: true,
  });

  try {
    var entidad = "new_actividadafips";
    var fetch =
      "<entity name='new_actividadafip'>" +
      "<attribute name='new_name' />" +
      "<attribute name='new_codigo' />" +
      "<attribute name='new_actividadafipid' />" +
      "<order attribute='new_name' descending='false' />" +
      "<filter type='and'>" +
      "<condition attribute='statecode' operator='eq' value='0' />" +
      "</filter>" +
      "</entity>";

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
    );
    dispatch({
      type: OBTENER_ACT_AFIP,
      payload: response.data,
      loadingActividades: false,
    });
  } catch (error) {
    dispatch({
      type: ERROR_ACTIVIDADES,
      loadingActividades: false,
    });
  }
};

export const obtenerTipoDeDocumentos = (token) => async (dispatch) => {
  dispatch({
    type: LOADING_TIPODOCUMENTO,
    loadingTiposDocumentos: true,
  });

  try {
    var entidad = "new_tipodedocumentos";
    var fetch =
      "<entity name='new_tipodedocumento'>" +
      "<attribute name='new_name' />" +
      "<attribute name='new_codigo' />" +
      "<attribute name='new_tipodedocumentoid' />" +
      "<attribute name='new_onboarding' />" +
      "<order attribute='new_name' descending='false' />" +
      "<filter type='and'>" +
      "<condition attribute='statecode' operator='eq' value='0' />" +
      // "<condition attribute='new_onboarding' operator='eq' value='1' />" +
      "</filter>" +
      "</entity>";

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
    );
    dispatch({
      type: TODOS_TIPDOCUMENTO_EXITO,
      payload: response.data,
      loadingTiposDocumentos: false,
    });
  } catch (error) {
    dispatch({
      type: ERROR_TIPODOCUMENTO,
      loadingTiposDocumentos: false,
    });
  }
};

export const obtenerPaises = (token) => async (dispatch) => {
  dispatch({ type: LOADING_PAISES, loadingPaises: true });

  if (!token) {
    dispatch({ type: ERROR, loadingPaises: false });
    return;
  }

  const entidad = "new_paises";
  const fetch = `
    <entity name='new_pais'>
      <attribute name='new_paisid'/>
      <attribute name='new_name'/>
      <attribute name='createdon'/>
      <order attribute='new_name' descending='false'/>
    </entity>
  `;

  try {
    const response = await axios.post(
      `${UrlApi}api/consultafetchs`,
      { entidad, fetch },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch({
      type: PAISES_FETCH_EXITO,
      payload: response.data,
      loadingPaises: false,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: ERROR,
      loadingPaises: false,
    });
  }
};

export const obtenerCondicionAnteAfip = (token) => async (dispatch) => {
  try {
    var entidad = "new_condiciondeinscipcionanteafips";
    var fetch =
      "<entity name='new_condiciondeinscipcionanteafip'>" +
      "<attribute name='new_condiciondeinscipcionanteafipid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<order attribute='new_name' descending='false' />" +
      "<filter type='and'>" +
      "<condition attribute='statecode' operator='eq' value='0' />" +
      "</filter>" +
      "</entity>";

    await axios
      .post(
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
      .then((response) => {
        dispatch({
          type: CONDICION_AFIP,
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    dispatch({
      type: ERROR,
    });
  }
};

export const obtenerPuestos = (token) => async (dispatch) => {
  dispatch({
    type: LOADING_PUESTOS,
  });
  try {
    var entidad = "new_cargos";
    var fetch =
      "<entity name='new_cargo'>" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<attribute name='new_cargoid' />" +
      "<order attribute='new_name' descending='false' />" +
      "</entity>";

    await axios
      .post(
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
      .then((response) => {
        dispatch({
          type: PUESTOS,
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    dispatch({
      type: ERROR_PUESTOS,
    });
  }
};

export const obtenerUnidadOrganizativa = (token) => async (dispatch) => {
  dispatch({
    type: LOADING_UNIDAD_ORGANIZATIVA,
  });
  try {
    var entidad = "new_unidadorganigramas";
    var fetch =
      "<entity name='new_unidadorganigrama'>" +
      "<attribute name='new_unidadorganigramaid' />" +
      "<attribute name='new_name' />" +
      "<attribute name='createdon' />" +
      "<order attribute='new_name' descending='false' />" +
      "<filter type='and'>" +
      "<condition attribute='statecode' operator='eq' value='0' />" +
      "</filter>" +
      "</entity>";

    await axios
      .post(
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
      .then((response) => {
        dispatch({
          type: UNIDAD_ORGANIZATIVA,
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    dispatch({
      type: ERROR_UNIDAD_ORGANIZATIVA,
    });
  }
};

export const obtenerEmpleados = (token) => async (dispatch) => {
  dispatch({
    type: LOADING_EMPLEADOS,
    loadingEmpleados: true
  })

  try {
    var entidad = "new_empleados";
    var fetch =
      "<entity name='new_empleado'>" +
      "<attribute name='new_name'/>" +
      "<attribute name='new_numerolegajo'/>" +
      "<attribute name='new_posicin'/>" +
      "<attribute name='new_telefonomovil'/>" +
      "<attribute name='new_correoelectronico'/>" +
      "<attribute name='new_empresa'/>" +
      "<attribute name='new_empleadoid'/>" +
      "<order attribute='new_numerolegajo' descending='false'/>" +
      "<filter type='and'>" +
      "<condition attribute='statecode' operator='eq' value='0'/>" +
      "</filter>" +
      "<link-entity name='new_posicion' from='new_posicionid' to='new_posicin' visible='false' link-type='outer' alias='a_a1e362a20ce2ea11a813002248360dfb'>" +
      "<attribute name='new_unidadorganizativa'/>" +
      "</link-entity>" +
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
      type: EMPLEADOS,
      payload: response.data,
      loadingEmpleados: false
    })
  }
  catch (error) {
    dispatch({
      type: EMPLEADOS_ERROR,
      loadingEmpleados: false
    })
  }
}

export const obtenerTemas = (token) => async (dispatch) => {
  dispatch({
    type: LOADING_TEMAS,
    loadingTemas: true
  })

  try {
    var entidad = "new_temas"
    var fetch =
      "<entity name='new_tema'>" +
      "<attribute name='new_name'/>" +
      "<attribute name='new_temaid'/>" +
      "<order attribute='new_name' descending='false'/>" +
      "<filter type='and'>" +
      "<condition attribute='new_seleccionable' operator='eq' value='1'/>" +
      "<condition attribute='statecode' operator='eq' value='0'/>" +
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
      type: TEMAS,
      payload: response.data,
      loadingTemas: false
    })
  }
  catch (error) {
    dispatch({
      type: TEMAS_ERROR,
      loadingTemas: false
    })
  }
}

export const obtenerTemasDocente = (token) => async (dispatch) => {
  dispatch({
    type: LOADING_TEMAS_DOCENTE,
    loadingTemasDocente: true
  })

  try {
    var entidad = "new_temaprimarios"
      var fetch = `<entity name="new_temaprimario">
      <attribute name="new_temaprimarioid"/>
      <attribute name="new_name"/>
      <attribute name="createdon"/>
      <order attribute="new_name" descending="false"/>
      <filter type="and">
      <condition attribute="statecode" operator="eq" value="0"/>
      <condition attribute="new_alcance" operator="contain-values">
      <value>100000000</value>
      </condition>
      <condition attribute="statecode" operator="eq" value="0"/>
      </filter>
      </entity>`;

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
      type: TEMAS_DOCENTE,
      payload: response.data,
      loadingTemasDocente: false
    })
  }
  catch (error) {
    dispatch({
      type: TEMAS_DOCENTE_ERROR,
      loadingTemasDocente: false
    })
  }
}

export const obtenerTemasFiltradosDocente = (token, id) => async (dispatch) => {
  dispatch({
    type: TEMASFILTRADOS_DOCENTE_LOADING,
    loadingtemasFiltradosDocente: true
  })

  try {
    var entidad = "new_temas"
    var fetch = `<entity name="new_tema">
    <attribute name="new_temaid"/>
    <attribute name="new_name"/>
    <attribute name="createdon"/>
    <attribute name="new_temaprimarioreal"/>
    <order attribute="new_name" descending="false"/>
    <filter type="and">
      <condition attribute="new_alcance" operator="contain-values">
        <value>100000000</value>
      </condition>
      <condition attribute="statecode" operator="eq" value="0"/>
      <condition attribute="new_temaprimarioreal" operator="eq" uitype="new_temaprimario" value="${id}"/>
    </filter>
    </entity>`;

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
      type: TEMASFILTRADOS_DOCENTE,
      payload: response.data,
      loadingtemasFiltradosDocente: false
    })
  }
  catch (error) {
    dispatch({
      type: TEMASFILTRADOS_DOCENTE_ERROR,
      loadingtemasFiltradosDocente: false
    })
  }
}


export const obtenerTipoLicenciaVacaciones = (token) => async (dispatch) => {
  dispatch({
    type: LOADING_T_LICENCIAS,
    loadingTlicencias: true
  })

  try {
    var entidad = "new_tipodelicencias"
    var fetch = `
    <entity name="new_tipodelicencia">
    <attribute name="new_name"/>
    <attribute name="new_segmento"/>
    <attribute name="new_codigo"/>
    <order attribute="new_name" descending="false"/>
    <attribute name="new_validador"/>
    <attribute name="new_requierevalidacin"/>
    <attribute name="new_requiereaprobacin"/>
    <attribute name="new_cantidaddiascorrespleyanuales"/>
    <attribute name="new_cantdiashabilescorrespporley"/>
    <attribute name="new_tipodelicenciaid"/>
    <filter type="and">
    <condition attribute="statecode" operator="eq" value="0"/>
    <condition attribute="new_tipodelicenciaid" operator="in">
    <value uiname="Vacaciones" uitype="new_tipodelicencia">{e6839ddc-6314-eb11-a813-000d3ac0aefa}</value>
    <value uiname="Vacaciones Fuera Período General" uitype="new_tipodelicencia">{e750a89a-a431-ec11-b6e6-0022483765e3}</value>
    </condition>
    </filter>
    </entity>`;

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
      type: T_LICENCIAS,
      payload: response.data,
      loadingTlicencias: false
    })
  }
  catch (error) {
    dispatch({
      type: T_LICENCIAS_ERROR,
      loadingTlicencias: false
    })
  }
}

export const obtenerProvincias = (token) => async (dispatch) => {
  if (!token) {
    return;
  }

  const entidad = "new_provincias";
  const fetch = `
    <entity name='new_provincia'>
      <attribute name='new_provinciaid'/>
      <attribute name='new_name'/>
      <attribute name='createdon'/>
      <order attribute='new_name' descending='false'/>
      <filter type='and'>
        <condition attribute='statecode' operator='eq' value='0'/>
      </filter>
    </entity>
  `;

  try {
    const response = await axios.post(
      `${UrlApi}api/consultafetchs`,
      { entidad, fetch },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    dispatch({
      type: PROVINCIA_EXITO,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: ERROR });
  }
};

export const obtenerLocalidades = (token) => async (dispatch) => {
  if (!token) {
    dispatch({ type: ERROR });
    return;
  }

  const entidad = "new_localidads";
  const fetch = `
    <entity name='new_localidad'>
      <attribute name='new_localidadid' />
      <attribute name='new_name' />
      <attribute name='createdon' />
      <order attribute='new_name' descending='false' />
    </entity>
  `;

  try {
    const response = await axios.post(
      `${UrlApi}api/consultafetchs`,
      { entidad, fetch },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch({
      type: LOCALIDADES_EXITO,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: ERROR });
  }
};

export const obtenerUniversidades = (token) => async (dispatch) => {
  if (token) {
    try {
      var entidad = "new_universidads";
      var fetch =
        "<entity name='new_universidad'>" +
        "<attribute name='new_universidadid' />" +
        "<attribute name='new_name' />" +
        "<attribute name='createdon' />" +
        "<order attribute='new_name' descending='false' />" +
        "</entity>";

      await axios
        .post(
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
        .then((response) => {
          dispatch({
            type: UNIVERSIDADES_EXITO,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      dispatch({
        type: ERROR,
      });
    }
  }
};

export const obtenerBancos = (token) => async (dispatch) => {
  if (token) {
    try {
      var entidad = "new_bancos";
      var fetch =
        "<entity name='new_banco'>" +
        "<attribute name='new_name' />" +
        "<attribute name='new_codigo' />" +
        "<attribute name='new_bancoid' />" +
        "<order attribute='new_name' descending='false' />" +
        "</entity>";

      await axios
        .post(
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
        .then((response) => {
          dispatch({
            type: BANCOS_EXITO,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      dispatch({
        type: ERROR,
      });
    }
  }
};

export const obtenerDecanatos = (token) => async (dispatch) => {
  if (token) {
    try {
      var entidad = "new_unidadorganigramas"
      var fetch = `<entity name="new_unidadorganigrama">
      <attribute name="new_unidadorganigramaid"/>
      <attribute name="new_name"/>
      <attribute name="createdon"/>
      <order attribute="new_name" descending="false"/>
      <filter type="and">
        <condition attribute="statecode" operator="eq" value="0"/>
        <condition attribute="new_name" operator="like" value="%decanato%"/>
      </filter>
      </entity>`;

      await axios
        .post(
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
        .then((response) => {
          dispatch({
            type: DECANATOS_EXITO,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      dispatch({
        type: ERROR,
      });
    }
  }
};

export const obtenerCarreras = (token) => async (dispatch) => {
  if (token) {
    try {
      var entidad = "new_carrerases"
      var fetch = `<entity name="new_carreras">
      <attribute name="new_carrerasid"/>
      <attribute name="new_name"/>
      <attribute name="createdon"/>
      <order attribute="new_name" descending="false"/>
      <filter type="and">
        <condition attribute="statecode" operator="eq" value="0"/>
      </filter>
      </entity>`;

      await axios
        .post(
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
        .then((response) => {
          dispatch({
            type: CARRERAS_EXITO,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      dispatch({
        type: ERROR,
      });
    }
  }
};

export const obtenerTipologias = (token) => async (dispatch) => {
  if (token) {
    try {
      var entidad = "new_tipologias"
      var fetch = `<entity name="new_tipologia">
      <attribute name="new_name"/>
      <attribute name="new_cantidadmateriasactivasasociadas"/>
      <attribute name="new_tipologiaid"/>
      <order attribute="new_name" descending="false"/>
      <filter type="and">
      <condition attribute="statecode" operator="eq" value="0"/>
      <filter type="or">
        <condition attribute="new_name" operator="eq" value="ELECTIVA"/>
        <condition attribute="new_name" operator="eq" value="MEC"/>
        <condition attribute="new_name" operator="eq" value="MIP"/>
        <condition attribute="new_name" operator="eq" value="MIA"/>
        <condition attribute="new_name" operator="eq" value="PROCESO"/>
        <condition attribute="new_name" operator="eq" value="PROGRAMÁTICA"/>
      </filter>
      </filter>
      </entity>
      `;

      await axios
        .post(
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
        .then((response) => {
          dispatch({
            type: TIPOLOGIAS_EXITO,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      dispatch({
        type: ERROR,
      });
    }
  }
};

export const obtenerParentescos = (token) => async (dispatch) => {
  if (token) {
    try {
      var entidad = "new_parentescos";
      var fetch =
        "<entity name='new_parentesco'>" +
        "<attribute name='new_parentescoid' />" +
        "<attribute name='new_name' />" +
        "<attribute name='createdon' />" +
        "<order attribute='new_name' descending='false' />" +
        "</entity>";

      await axios
        .post(
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
        .then((response) => {
          dispatch({
            type: PARENTESCOS_EXITO,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      dispatch({
        type: ERROR,
      });
    }
  }
};

export const obtenerDvisas = (token) => async (dispatch) => {
  if (token) {
    try {
      var entidad = "transactioncurrencies";
      var fetch =
        "<entity name='transactioncurrency'>" +
        "<attribute name='transactioncurrencyid' />" +
        "<attribute name='currencyname' />" +
        "<attribute name='isocurrencycode' />" +
        "<attribute name='currencysymbol' />" +
        "<attribute name='exchangerate' />" +
        "<attribute name='currencyprecision' />" +
        "<order attribute='currencyname' descending='false' />" +
        "</entity>";

      await axios
        .post(
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
        .then((response) => {
          dispatch({
            type: DIVISAS_EXITO,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      dispatch({
        type: ERROR,
      });
    }
  }
};

export const obtenerTemasCodocente = (token) => async (dispatch) => {
  dispatch({
    type: TEMAS_CODOCENTE_LOADING,
    loadingtemasCodocente: true
  })

  try {
    var entidad = "new_temaprimarios"
    var fetch = `<entity name="new_temaprimario">
    <attribute name="new_temaprimarioid"/>
    <attribute name="new_name"/>
    <attribute name="createdon"/>
    <order attribute="new_name" descending="false"/>
    <filter type="and">
    <condition attribute="statecode" operator="eq" value="0"/>
    <condition attribute="new_alcance" operator="contain-values">
    <value>100000001</value>
    </condition>
    <condition attribute="statecode" operator="eq" value="0"/>
    </filter>
    </entity>`;

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
      type: TEMAS_CODOCENTE,
      payload: response.data,
      loadingtemasCodocente: false
    })
  }
  catch (error) {
    dispatch({
      type: TEMAS_CODOCENTE_ERROR,
      loadingtemasCodocente: false
    })
  }
}

export const obtenerTemasFiltradosCodocente = (token, id) => async (dispatch) => {
  dispatch({
    type: TEMASFILTRADOS_CODOCENTE_LOADING,
    loadingtemasFiltradosCodocente: true
  })

  try {
    var entidad = "new_temas"
    var fetch = `<entity name="new_tema">
    <attribute name="new_temaid"/>
    <attribute name="new_name"/>
    <attribute name="createdon"/>
    <attribute name="new_temaprimarioreal"/>
    <order attribute="new_name" descending="false"/>
    <filter type="and">
    <condition attribute="new_alcance" operator="contain-values">
    <value>100000001</value>
    </condition>
    <condition attribute="statecode" operator="eq" value="0"/>
    <condition attribute="new_temaprimarioreal" operator="eq" uitype="new_temaprimario" value="${id}"/>
    </filter>
    </entity>`;

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
      type: TEMASFILTRADOS_CODOCENTE,
      payload: response.data,
      loadingtemasFiltradosCodocente: false
    })
  }
  catch (error) {
    dispatch({
      type: TEMASFILTRADOS_CODOCENTE_ERROR,
      loadingtemasFiltradosCodocente: false
    })
  }
}

export const obtenerCompetenciasLider = (token) => async (dispatch) => {
  dispatch({
    type: LOADING_COMPETENCIAS_LIDER,
    loadingCompLider: true
  })

  try {
    var entidad = "new_competencias"
    var fetch = `
    <entity name="new_competencia">
    <attribute name="statecode"/>
    <attribute name="new_name"/>
    <attribute name="new_descripcion"/>
    <attribute name="new_codigo"/>
    <order attribute="new_codigo" descending="false"/>
    <order attribute="new_areadecompetencia" descending="false"/>
    <attribute name="new_competenciaid"/>
    <attribute name="new_aplicaevaluacionliderpgd"/>
    <attribute name="new_aplicaevaluacionpgd"/>
    <filter type="and">
    <condition attribute="statecode" operator="eq" value="0"/>
    <filter type="and">
    <condition attribute="new_aplicaevaluacionliderpgd" operator="eq" value="1"/>
    </filter>
    </filter>
    </entity>`;

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
      type: COMPETENCIAS_LIDER,
      payload: response.data,
      loadingCompLider: false
    })
  }
  catch (error) {
    dispatch({
      type: COMPETENCIAS_LIDER_ERROR,
      loadingCompLider: false
    })
  }
}

export const obtenerCompetenciasEvaluado = (token) => async (dispatch) => {
  dispatch({
    type: LOADING_COMPETENCIAS_EVALUADO,
    loadingCompEvaluado: true
  })

  try {
    var entidad = "new_competencias"
    var fetch = `
<entity name="new_competencia">
<attribute name="statecode"/>
<attribute name="new_name"/>
<attribute name="new_descripcion"/>
<attribute name="new_codigo"/>
<order attribute="new_codigo" descending="false"/>
<order attribute="new_areadecompetencia" descending="false"/>
<attribute name="new_competenciaid"/>
<attribute name="new_aplicaevaluacionliderpgd"/>
<attribute name="new_aplicaevaluacionpgd"/>
<filter type="and">
<condition attribute="statecode" operator="eq" value="0"/>
<filter type="and">
<condition attribute="new_aplicaevaluacionpgd" operator="eq" value="1"/>
</filter>
</filter>
</entity>`;

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
      type: COMPETENCIAS_EVALUADO,
      payload: response.data,
      loadingCompEvaluado: false
    })
  }
  catch (error) {
    dispatch({
      type: COMPETENCIAS_EVALUADO_ERROR,
      loadingCompEvaluado: false
    })
  }
}

export const obtenerLeyendasObjetivos = (token) => async (dispatch) => {
  dispatch({
    type: LOADING_LEYENDA_OBJETIVOS,
    loadingLeyendaObjetivo: true
  })

  try {
    var entidad = "new_maestrodeleyendaspgds"
    var fetch = `
    <entity name="new_maestrodeleyendaspgd">
    <attribute name="new_maestrodeleyendaspgdid"/>
    <attribute name="new_name"/>
    <attribute name="createdon"/>
    <attribute name="new_resultadoclavedeobjetivo"/>
    <attribute name="new_pesodeobjetivo"/>
    <attribute name="new_nombredeobjetivo"/>
    <attribute name="new_competenciadeobjetivo"/>
    <attribute name="new_autoevaluacionintroduccion"/>
    <attribute name="new_evaluacinintroduccin"/>
    <order attribute="new_name" descending="false"/>
    <filter type="and">
    <condition attribute="statecode" operator="eq" value="0"/>
    </filter>
    </entity>`;

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
      type: LEYENDA_OBJETIVOS,
      payload: response.data,
      loadingLeyendaObjetivo: false
    })
  }
  catch (error) {
    dispatch({
      type: LEYENDA_OBJETIVOS_ERROR,
      loadingLeyendaObjetivo: false
    })
  }
}