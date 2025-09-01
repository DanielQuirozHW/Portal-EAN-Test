import { AuthContext } from "@/context/AuthContext";
import {evaluacionesPend} from "@/redux/evaluaciones";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const useGetEvaluacionesPendientes = () => {
    const {token, user} = useContext(AuthContext);
    const dispatch = useDispatch();
    const fechaHoy = new Date().toISOString().slice(0, 10); // '2025-07-10'


    const [evaluacionesPendientes, setEvaluaciones] = useState([]);
    const evaluacionesSelector = useSelector(store => store.evaluaciones.evaluacionesPendientes)
    const loadingEvaluacionesSelector = useSelector(store => store.evaluaciones.loadingEvaluacionesPendientes)
    const [loadingEvaluacionesPendientes, setLoadingEvaluacionesPendientes] = useState(false);

    useEffect(() => {
        if(token && user) {
            dispatch(evaluacionesPend(token, fechaHoy, user.empleadoid))
        }
    },[token,user])

    useEffect(() => {
        if (evaluacionesSelector.length > 0) {
            const array = []
            evaluacionesSelector.forEach(element => {
                const objeto = {
                    id: element.new_evaluacionid,
                    _new_evaluado_value: element["_new_evaluado_value@OData.Community.Display.V1.FormattedValue"],
                    new_tipodeevaluacion: element["new_tipodeevaluacion@OData.Community.Display.V1.FormattedValue"],
                    new_tipodeevaluacion_value: element.new_tipodeevaluacion,
                    _new_periodo_value: element["_new_periodo_value@OData.Community.Display.V1.FormattedValue"],
                    _new_materia_value: element["_new_materia_value@OData.Community.Display.V1.FormattedValue"],
                    new_fechadevencimiento: element["new_fechadevencimiento@OData.Community.Display.V1.FormattedValue"],
                    _new_evaluador_value: element._new_alumnoevaluador_value,
                    new_evaluador: element["_new_alumnoevaluador_value@OData.Community.Display.V1.FormattedValue"],
                    new_name: element.new_name,
                    new_ciclo: {
                        value: element.new_ciclo,
                        label: element["new_ciclo@OData.Community.Display.V1.FormattedValue"]
                    },
                    new_anio: element["new_anio@OData.Community.Display.V1.FormattedValue"]

                }
                array.push(objeto)
            });
            setEvaluaciones(array);
            setLoadingEvaluacionesPendientes(loadingEvaluacionesSelector);
        } else if (evaluacionesSelector.length === 0 && loadingEvaluacionesSelector) {
            setEvaluaciones([]);
            setLoadingEvaluacionesPendientes(loadingEvaluacionesSelector);
        }
    },[evaluacionesSelector, loadingEvaluacionesSelector])

    return { evaluacionesPendientes, loadingEvaluacionesPendientes }
}
export default useGetEvaluacionesPendientes;
