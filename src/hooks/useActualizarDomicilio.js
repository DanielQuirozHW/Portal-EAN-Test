import { AuthContext } from "@/context/AuthContext";
import { cargarAdjuntoSolicitud, solucitudActualizacionDomicilio } from "@/redux/solicitudes";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useActualizarDomicilio = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const actualizarDomicilio = (datos, formData, files, handleClose) => {
    dispatch(solucitudActualizacionDomicilio(token, datos, user.empleadoid))
      .then((id) => {
        handleClose("domicilio");
        if (files?.length > 0 && id) {
          dispatch(cargarAdjuntoSolicitud(token, formData, id, "cambioDomicilio_id"));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return actualizarDomicilio;
};
export default useActualizarDomicilio;
