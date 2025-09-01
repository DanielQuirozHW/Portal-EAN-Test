import { AuthContext } from "@/context/AuthContext";
import { resultadoGlobalCarrera } from "@/redux/desempeno";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetResGlobalCarrera= () => {
    const { token, user } = useContext(AuthContext)
    const dispatch = useDispatch();

    const [resultadoGlobal, setResultadoGlobal] = useState([])
    const [loadingResultadoGlobal, setLoadingResultadoGlobal] = useState(false)
    const resultadoGlobalSelector = useSelector(store => store.desempeno.resultadoGlobal)
    const getRESULTADOGselector = useSelector(store => store.desempeno.getResultadoG)

    useEffect(() => {
        if(token && user) {
            dispatch(resultadoGlobalCarrera(token, user.email))
        }
    },[token, user])

    useEffect(() => {
        if (resultadoGlobalSelector?.length > 0) {
            const consolidatedRecords = {}
    
            resultadoGlobalSelector.forEach((element) => {
                const id = element.new_consolidadodeevaluacionesporperiodoid;
        
                if (!consolidatedRecords[id]) {
                consolidatedRecords[id] = {
                    id,
                    _new_periodo_value: element["_new_periodo_value@OData.Community.Display.V1.FormattedValue"],
                    new_creditostotales: element["new_creditostotales@OData.Community.Display.V1.FormattedValue"],
                    new_desempenio: element["new_desempenio@OData.Community.Display.V1.FormattedValue"],
                    new_name: element.new_name,
                    new_crditosactprodcontenido: element["new_crditosactprodcontenido@OData.Community.Display.V1.FormattedValue"],
                    new_creditosactaulicas: element["new_creditosactaulicas@OData.Community.Display.V1.FormattedValue"],
                    new_creditosactextension: element["new_creditosactextension@OData.Community.Display.V1.FormattedValue"],
                    new_creditosactgestion: element["new_creditosactgestion@OData.Community.Display.V1.FormattedValue"],
                    new_creditosactinvestigacion: element["new_creditosactinvestigacion@OData.Community.Display.V1.FormattedValue"],
                    new_creditosencuestasdocente: element["new_creditosencuestasdocente@OData.Community.Display.V1.FormattedValue"],
                    new_creditoscoevaluaciones: element["new_creditoscoevaluaciones@OData.Community.Display.V1.FormattedValue"],
                    annotations: [],
                };
                }
        
                // Agregar las anotaciones
                if (element["ac.annotationid"]) {
                consolidatedRecords[id].annotations.push({
                    annotationid: element["ac.annotationid"],
                    documentbody: element["ac.documentbody"],
                    filename: element["ac.filename"],
                    mimetype: element["ac.mimetype"],
                });
                }
            });

            const consolidatedArray = Object.values(consolidatedRecords);

            setResultadoGlobal(consolidatedArray)
            setLoadingResultadoGlobal(getRESULTADOGselector)
        } else if (resultadoGlobalSelector?.length == 0 && getRESULTADOGselector) {
            setResultadoGlobal([])
            setLoadingResultadoGlobal(getRESULTADOGselector)
        }

    }, [resultadoGlobalSelector, getRESULTADOGselector])

    return { resultadoGlobal, loadingResultadoGlobal }
}
export default useGetResGlobalCarrera;