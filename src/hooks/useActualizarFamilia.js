import { AuthContext } from "@/context/AuthContext";
import { cargarAdjuntoSolicitud, solucitudActualizacionFamilia } from "@/redux/solicitudes";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const useActualizarFamilia = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const actualizarFamilia = (datos, formData, files, handleClose) => {
    dispatch(solucitudActualizacionFamilia(token, datos, user.empleadoid))
      .then((id) => {
        handleClose("familia");
        if (files?.length > 0 && id) {
          dispatch(cargarAdjuntoSolicitud(token, formData, id, "familiar_id"));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return actualizarFamilia;
};
export default useActualizarFamilia;
