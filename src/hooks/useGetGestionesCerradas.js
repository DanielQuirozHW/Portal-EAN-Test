import { AuthContext } from "@/context/AuthContext";
import { misGestionesResueltas } from "@/redux/ghResponde";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetGestionesCerradas = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const [gestionesResueltas, setGestionesResueltas] = useState([]);
  const gestionesResueltasSelector = useSelector((store) => store.ghResponde.gestionesResueltas);
  const loadgestionesResueltasSelector = useSelector((store) => store.ghResponde.loadgestionesResueltas);
  const [loadgestionesResueltas, setLoadgestionesResueltas] = useState(false);

  useEffect(() => {
    if (token && user) {
      dispatch(misGestionesResueltas(token, user.empleadoid));
    }
  }, []);

  useEffect(() => {
    if (gestionesResueltasSelector?.length > 0 && loadgestionesResueltasSelector) {
      const array = [];
      gestionesResueltasSelector.forEach((element) => {
        const objeto = {
          id: element.new_incidenciaid,
          createdon: element["createdon@OData.Community.Display.V1.FormattedValue"],
          new_fecharesolucion: element["new_fecharesolucion@OData.Community.Display.V1.FormattedValue"],
          new_name: element.new_name,
          new_resolucion: element.new_resolucion,
          new_origen: element["new_origen@OData.Community.Display.V1.FormattedValue"],
          new_tipodeincidencia: element["new_tipodeincidencia@OData.Community.Display.V1.FormattedValue"],
          new_vencimiento: element["new_vencimiento@OData.Community.Display.V1.FormattedValue"],
          _new_empleado_value: element._new_empleado_value,
          new_empleado: element["_new_empleado_value@OData.Community.Display.V1.FormattedValue"],
          _new_tema_value: element._new_tema_value,
          new_tema: element["_new_tema_value@OData.Community.Display.V1.FormattedValue"],
          statuscode: element.statuscode,
        };
        array.push(objeto);
      });
      setGestionesResueltas(array);
      setLoadgestionesResueltas(loadgestionesResueltasSelector);
    } else if (gestionesResueltasSelector?.length === 0 && loadgestionesResueltasSelector) {
      setGestionesResueltas([]);
      setLoadgestionesResueltas(loadgestionesResueltasSelector);
    }
  }, [gestionesResueltasSelector, loadgestionesResueltasSelector]);

  return { gestionesResueltas, loadgestionesResueltas };
};
export default useGetGestionesCerradas;
