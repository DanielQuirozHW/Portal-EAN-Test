import { AuthContext } from "@/context/AuthContext";
import {misEvaluacionesCompletadasVencidas} from "@/redux/evaluaciones";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const useGetMisEvaluaciones = () => {
    const {token, user} = useContext(AuthContext);
    const dispatch = useDispatch();
    const fechaHoy = new Date().toISOString().slice(0, 10); // '2025-07-10'

    const [evaluacionesCV, setEvaluacionesCV] = useState([]);
    const misEvaluacionesSelector = useSelector(store => store.evaluaciones.misEvaluacionesCompletadasVencidas)
    const loadingMisEvaluaciones = useSelector(store => store.evaluaciones.loadingMisEvaluaciones)
    const [loadingEvaluacionesCV, setLoadingEvaluacionesCV] = useState(false);

    useEffect(() => {
        if(token && user) {
            dispatch(misEvaluacionesCompletadasVencidas(token, fechaHoy, user.empleadoid))
        }
    },[token,user])

    useEffect(() => {
        if (misEvaluacionesSelector.length > 0) {
            const array = []
            misEvaluacionesSelector.forEach(element => {
                const objeto = {
                    id: element.new_evaluacionid,
                    new_valoracionfinal: element.new_valoracionfinal,
                    statuscode: element["statuscode@OData.Community.Display.V1.FormattedValue"],
                    _new_evaluado_value: element["_new_evaluado_value@OData.Community.Display.V1.FormattedValue"],
                    new_tipodeevaluacion: element["new_tipodeevaluacion@OData.Community.Display.V1.FormattedValue"],
                    new_tipodeevaluacion_value: element.new_tipodeevaluacion,
                    _new_periodo_value: element["_new_periodo_value@OData.Community.Display.V1.FormattedValue"],
                    _new_materia_value: element["_new_materia_value@OData.Community.Display.V1.FormattedValue"],
                    new_fechadevencimiento: element["new_fechadevencimiento@OData.Community.Display.V1.FormattedValue"],
                    _new_evaluador_value: element._new_evaluador_value,
                    new_evaluador: element["_new_evaluador_value@OData.Community.Display.V1.FormattedValue"],
                    new_name: element.new_name,
                    new_ciclo: {
                        value: element.new_ciclo,
                        label: element["new_ciclo@OData.Community.Display.V1.FormattedValue"]
                    },
                    new_anio: element["new_anio@OData.Community.Display.V1.FormattedValue"]
                }
                array.push(objeto)
            });
            setEvaluacionesCV(array)
            setLoadingEvaluacionesCV(loadingMisEvaluaciones)
        } else if (misEvaluacionesSelector.length === 0 && loadingMisEvaluaciones) {
            setEvaluacionesCV([])
            setLoadingEvaluacionesCV(loadingMisEvaluaciones)
        }
    }, [misEvaluacionesSelector, loadingMisEvaluaciones])

    return { evaluacionesCV, loadingEvaluacionesCV }
}
export default useGetMisEvaluaciones;