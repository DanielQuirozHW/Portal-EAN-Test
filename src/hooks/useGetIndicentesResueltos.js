import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { misIndicentesResueltos } from "@/redux/ghResponde";
import { AuthContext } from '@/context/AuthContext';

const useGetIncidentesResueltos = () => {
    const { token, user } = useContext(AuthContext);
    const dispatch = useDispatch();

    const [incidentesResueltos, setIncidentesResueltos] = useState([]);
    const incidentesResueltosSelector = useSelector((store) => store.ghResponde.incidentesResueltos);
    const loadingIncidentesRSelector = useSelector((store) => store.ghResponde.loadingIr);
    const [loadingIncidentesResueltos, setLoadingIncidentesResueltos] = useState(false);

    useEffect(() => {
        if (token && user) {
            dispatch(misIndicentesResueltos(token, user.empleadoid));
        }
    }, []);

    useEffect(() => {
        if (incidentesResueltosSelector?.length > 0 && loadingIncidentesRSelector) {
            const array = [];
            incidentesResueltosSelector.forEach(element => {
                var objeto = {
                    id: element.new_incidenciasdocentesid,
                    createdoN: element.createdon,
                    createdon: element["createdon@OData.Community.Display.V1.FormattedValue"],
                    new_fecharesolucion: element["new_fecharesolucion@OData.Community.Display.V1.FormattedValue"],
                    new_name: element.new_name,
                    new_resolucion: element.new_resolucion,
                    new_origen: element["new_orgen@OData.Community.Display.V1.FormattedValue"],
                    new_tipodeincidencia: element["new_tipodeincidencia@OData.Community.Display.V1.FormattedValue"],
                    new_vencimiento: element["new_vencimiento@OData.Community.Display.V1.FormattedValue"],
                    _new_empleado_value: element._new_empleado_value,
                    new_empleado: element["_new_empleado_value@OData.Community.Display.V1.FormattedValue"],
                    _new_tema_value: element._new_tema_value,
                    new_tema: element["_new_tema_value@OData.Community.Display.V1.FormattedValue"],
                    statuscode: element.statuscode,
                }
                array.push(objeto)
        
            });
            setIncidentesResueltos(array)
            setLoadingIncidentesResueltos(loadingIncidentesRSelector)
        } else if (incidentesResueltosSelector?.length === 0 && loadingIncidentesRSelector) {
            setIncidentesResueltos([])
            setLoadingIncidentesResueltos(loadingIncidentesRSelector)
        }
    },[incidentesResueltosSelector, loadingIncidentesRSelector])

    return { incidentesResueltos, loadingIncidentesResueltos }
}
export default useGetIncidentesResueltos;