import { AuthContext } from "@/context/AuthContext";
import { obtenerLocalidades } from "@/redux/autocompletados";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetLocalidades = () => {
    const { token } = useContext(AuthContext);
    const dispatch = useDispatch();

    const loadingLocalidades = useSelector((store) => store.autocompletados.loadingLocalidades);

    const [localidades, setLocalidades] = useState([]);
    
    useEffect(() => {
        if (token) {
          dispatch(obtenerLocalidades(token));
        }
      }, []);

      useEffect(() => {
        if (loadingLocalidades?.length > 0) {
          const provincias = [];
          loadingLocalidades.forEach((item) => {
            const object = {
              value: item.new_localidadid,
              label: item.new_name,
            };
            provincias.push(object);
          });
          setLocalidades(provincias);
        }
      }, [loadingLocalidades]);

  return {localidades}
}
export default useGetLocalidades