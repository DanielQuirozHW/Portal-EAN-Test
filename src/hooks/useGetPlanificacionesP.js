import { AuthContext } from "@/context/AuthContext";
import { planificacionesPresentadas } from "@/redux/asignaciones";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const useGetPlanificacionesP = () => {
    const { token, user } = useContext(AuthContext);
    const dispatch = useDispatch();

    const [planificaciones, setPlanificaciones] = useState([])
    const [loadingPl, setLoadingPl] = useState(false)
    const planificacionesselector = useSelector(store => store.asignaciones.planificaciones)
    const loadingPlselector = useSelector(store => store.asignaciones.loadingPlanificaciones)

    useEffect(() => {
        if(token && user){
            dispatch(planificacionesPresentadas(token, user.email))
        }
    }, [token, user])

    useEffect(() => {
        if (planificacionesselector.length > 0) {
            const array = []
            planificacionesselector.forEach(element => {
                const objeto = {
                    id: element.new_planificacinunificadaid,
                    new_codigomateria: element["materia.new_codigomateria"],
                    new_teamteaching: element["new_teamteaching"],
                    new_teamteachinginvitado: element["_new_teamteachinginvitado_value"],
                    statuscode: element["statuscode@OData.Community.Display.V1.FormattedValue"],
                    _new_docente_value: element._new_docente_value,
                    new_docente: element["_new_docente_value@OData.Community.Display.V1.FormattedValue"],
                    _new_materia_value: element._new_materia_value,
                    new_materia: element["_new_materia_value@OData.Community.Display.V1.FormattedValue"],
                    _new_matriz_value: element._new_matriz_value,
                    new_matriz: element["_new_matriz_value@OData.Community.Display.V1.FormattedValue"],
                    _new_periodo_value: element._new_periodo_value,
                    new_periodo: element["_new_periodo_value@OData.Community.Display.V1.FormattedValue"],
                    new_fechadeelaboracin: element["new_fechadeelaboracin"],
                    new_decanato: element["_new_decanato_value"],
                    new_carrera: element["_new_carrera_value"],
                    new_tipologa: element["_new_tipologa_value"],
                    new_diferenciales: element["new_diferenciales"],
                    new_didacticas1ernivel: element["new_didacticas1ernivel"],
                    new_tiposdidcticasde1ernivel: element["new_tiposdidcticasde1ernivel"],
                    new_didcticas2donivel: element["new_didcticas2donivel"],
                    new_tipodedidcticas1ernivel: element["new_tipodedidcticas1ernivel"],
                    new_innovacintecnolgica: element["new_innovacintecnolgica"],
                    new_experiencia: element["new_experiencia"],
                    new_cargahoraria: element["new_cargahoraria"],
                    new_bibliografabsica: element["new_bibliografabsica"],
                    new_evidencias: element["new_evidencias"],
                    new_competencias: element["new_competencias"],
                }
                array.push(objeto)
            });
            setPlanificaciones(array)
            setLoadingPl(loadingPlselector)
        } else if (planificacionesselector.length === 0) {
            setPlanificaciones([])
            setLoadingPl(loadingPlselector)
        }
    }, [planificacionesselector, loadingPlselector])

    return { planificaciones, loadingPl }
}
export default useGetPlanificacionesP;