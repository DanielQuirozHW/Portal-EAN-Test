import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acompanamientosAulicosAnteriores } from "@/redux/desempeno";

const useGetAcompAulicosAnteriores = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const acompanamientosAnterioresSelector = useSelector(store => store.desempeno.acompanamientosAnteriores)
  const [acompanamientosAnteriores, setAcompanamientosAnteriores] = useState([])
  const getAcompanamientosAnterioresSelector = useSelector(store => store.desempeno.loadingAcompanamientosAnteriores)
  const [loadingAcompanamientosAnteriores, setLoadingAcompanamientosAnteriores] = useState(false)

  useEffect(() => {
    if (token && user) {
      dispatch(acompanamientosAulicosAnteriores(token, user.email))
    }
  }, []);

  useEffect(() => {
    if (acompanamientosAnterioresSelector?.length > 0 ) {
      const array = []
        acompanamientosAnterioresSelector.forEach(element => {
          const objeto = {
            id: element.new_observacionaulicaid,
            _new_materia_value: element["_new_materia_value@OData.Community.Display.V1.FormattedValue"],
            _new_observador_value: element["_new_observador_value@OData.Community.Display.V1.FormattedValue"],
            new_fechadelaobservacin: element["new_fechadelaobservacin@OData.Community.Display.V1.FormattedValue"],
            new_momentodelaclaseenqueseacompaa: element["new_momentodelaclaseenqueseacompaa@OData.Community.Display.V1.FormattedValue"],
            new_didacticasde1ernivel: element["new_didacticasde1ernivel@OData.Community.Display.V1.FormattedValue"],
            new_didctivasde2donivel: element["new_didctivasde2donivel@OData.Community.Display.V1.FormattedValue"],
            new_informaciondiferencial: element.new_informaciondiferencial,
            new_comentariosyfeedbackfinal: element.new_comentariosyfeedbackfinal
          }
          array.push(objeto)
        });
      setAcompanamientosAnteriores(array)
      setLoadingAcompanamientosAnteriores(getAcompanamientosAnterioresSelector)
    } else if (acompanamientosAnterioresSelector?.length === 0 && getAcompanamientosAnterioresSelector) {
      setLoadingAcompanamientosAnteriores(getAcompanamientosAnterioresSelector)
      setAcompanamientosAnteriores([])
    }
  }, [acompanamientosAnterioresSelector, getAcompanamientosAnterioresSelector])

  return { acompanamientosAnteriores, loadingAcompanamientosAnteriores };
};
export default useGetAcompAulicosAnteriores;
