import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resultadoPracticasDocentesAnteriores } from "@/redux/desempeno";

const useGetPracDocenteAnteriores = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const resultadoPracticasAnterioresSelector = useSelector(store => store.desempeno.resultadoPracticasAnteriores)
  const [resultadoPracticasAnteriores, setResultadoPracticasAnteriores] = useState([])
  const getPracticasAnterioresSelector = useSelector(store => store.desempeno.loadPracticasAnteriores)
  const [loadPracticasAnteriores, setoadPracticasAnteriores] = useState(false)

  useEffect(() => {
    if (token && user) {
      dispatch(resultadoPracticasDocentesAnteriores(token, user.email));
    }
  }, []);

  useEffect(() => {
    if (resultadoPracticasAnterioresSelector?.length > 0) {
      const array = []
      resultadoPracticasAnterioresSelector.forEach((element) => {
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
      })
      setResultadoPracticasAnteriores(array)
      setoadPracticasAnteriores(getPracticasAnterioresSelector)
    } else if (resultadoPracticasAnterioresSelector?.length === 0 && getPracticasAnterioresSelector) {
      setoadPracticasAnteriores(getPracticasAnterioresSelector)
      setResultadoPracticasAnteriores([])
    }
  }, [resultadoPracticasAnterioresSelector, getPracticasAnterioresSelector])

  return { resultadoPracticasAnteriores, loadPracticasAnteriores };
};
export default useGetPracDocenteAnteriores;
