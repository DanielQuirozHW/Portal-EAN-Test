import { AuthContext } from "@/context/AuthContext";
import { obtenerBancos } from "@/redux/autocompletados";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetBancos = () => {
  const { token } = useContext(AuthContext);
  const dispatch = useDispatch();

  const bancosSelector = useSelector((store) => store.autocompletados.bancos);

  const [bancos, setBancos] = useState([]);

  useEffect(() => {
    if (token) {
      dispatch(obtenerBancos(token));
    }
  }, []);

  useEffect(() => {
    if (bancosSelector?.length > 0) {
      const bancos = [];
      bancosSelector.forEach((item) => {
        const object = {
          value: item.new_bancoid,
          label: item.new_name,
        };
        bancos.push(object);
      });
      setBancos(bancos);
    }
  }, [bancosSelector]);

  return { bancos };
};
export default useGetBancos;
