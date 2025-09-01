import { AuthContext } from "@/context/AuthContext";
import { miLegajo } from "@/redux/legajo";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useMiLegajo = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const legajoSelector = useSelector((store) => store.legajo.legajo);
  const loadingLegajoSelector = useSelector((store) => store.legajo.loadingLegajo);

  const [legajo, setLegajo] = useState({});
  const [loadingLegajo, setLoadingLegajo] = useState(false);

  useEffect(() => {
    if (token && user) {
      dispatch(miLegajo(token, user.empleadoid));
    }
  }, []);

  useEffect(() => {
    if (legajoSelector?.length > 0 && loadingLegajoSelector) {
      const array = [];
      legajoSelector.forEach((item) => {
        const objeto = {
          id: item.new_alumnoid,
          new_apellidos: item.new_apellido,
          new_nombredepila: item.new_nombredepila,
          new_tipodocumento: item["new_tipodocumento@OData.Community.Display.V1.FormattedValue"],
          numeroDocumento: Number(item.new_nrodocumento),
          new_id: item.new_id,
          new_genero: item["new_gneroautopercibido@OData.Community.Display.V1.FormattedValue"],
          email: item.new_correoelectronico,
          new_segundonombre: item.new_segundonombre,
          new_segundoapellido: item.new_segundoapellido,
        };
        array.push(objeto);
      });
      setLegajo(...array);
      setLoadingLegajo(loadingLegajoSelector);
    } else if (legajoSelector?.length === 0 && loadingLegajoSelector) {
      setLegajo([]);
      setLoadingLegajo(loadingLegajoSelector);
    }
  }, [legajoSelector, loadingLegajoSelector]);

  return { legajo, loadingLegajo };
};
export default useMiLegajo;
