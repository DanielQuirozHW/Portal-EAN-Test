import axios from 'axios'
import { UrlApi, authMail, authPass } from '@/keys'

const dataInicial = {
    resultadoPractica: [],
    loadingResultadoP: false,
    getResultadoP: null,
    resultadoPracticasAnteriores: [],
    loadPracticasAnteriores: false,
    resultadoGlobal: [],
    loadingResultadoG: false,
    getResultadoG: null,
    desempenioAniosAnteriores: [],
    loadDesempenioAniosAnteriores: false,
    acompanamientos: [],
    loadingAcompanamientos: false,
    getAcompanamientos: null,
    acompanamientosAnteriores: [],
    loadingAcompanamientosAnteriores: false,
}

const LOADING_RESULTADO_P = 'LOADING_RESULTADO_P'
const RESULTADO_PRACTICA = 'RESULTADO_PRACTICA'
const RESULTADO_PRACTICA_ERROR = 'RESULTADO_PRACTICA_ERROR'

const PRACTICAS_ANTERIORES_LOADING = 'PRACTICAS_ANTERIORES_LOADING'
const PRACTICAS_ANTERIORES = 'PRACTICAS_ANTERIORES'
const PRACTICAS_ANTERIORES_ERROR = 'PRACTICAS_ANTERIORES_ERROR'

const LOADING_RESULTADO_G = 'LOADING_RESULTADO_G'
const RESULTADO_GLOBAL = 'RESULTADO_GLOBAL'
const RESULTADO_GLOBAL_ERROR = 'RESULTADO_GLOBAL_ERROR'

const DESEMPENIO_ANIOS_ANTERIORES_LOADING = 'DESEMPENIO_ANIOS_ANTERIORES_LOADING'
const DESEMPENIO_ANIOS_ANTERIORES = 'DESEMPENIO_ANIOS_ANTERIORES'
const DESEMPENIO_ANIOS_ANTERIORES_ERROR = 'DESEMPENIO_ANIOS_ANTERIORES_ERROR'


const LOADING_ACOMPANAMIENTOS = 'LOADING_ACOMPANAMIENTOS'
const ACOMPANAMIENTOS = 'ACOMPANAMIENTOS'
const ACOMPANAMIENTOS_ERROR = 'ACOMPANAMIENTOS_ERROR'

const LOADING_ACOMPANAMIENTOS_ANTERIORES = 'LOADING_ACOMPANAMIENTOS_ANTERIORES'
const ACOMPANAMIENTOS_ANTERIORES = 'ACOMPANAMIENTOS_ANTERIORES'
const ACOMPANAMIENTOS_ANTERIORES_ERROR = 'ACOMPANAMIENTOS_ANTERIORES_ERROR'

//Reducers
export default function desempenoReducer(state = dataInicial, action) {
    switch (action.type) {
        case RESULTADO_PRACTICA:
            return { ...state, resultadoPractica: action.payload, loadingResultadoP: action.loadingResultadoP, getResultadoP: true }
        case LOADING_RESULTADO_P:
            return { ...state, loadingResultadoP: action.loadingResultadoP, getResultadoP: false }
        case RESULTADO_PRACTICA_ERROR:
            return { ...state, loadingResultadoP: action.loadingResultadoP, getResultadoP: true }

        case PRACTICAS_ANTERIORES_LOADING:
            return { ...state, loadPracticasAnteriores: action.loadPracticasAnteriores }
        case PRACTICAS_ANTERIORES:
            return { ...state, resultadoPracticasAnteriores: action.payload, loadPracticasAnteriores: action.loadPracticasAnteriores }
        case PRACTICAS_ANTERIORES_ERROR:
            return { ...state, loadPracticasAnteriores: action.loadPracticasAnteriores }

        case RESULTADO_GLOBAL:
            return { ...state, resultadoGlobal: action.payload, loadingResultadoG: action.loadingResultadoG, getResultadoG: true }
        case LOADING_RESULTADO_G:
            return { ...state, loadingResultadoG: action.loadingResultadoG, getResultadoG: false }
        case RESULTADO_GLOBAL_ERROR:
            return { ...state, loadingResultadoG: action.loadingResultadoG, getResultadoG: true }

        case DESEMPENIO_ANIOS_ANTERIORES_LOADING:
            return { ...state, loadDesempenioAniosAnteriores: action.loadDesempenioAniosAnteriores }
        case DESEMPENIO_ANIOS_ANTERIORES:
            return { ...state, desempenioAniosAnteriores: action.payload, loadDesempenioAniosAnteriores: action.loadDesempenioAniosAnteriores }
        case DESEMPENIO_ANIOS_ANTERIORES_ERROR:
            return { ...state, loadDesempenioAniosAnteriores: action.loadDesempenioAniosAnteriores }

        case ACOMPANAMIENTOS:
            return { ...state, acompanamientos: action.payload, loadingAcompanamientos: action.loadingAcompanamientos, getAcompanamientos: true }
        case LOADING_ACOMPANAMIENTOS:
            return { ...state, loadingAcompanamientos: action.loadingAcompanamientos, getAcompanamientos: false }
        case ACOMPANAMIENTOS_ERROR:
            return { ...state, loadingAcompanamientos: action.loadingAcompanamientos, getAcompanamientos: true }

        case LOADING_ACOMPANAMIENTOS_ANTERIORES:
            return { ...state, loadingAcompanamientosAnteriores: action.loadingAcompanamientosAnteriores }
        case ACOMPANAMIENTOS_ANTERIORES:
            return { ...state, acompanamientosAnteriores: action.payload, loadingAcompanamientosAnteriores: action.loadingAcompanamientosAnteriores }
        case ACOMPANAMIENTOS_ANTERIORES_ERROR:
            return { ...state, loadingAcompanamientosAnteriores: action.loadingAcompanamientosAnteriores }
    
        default:
            return { ...state }
    }
}

export const resultadoPracticaDocente = (token, usuarioPortal) => async (dispatch) => {
    dispatch({
        type: LOADING_RESULTADO_P,
        loadingResultadoP: false
    })

    try {
        var entidad = "new_consolidadodeevaluacionesporperiodos"
        var fetch =
            "<entity name='new_consolidadodeevaluacionesporperiodo'>" +
            "<attribute name='new_name' />" +
            "<attribute name='createdon' />" +
            "<attribute name='new_consolidadodeevaluacionesporperiodoid' />" +
            "<attribute name='new_puestoenelranking' />" +
            "<attribute name='new_periodo' />" +
            "<attribute name='new_desempenio' />" +
            "<attribute name='new_creditostotales' />" +
            "<attribute name='new_crditosactprodcontenido' />" +
            "<attribute name='new_creditosactinvestigacion' />" +
            "<attribute name='new_creditosactgestion' />" +
            "<attribute name='new_creditosactextension' />" +
            "<attribute name='new_creditosactaulicas' />" +
            "<attribute name='new_creditosencuestasdocente' />" +
            "<attribute name='new_creditoscoevaluaciones' />" +    
            "<order attribute='new_name' descending='false' />" +
            "<link-entity name='new_empleado' from='new_empleadoid' to='new_docente' link-type='inner' alias='aa'>" +
            "<filter type='and'>" +
            "<condition attribute='new_correoelectronico' operator='eq' value='" + usuarioPortal + "' />" +
            "</filter>" +
            "</link-entity>" +
            "<link-entity name='new_periodo' from='new_periodoid' to='new_periodo' link-type='inner' alias='bg'>" +
            "<attribute name='new_publicargestiondeldesempeno' />" +
            "<filter type='and'>" +
            "<condition attribute='statuscode' operator='eq' value='1' />" +
            "</filter>" +
            "</link-entity>" +
            "<link-entity name='annotation' from='objectid' to='new_consolidadodeevaluacionesporperiodoid' link-type='outer' alias='ac'>" +
            "<attribute name='subject' />" +
            "<attribute name='notetext' />" +
            "<attribute name='filename' />" +
            "<attribute name='annotationid' />" +
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
            type: RESULTADO_PRACTICA,
            payload: response.data,
            loadingResultadoP: true
        })
    }
    catch (error) {
        console.log(error)
        dispatch({
            type: RESULTADO_PRACTICA_ERROR,
            loadingResultadoP: true
        })
    }
}

export const resultadoPracticasDocentesAnteriores = (token, correoElectronico) => async (dispatch) => {
    dispatch({
        type: PRACTICAS_ANTERIORES_LOADING,
        loadPracticasAnteriores: false
    })

    try {
        var entidad = "new_consolidadodeevaluacionesporperiodos"
        var fetch =
            "<entity name='new_consolidadodeevaluacionesporperiodo'>" +
                "<attribute name='new_name' />" +
                "<attribute name='createdon' />" +
                "<attribute name='new_consolidadodeevaluacionesporperiodoid' />" +
                "<attribute name='new_puestoenelranking' />" +
                "<attribute name='new_periodo' />" +
                "<attribute name='new_desempenio' />" +
                "<attribute name='new_creditostotales' />" +
                "<attribute name='new_crditosactprodcontenido' />" +
                "<attribute name='new_creditosactinvestigacion' />" +
                "<attribute name='new_creditosactgestion' />" +
                "<attribute name='new_creditosactextension' />" +
                "<attribute name='new_creditosactaulicas' />" +
                "<attribute name='new_creditosencuestasdocente' />" +
                "<attribute name='new_creditoscoevaluaciones' />" +    
                "<order attribute='new_name' descending='false' />" +
                "<link-entity name='new_empleado' from='new_empleadoid' to='new_docente' link-type='inner' alias='aa'>" +
                    "<filter type='and'>" +
                        "<condition attribute='new_correoelectronico' operator='eq' value='" + correoElectronico + "' />" +
                    "</filter>" +
                "</link-entity>" +
                "<link-entity name='new_periodo' from='new_periodoid' to='new_periodo' link-type='inner' alias='bg'>" +
                    "<attribute name='new_publicargestiondeldesempeno' />" +
                    "<filter type='and'>" +
                        "<condition attribute='statuscode' operator='eq' value='2' />" +
                        "<condition attribute='new_fechahasta' operator='last-year' />" +
                    "</filter>" +
                "</link-entity>" +
                "<link-entity name='annotation' from='objectid' to='new_consolidadodeevaluacionesporperiodoid' link-type='outer' alias='ac'>" +
                    "<attribute name='subject' />" +
                    "<attribute name='notetext' />" +
                    "<attribute name='filename' />" +
                    "<attribute name='annotationid' />" +
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
            type: PRACTICAS_ANTERIORES,
            payload: response.data,
            loadPracticasAnteriores: true
        })
    }
    catch (error) {
        console.log(error)
        dispatch({
            type: PRACTICAS_ANTERIORES_ERROR,
            loadPracticasAnteriores: true
        })
    }
}

export const resultadoGlobalCarrera = (token, usuarioPortal) => async (dispatch) => {
    dispatch({
        type: LOADING_RESULTADO_G,
        loadingResultadoG: true
    })

    try {
        var entidad = "new_consolidadodeevaluacionesporperiodos"
        var fetch =
            "<entity name='new_consolidadodeevaluacionesporperiodo'>" +
            "<attribute name='new_name' />" +
            "<attribute name='createdon' />" +
            "<attribute name='new_consolidadodeevaluacionesporperiodoid' />" +
            "<attribute name='new_puestoenelranking' />" +
            "<attribute name='new_periodo' />" +
            "<attribute name='new_desempenio' />" +
            "<attribute name='new_creditostotales' />" +
            "<attribute name='new_crditosactprodcontenido' />" +
            "<attribute name='new_creditosactinvestigacion' />" +
            "<attribute name='new_creditosactgestion' />" +
            "<attribute name='new_creditosactextension' />" +
            "<attribute name='new_creditosactaulicas' />" +
            "<attribute name='new_creditosencuestasdocente' />" +
            "<attribute name='new_creditoscoevaluaciones' />" +    
            "<order attribute='new_name' descending='false' />" +
            "<link-entity name='new_empleado' from='new_empleadoid' to='new_docente' link-type='inner' alias='aa'>" +
            "<filter type='and'>" +
            "<condition attribute='new_correoelectronico' operator='eq' value='" + usuarioPortal + "' />" +
            "</filter>" +
            "</link-entity>" +
            "<link-entity name='new_periodo' from='new_periodoid' to='new_periodo' link-type='inner' alias='bg'>" +
            "<attribute name='new_publicargestiondeldesempeno' />" +
            "<filter type='and'>" +
            "<condition attribute='statuscode' operator='eq' value='1' />" +
            "</filter>" +
            "</link-entity>" +
            "<link-entity name='annotation' from='objectid' to='new_consolidadodeevaluacionesporperiodoid' link-type='outer' alias='ac'>" +
            "<attribute name='subject' />" +
            "<attribute name='notetext' />" +
            "<attribute name='filename' />" +
            "<attribute name='mimetype' />" +
            "<attribute name='documentbody' />" +
            "<attribute name='annotationid' />" +
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
            type: RESULTADO_GLOBAL,
            payload: response.data,
            loadingResultadoG: false
        })
    }
    catch (error) {
        console.log(error)
        dispatch({
            type: RESULTADO_GLOBAL_ERROR,
            loadingResultadoG: false
        })
    }
}

export const desempeniosAniosAnteriores = (token, correoElectronico) => async (dispatch) => {
    dispatch({
        type: DESEMPENIO_ANIOS_ANTERIORES_LOADING,
        loadDesempenioAniosAnteriores: false
    })

    try {
        var entidad = "new_consolidadodeevaluacionesporperiodos"
        var fetch =
            "<entity name='new_consolidadodeevaluacionesporperiodo'>" +
            "<attribute name='new_name' />" +
            "<attribute name='createdon' />" +
            "<attribute name='new_consolidadodeevaluacionesporperiodoid' />" +
            "<attribute name='new_puestoenelranking' />" +
            "<attribute name='new_periodo' />" +
            "<attribute name='new_desempenio' />" +
            "<attribute name='new_creditostotales' />" +
            "<attribute name='new_crditosactprodcontenido' />" +
            "<attribute name='new_creditosactinvestigacion' />" +
            "<attribute name='new_creditosactgestion' />" +
            "<attribute name='new_creditosactextension' />" +
            "<attribute name='new_creditosactaulicas' />" +
            "<attribute name='new_creditosencuestasdocente' />" +
            "<attribute name='new_creditoscoevaluaciones' />" +    
            "<order attribute='new_name' descending='false' />" +
            "<link-entity name='new_empleado' from='new_empleadoid' to='new_docente' link-type='inner' alias='aa'>" +
                "<filter type='and'>" +
                    "<condition attribute='new_correoelectronico' operator='eq' value='" + correoElectronico + "' />" +
                "</filter>" +
            "</link-entity>" +
            "<link-entity name='new_periodo' from='new_periodoid' to='new_periodo' link-type='inner' alias='bg'>" +
                "<attribute name='new_publicargestiondeldesempeno' />" +
                "<filter type='and'>" +
                    "<condition attribute='statuscode' operator='eq' value='2' />" +
                    "<condition attribute='new_fechahasta' operator='last-year' />" +
                "</filter>" +
            "</link-entity>" +
            "<link-entity name='annotation' from='objectid' to='new_consolidadodeevaluacionesporperiodoid' link-type='outer' alias='ac'>" +
                "<attribute name='subject' />" +
                "<attribute name='notetext' />" +
                "<attribute name='filename' />" +
                "<attribute name='mimetype' />" +
                "<attribute name='documentbody' />" +
                "<attribute name='annotationid' />" +
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
            type: DESEMPENIO_ANIOS_ANTERIORES,
            payload: response.data,
            loadDesempenioAniosAnteriores: true
        })
    }
    catch (error) {
        console.log(error)
        dispatch({
            type: DESEMPENIO_ANIOS_ANTERIORES_ERROR,
            loadDesempenioAniosAnteriores: true
        })
    }
}

export const acompanamientosAulicos = (token, usuarioPortal) => async (dispatch) => {
    dispatch({
        type: LOADING_ACOMPANAMIENTOS,
        loadingAcompanamientos: true
    })

    try {
        var entidad = "new_observacionaulicas"
        var fetch =
            "<entity name='new_observacionaulica'>" +
            "<attribute name='new_observacionaulicaid' />" +
            "<attribute name='new_name' />" +
            "<attribute name='createdon' />" +
            "<attribute name='new_observador' />" +
            "<attribute name='new_momentodelaclaseenqueseacompaa' />" +
            "<attribute name='new_materia' />" +
            "<attribute name='new_fechadelaobservacin' />" +
            "<attribute name='new_diferencial' />" +
            "<attribute name='new_didctivasde2donivel' />" +
            "<attribute name='new_didacticasde1ernivel' />" +
            "<attribute name='new_informaciondiferencial'/>" +
            "<attribute name='new_descripcionfecha' />" +
            "<attribute name='new_comentariosyfeedbackfinal' />" +
            "<order attribute='new_name' descending='false' />" +
            "<filter type='and'>" +
            "<condition attribute='new_comentariosyfeedbackfinal' operator='not-null' />" +
            "</filter>" +
            "<link-entity name='new_empleado' from='new_empleadoid' to='new_docente' link-type='inner' alias='aa'>" +
            "<filter type='and'>" +
            "<condition attribute='new_correoelectronico' operator='eq' value='" + usuarioPortal + "' />" +
            // "<condition attribute='new_usuarioportalrh' operator='eq' value='36774240@docente.com' />" +
            "</filter>" +
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
            type: ACOMPANAMIENTOS,
            payload: response.data,
            loadingAcompanamientos: false
        })
        console.log(response.data)
    }
    catch (error) {
        console.log(error)
        dispatch({
            type: ACOMPANAMIENTOS_ERROR,
            loadingAcompanamientos: false
        })
    }
}

export const acompanamientosAulicosAnteriores = (token, usuarioPortal) => async (dispatch) => {
    dispatch({
        type: LOADING_ACOMPANAMIENTOS_ANTERIORES,
        loadingAcompanamientosAnteriores: false
    })

    try {
        var entidad = "new_observacionaulicas"
        var fetch =
            "<entity name='new_observacionaulica'>" +
            "<attribute name='new_observacionaulicaid' />" +
            "<attribute name='new_name' />" +
            "<attribute name='createdon' />" +
            "<attribute name='new_observador' />" +
            "<attribute name='new_momentodelaclaseenqueseacompaa' />" +
            "<attribute name='new_materia' />" +
            "<attribute name='new_fechadelaobservacin' />" +
            "<attribute name='new_diferencial' />" +
            "<attribute name='new_didctivasde2donivel' />" +
            "<attribute name='new_didacticasde1ernivel' />" +
            "<attribute name='new_informaciondiferencial'/>" +
            "<attribute name='new_descripcionfecha' />" +
            "<attribute name='new_comentariosyfeedbackfinal' />" +
            "<order attribute='new_name' descending='false' />" +
            "<filter type='and'>" +
            "<condition attribute='new_comentariosyfeedbackfinal' operator='not-null' />" +
            "<condition attribute='new_fechadelaobservacin' operator='last-year'/>" +
            "</filter>" +
            "<link-entity name='new_empleado' from='new_empleadoid' to='new_docente' link-type='inner' alias='aa'>" +
            "<filter type='and'>" +
            "<condition attribute='new_correoelectronico' operator='eq' value='" + usuarioPortal + "' />" +
            // "<condition attribute='new_usuarioportalrh' operator='eq' value='36774240@docente.com' />" +
            "</filter>" +
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
            type: ACOMPANAMIENTOS_ANTERIORES,
            payload: response.data,
            loadingAcompanamientosAnteriores: true
        })
    }
    catch (error) {
        console.log(error)
        dispatch({
            type: ACOMPANAMIENTOS_ANTERIORES_ERROR,
            loadingAcompanamientosAnteriores: true
        })
    }
}
