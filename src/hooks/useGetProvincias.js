import { AuthContext } from "@/context/AuthContext";
import { obtenerProvincias } from "@/redux/autocompletados";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetProvincias = () => {
    const { token } = useContext(AuthContext);
    const dispatch = useDispatch();

    const provinciasSelector = useSelector((store) => store.autocompletados.provincias);
    const [provincias, setProvincias] = useState([]);

    useEffect(() => {
        if (token) {
          dispatch(obtenerProvincias(token));
        }
      }, []);

      useEffect(() => {
        if (provinciasSelector?.length > 0) {
          const provincias = [];
          provinciasSelector.forEach((item) => {
            const object = {
              value: item.new_provinciaid,
              label: item.new_name,
            };
            provincias.push(object);
          });
          setProvincias(provincias);
        }
      }, [provinciasSelector]);

  return {provincias}
}
export default useGetProvincias