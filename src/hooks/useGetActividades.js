import { AuthContext } from "@/context/AuthContext";
import { actividadesGestionadas } from "@/redux/asignaciones"
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const useGetActividades = () => {
    const { token, user } = useContext(AuthContext);
    const dispatch = useDispatch();

    const [actGestionadas, setActGestionadas] = useState([])
    const [loadAg, setLoadAg] = useState(false)
    const actGestionadasSelector = useSelector(store => store.asignaciones.actGestionadas)
    const loadingAgSelector = useSelector(store => store.asignaciones.loadingActG)

    useEffect(() => {
        if(token && user){
            dispatch(actividadesGestionadas(token, user.email))
        }
    }, [token, user])

    useEffect(() => {
        if (actGestionadasSelector.length > 0) {
            const agrupadas = {};

            actGestionadasSelector.forEach(element => {
                const id_aceptacion = element["new_aceptaciondedivisionid"];
                const annotation = {
                    annotationid: element["ae.annotationid"],
                    documentbody: element["ae.documentbody"],
                    filename: element["ae.filename"],
                    mimetype: element["ae.mimetype"]
                };

                if (!agrupadas[id_aceptacion]) {
                    agrupadas[id_aceptacion] = {
                        id_asignacion: id_aceptacion,
                        id: element["act.new_asignaciondeactividadesid"],
                        new_areadisciplinar: element["act.new_areadisciplinar@OData.Community.Display.V1.FormattedValue"],
                        new_carreras: element["act.new_carreraid@OData.Community.Display.V1.FormattedValue"],
                        new_codigomateria: element["act.new_codigomateria"],
                        new_materia: element["act.new_materia@OData.Community.Display.V1.FormattedValue"],
                        new_modalidad: element["act.new_modalidad@OData.Community.Display.V1.FormattedValue"],
                        act_new_name: element["act.new_name"],
                        new_periodo: element["act.new_periodo@OData.Community.Display.V1.FormattedValue"],
                        new_name: element.new_name,
                        statuscode: element["statuscode@OData.Community.Display.V1.FormattedValue"],
                        new_roldocente: element["new_roldocente@OData.Community.Display.V1.FormattedValue"],
                        annotations: [annotation],
                    };
                } else {
                    // Ya existe, solo agregamos la nueva nota si no está repetida
                    const anotaciones = agrupadas[id_aceptacion].annotations;
                    const yaExiste = anotaciones.some(a => a.annotationid === annotation.annotationid);
                    if (!yaExiste) {
                        anotaciones.push(annotation);
                    }
                }
            });

            const array = Object.values(agrupadas);
            setActGestionadas(array);
            setLoadAg(loadingAgSelector);
        } else if (actGestionadasSelector.length === 0 && loadingAgSelector) {
            setActGestionadas([]);
            setLoadAg(loadingAgSelector);
        }
    }, [actGestionadasSelector, loadingAgSelector]);


    return { actGestionadas, loadAg }
}
export default useGetActividades;