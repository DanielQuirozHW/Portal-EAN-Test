import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "@/context/AuthContext";
import {
    clearSolicitudInfo,
  miSolicitudActualizacionCuentaBancaria,
  miSolicitudActualizacionEducacion,
  miSolicitudActualizacionFamiliar,
  miSolicitudCambioDomicilio,
  miSolicitudCambioEstadoCivil,
} from "@/redux/solicitudes";

const useGetSolicitudes = (tipoSolicitud) => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const solicitudSelector = useSelector((store) => store.solicitudes.solicitud);
  const loadSolicitudSelector = useSelector((store) => store.solicitudes.getSolicitud);
  const [solicitud, setSolicitud] = useState([]);
  const [loadSolicitud, setLoadSolicitud] = useState(false);

  useEffect(() => {
    if (token && Object.keys(user).length > 0) {
      if (tipoSolicitud === "domicilio") {
        dispatch(miSolicitudCambioDomicilio(token, user.empleadoid));
      }
      if (tipoSolicitud === "estado civil") {
        dispatch(miSolicitudCambioEstadoCivil(token, user.empleadoid));
      }
      if (tipoSolicitud === "familia") {
        dispatch(miSolicitudActualizacionFamiliar(token, user.empleadoid));
      }
      if (tipoSolicitud === "educacion") {
        dispatch(miSolicitudActualizacionEducacion(token, user.empleadoid));
      }
      if (tipoSolicitud === "cuenta bancaria") {
        dispatch(miSolicitudActualizacionCuentaBancaria(token, user.empleadoid));
      }
    }
  }, [token, user, tipoSolicitud]);

  useEffect(() => {
    return () => {
      dispatch(clearSolicitudInfo())
    }
  }, [])
  

  useEffect(() => {
    if (solicitudSelector?.length > 0 && loadSolicitudSelector) {
      const array = [];
      solicitudSelector.forEach((item) => {
        let obj = {
          id:
            item.new_solicitudcambiodedomicilioid ||
            item.new_solicitudcambioestadocivilid ||
            item.new_solicitudaltafamiliarid ||
            item.new_solicitudaltadeeducacionformalid ||
            item.new_solicitudaltacuentabancariaid,
          solicitud: item.new_name,
          mensaje: item["new_estadosolicitud@OData.Community.Display.V1.FormattedValue"],
        };
        array.push(obj);
      });
      setSolicitud(array);
      setLoadSolicitud(loadSolicitudSelector);
    } else if (solicitudSelector?.length == 0 && loadSolicitudSelector) {
      setSolicitud([]);
      setLoadSolicitud(loadSolicitudSelector);
    }
  }, [solicitudSelector, loadSolicitudSelector]);

  return { solicitud, loadSolicitud };
};
export default useGetSolicitudes;
