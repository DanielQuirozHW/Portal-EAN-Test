
import { AuthContext } from "@/context/AuthContext";
import { fetchAdjuntos, limpiarAdjuntos } from "@/redux/ghResponde";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAdjuntos = (id) => {
  const { token } = useContext(AuthContext);
  const dispatch = useDispatch();

  const loadingAdjuntosSelector = useSelector((store) => store.ghResponde.loadingAdjuntos);
  const adjuntosSelector = useSelector((store) => store.ghResponde.adjuntos);
  const [adjuntos, setAdjuntos] = useState([]);
  const [loadingAdjuntos, setLoadingAdjuntos] = useState(false)

  useEffect(() => {
    if (token && id) {
        dispatch(fetchAdjuntos(token, id));
    }
  }, [id]);

  useEffect(() => {
    return () => {
      dispatch(limpiarAdjuntos())
    }
  }, [])
  

  useEffect(() => {
    if (adjuntosSelector?.length > 0 && loadingAdjuntosSelector) {
      const newArray = adjuntosSelector.map((item) => ({
        id: item.annotationid,
        filename: item.filename,
        mimetype: item.mimetype,
        documentbody: item.documentbody
      }));

      setAdjuntos(newArray);
      setLoadingAdjuntos(loadingAdjuntosSelector)
    }else if(adjuntosSelector?.length === 0 && loadingAdjuntosSelector){
      setAdjuntos([]);
      setLoadingAdjuntos(loadingAdjuntosSelector)
    }
  }, [adjuntosSelector, loadingAdjuntosSelector]);

  return { adjuntos, loadingAdjuntos, setAdjuntos };
};

export default useGetAdjuntos;
