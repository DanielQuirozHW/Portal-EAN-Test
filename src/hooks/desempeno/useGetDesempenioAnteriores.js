import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { desempeniosAniosAnteriores } from "@/redux/desempeno";

const useGetDesempenioAnteriores = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const desempenioAniosAnterioresSelector = useSelector(store => store.desempeno.desempenioAniosAnteriores)
  const [desempenioAniosAnteriores, setDesempenioAniosAnteriores] = useState([])
  const getDesempeniosAniosAnterioresSelector = useSelector(store => store.desempeno.loadDesempenioAniosAnteriores)
  const [loadDesempenioAniosAnteriores, setLoadDesempenioAniosAnteriores] = useState(false)

  useEffect(() => {
    if (token && user) {
      dispatch(desempeniosAniosAnteriores(token, user.email))
    }
  }, []);

  useEffect(() => {
    if (desempenioAniosAnterioresSelector?.length > 0) {
      const consolidatedRecords = {}
    
      desempenioAniosAnterioresSelector.forEach((element) => {
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
      setDesempenioAniosAnteriores(consolidatedArray)
      setLoadDesempenioAniosAnteriores(getDesempeniosAniosAnterioresSelector)
    } else if (desempenioAniosAnterioresSelector?.length === 0 && getDesempeniosAniosAnterioresSelector) {
      setLoadDesempenioAniosAnteriores(getDesempeniosAniosAnterioresSelector)
      setDesempenioAniosAnteriores([])
    }
  }, [desempenioAniosAnterioresSelector, getDesempeniosAniosAnterioresSelector])

  return { desempenioAniosAnteriores, loadDesempenioAniosAnteriores };
};
export default useGetDesempenioAnteriores;
