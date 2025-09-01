import { AuthContext } from "@/context/AuthContext";
import { acompanamientosAulicos } from "@/redux/desempeno";
import { useContext, useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";

const useGetAcompAulicos = () => {
    const { token, user } = useContext(AuthContext)
    const dispatch = useDispatch();

    const [acompanamientos, setAcompanamientos] = useState([])
    const [loadingAcompanamientos, setLoadingAcompanamientos] = useState(false)
    const acompanamientosSelector = useSelector(store => store.desempeno.acompanamientos)
    const getACOMPANAMIENTOSselector = useSelector(store => store.desempeno.getAcompanamientos)

    useEffect(() => {
        if(token && user) {
            dispatch(acompanamientosAulicos(token, user.email))
        }
    },[token, user])

    useEffect(() => {
        if (acompanamientosSelector?.length > 0) {
            const array = []
            acompanamientosSelector.forEach(element => {
                const objeto = {
                    id: element.new_observacionaulicaid,
                    _new_materia_value: element["_new_materia_value@OData.Community.Display.V1.FormattedValue"],
                    _new_observador_value: element["_new_observador_value@OData.Community.Display.V1.FormattedValue"],
                    new_fechadelaobservacin: element["new_fechadelaobservacin@OData.Community.Display.V1.FormattedValue"],
                    new_momentodelaclaseenqueseacompaa: element["new_momentodelaclaseenqueseacompaa@OData.Community.Display.V1.FormattedValue"],
                    new_didacticasde1ernivel: element["new_didacticasde1ernivel@OData.Community.Display.V1.FormattedValue"],
                    new_didctivasde2donivel: element["new_didctivasde2donivel@OData.Community.Display.V1.FormattedValue"],
                    new_informaciondiferencial: element.new_informaciondiferencial,
                    new_comentariosyfeedbackfinal: element.new_comentariosyfeedbackfinal
                }
                array.push(objeto)
            });
            setAcompanamientos(array)
            setLoadingAcompanamientos(getACOMPANAMIENTOSselector)
        } else if (acompanamientosSelector?.length == 0 && getACOMPANAMIENTOSselector) {
           setAcompanamientos([])
           setLoadingAcompanamientos(getACOMPANAMIENTOSselector)
        }

    }, [acompanamientosSelector, getACOMPANAMIENTOSselector])

    return { acompanamientos, loadingAcompanamientos }
}
export default useGetAcompAulicos;