import { AuthContext } from "@/context/AuthContext";
import { misGestionesAbiertas } from "@/redux/ghResponde";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetGestionesAbiertas = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const [gestionesAbiertas, setGestionesAbiertas] = useState([]);
  const gestionesAbiertasSelector = useSelector((store) => store.ghResponde.gestionesAbiertas);
  const loadingGestionesASelector = useSelector((store) => store.ghResponde.loadingGestionesAbiertas);
  const [loadingGestionesAbiertas, setGoadingGestionesAbiertas] = useState(false);

  useEffect(() => {
    if (token && user) {
      dispatch(misGestionesAbiertas(token, user.empleadoid));
    }
  }, []);

  useEffect(() => {
    if (gestionesAbiertasSelector?.length > 0 && loadingGestionesASelector) {
      const array = [];
      gestionesAbiertasSelector.forEach((element) => {
        const objeto = {
          id: element.new_incidenciaid,
          new_name: element.new_name,
          new_origen: element["new_origen@OData.Community.Display.V1.FormattedValue"],
          new_altadeincidente: element["new_altadeincidente@OData.Community.Display.V1.FormattedValue"],
          new_tipodeincidencia: element["new_tipodeincidencia@OData.Community.Display.V1.FormattedValue"],
          new_vencimiento: element["new_vencimiento@OData.Community.Display.V1.FormattedValue"],
          _new_empleado_value: element._new_empleado_value,
          new_empleado: element["_new_empleado_value@OData.Community.Display.V1.FormattedValue"],
          _new_tema_value: element._new_tema_value,
          new_tema: element["_new_tema_value@OData.Community.Display.V1.FormattedValue"],
          statuscode: element.statuscode
        };
        array.push(objeto);
      });
      setGestionesAbiertas(array);
      setGoadingGestionesAbiertas(loadingGestionesASelector);
    } else if (gestionesAbiertasSelector?.length === 0 && loadingGestionesASelector) {
      setGestionesAbiertas([]);
      setGoadingGestionesAbiertas(loadingGestionesASelector);
    }
  }, [gestionesAbiertasSelector, loadingGestionesASelector]);

  return { gestionesAbiertas, loadingGestionesAbiertas };
};
export default useGetGestionesAbiertas;
