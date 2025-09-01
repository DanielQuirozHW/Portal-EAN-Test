import { AuthContext } from "@/context/AuthContext";
import { cargarAdjuntoSolicitud, solucitudActualizacionEducacion } from "@/redux/solicitudes";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useActualizarEducacion = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const actualizarEducacion = (datos, formData, files, handleClose) => {
    dispatch(solucitudActualizacionEducacion(token, datos, user.empleadoid))
      .then((id) => {
        handleClose("educacion");
        if (files?.length > 0 && id) {
          dispatch(cargarAdjuntoSolicitud(token, formData, id, "educacionFormal_id"));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return actualizarEducacion;
};
export default useActualizarEducacion;
