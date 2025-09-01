import { AuthContext } from "@/context/AuthContext";
import { actividadesAgestionar } from "@/redux/asignaciones"
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const useGetActGestionar = () => {
    const { token, user } = useContext(AuthContext);
    const dispatch = useDispatch();

    const [actAgestionar, setActAgestionar] = useState([])
    const [loadAaG, setLoadAaG] = useState(false)
    const actAGestionarSelector = useSelector(store => store.asignaciones.actAgestionar)
    const loadingAaGSelector = useSelector(store => store.asignaciones.loadingActAg)

    useEffect(() => {
        if(token && user){
            dispatch(actividadesAgestionar(token, user.email))
        }
    }, [token, user])

    useEffect(() => {
        if (actAGestionarSelector.length > 0) {
            const array = []
            actAGestionarSelector.forEach(element => {
                const objeto = {
                    id: element.new_aceptaciondedivisionid,
                    new_areadisciplinar: element["act.new_areadisciplinar@OData.Community.Display.V1.FormattedValue"],
                    new_carreras: element["act.new_carreraid@OData.Community.Display.V1.FormattedValue"],
                    new_codigomateria: element["act.new_codigomateria"],
                    new_materia: element["act.new_materia@OData.Community.Display.V1.FormattedValue"],
                    new_modalidad: element["act.new_modalidad@OData.Community.Display.V1.FormattedValue"],
                    act_new_name: element["act.new_name"],
                    act_id: element["act.new_asignaciondeactividadesid"],
                    new_periodo: element["act.new_periodo@OData.Community.Display.V1.FormattedValue"],
                    new_name: element.new_name,
                    statuscode: element["statuscode@OData.Community.Display.V1.FormattedValue"],
                    new_roldocente: element["new_roldocente@OData.Community.Display.V1.FormattedValue"],
                    annotations: [],
                }
                objeto.annotations.push({
                  annotationid: element["ae.annotationid"],
                  documentbody: element["ae.documentbody"],
                  filename: element["ae.filename"],
                  mimetype: element["ae.mimetype"]
                });
                array.push(objeto)
            });
            setActAgestionar(array)
            setLoadAaG(loadingAaGSelector)
        } else if (actAGestionarSelector.length === 0 && loadingAaGSelector) {
            setActAgestionar([])
            setLoadAaG(loadingAaGSelector)
        }
    }, [actAGestionarSelector, loadingAaGSelector])

    return { actAgestionar, loadAaG }
}
export default useGetActGestionar;