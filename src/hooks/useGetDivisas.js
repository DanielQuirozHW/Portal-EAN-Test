import { AuthContext } from "@/context/AuthContext";
import { obtenerDvisas } from "@/redux/autocompletados";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetDivisas = () => {
  const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const [divisas, setDivisas] = useState([])
  const divisasSelector = useSelector((store) => store.autocompletados.divisas);

  useEffect(() => {
    if (token && user) {
      dispatch(obtenerDvisas(token))
    }
  }, []);
  
  useEffect(() => {
    if (divisasSelector.length > 0) {
      var array = []
      divisasSelector.forEach((tipo) => {
        var objeto = {
          label: tipo.currencyname,
          value: tipo.transactioncurrencyid,
        }
        array.push(objeto)
      })
      setDivisas(array)
    }
  }, [divisasSelector])


  return { divisas };
};
export default useGetDivisas;
