import { AuthContext } from "@/context/AuthContext";
import { cargarAdjuntoSolicitud, solucitudActualizacionEstadoCivil } from "@/redux/solicitudes";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useActualizarEstadoCivil = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const actualizarEstadoCivil = (datos, formData, files, handleClose) => {
    dispatch(solucitudActualizacionEstadoCivil(token, datos, user.empleadoid))
      .then((id) => {
        handleClose("estado civil");
        if (files?.length > 0 && id) {
          dispatch(cargarAdjuntoSolicitud(token, formData, id, "estadoCivil_id"));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return actualizarEstadoCivil;
};
export default useActualizarEstadoCivil;
