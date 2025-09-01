import { AuthContext } from "@/context/AuthContext";
import { resultadoPracticaDocente } from "@/redux/desempeno";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetResultadosPracDocente = () => {
    const { token, user } = useContext(AuthContext)
    const dispatch = useDispatch();

    const [resultadoPractica, setResultadoPractica] = useState([])
    const [loadingResultadoPractica, setLoadingResultadoPractica] = useState(false)
    const resultadoPracticaSelector = useSelector(store => store.desempeno.resultadoPractica)
    const getRESULTADOPselector = useSelector(store => store.desempeno.getResultadoP)

    useEffect(() => {
        if(token && user) {
            dispatch(resultadoPracticaDocente(token, user.email))
        }
    },[])

    useEffect(() => {
        if (resultadoPracticaSelector?.length > 0) {
            const array = []
            resultadoPracticaSelector.forEach(element => {
                const objeto = {
                    id: element.new_consolidadodeevaluacionesporperiodoid,
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
                }
                array.push(objeto)
            });
            setResultadoPractica(array)
            setLoadingResultadoPractica(getRESULTADOPselector)
        } else if (resultadoPracticaSelector?.length == 0 && getRESULTADOPselector) {
            setResultadoPractica([])
            setLoadingResultadoPractica(getRESULTADOPselector)
        }

    }, [resultadoPracticaSelector, getRESULTADOPselector])

    return { resultadoPractica, loadingResultadoPractica }
}
export default useGetResultadosPracDocente;