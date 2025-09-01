import { actualizacionLegajo, miLegajo } from "@/redux/legajo";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useActualizarLegajo = () => {
    const { token, user } = useContext(AuthContext);
    const dispatch = useDispatch();

    const actualizarLegajo = (datos) => {
        dispatch(actualizacionLegajo(token, user.empleadoid, datos))
          .then((id) => {
              dispatch(miLegajo(token, user.empleadoid))
          })
      };

      return actualizarLegajo
}
export default useActualizarLegajo