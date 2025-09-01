import { AuthContext } from "@/context/AuthContext";
import { obtenerParentescos } from "@/redux/autocompletados";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetParentescos = () => {
    const { token } = useContext(AuthContext);
    const dispatch = useDispatch();
  
    const parentescosSelector = useSelector((store) => store.autocompletados.parentescos);
    const [parentescos, setParentescos] = useState([]);
  
    useEffect(() => {
      if (token) {
        dispatch(obtenerParentescos(token));
      }
    }, []);
  
    useEffect(() => {
        if (parentescosSelector?.length > 0) {
          const parentescos = [];
          parentescosSelector.forEach((item) => {
            const object = {
              value: item.new_parentescoid,
              label: item.new_name,
            };
            parentescos.push(object);
          });
          setParentescos(parentescos);
        }
      }, [parentescosSelector]);
  
    return { parentescos };
}
export default useGetParentescos