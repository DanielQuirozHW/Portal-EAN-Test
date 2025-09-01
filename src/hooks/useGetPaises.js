import { AuthContext } from "@/context/AuthContext";
import { obtenerPaises } from "@/redux/autocompletados";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetPaises = () => {
  const { token } = useContext(AuthContext);
  const dispatch = useDispatch();

  const paisesSelector = useSelector((store) => store.autocompletados.paises);
  const [paises, setPaises] = useState([]);

  useEffect(() => {
    if (token) {
      dispatch(obtenerPaises(token));
    }
  }, []);

  useEffect(() => {
    if (paisesSelector?.length > 0) {
      const paises = [];
      paisesSelector.forEach((item) => {
        const object = {
          value: item.new_paisid,
          label: item.new_name,
        };
        paises.push(object);
      });
      setPaises(paises);
    }
  }, [paisesSelector]);

  return { paises };
};
export default useGetPaises;
