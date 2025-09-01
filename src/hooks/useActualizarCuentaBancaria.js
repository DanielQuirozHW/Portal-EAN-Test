import { AuthContext } from "@/context/AuthContext";
import { cargarAdjuntoSolicitud, solucitudActualizacionCuentaBancaria } from "@/redux/solicitudes";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const handleError = (msj) => {
  toast.error(msj, {
    duration: 2500,
  });
};


const useActualizarCuentaBancaria = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const actualizarCuentaBancaria = (datos, formData, files, handleClose) => {
    dispatch(solucitudActualizacionCuentaBancaria(token, datos, user.empleadoid))
      .then((id) => {
        handleClose("cuenta bancaria");
        if (files?.length > 0 && id) {
          dispatch(cargarAdjuntoSolicitud(token, formData, id, "cuentaBancaria_id"));
        }
      })
      .catch((error) => {
        handleError(`Error ${error}`);
      });
  };

  return actualizarCuentaBancaria;
};
export default useActualizarCuentaBancaria;
