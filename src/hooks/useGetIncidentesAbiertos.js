import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { misIndicentesAbiertos } from "@/redux/ghResponde";
import { AuthContext } from '@/context/AuthContext';

const useGetIncidentesAbiertos = () => {
    const { token, user } = useContext(AuthContext);
    const dispatch = useDispatch();

    const [incidentesAbiertos, setIncidentesAbiertos] = useState([]);
    const incidentesAbiertosSelector = useSelector((store) => store.ghResponde.incidentesAbiertos);
    const loadingIncidentesASelector = useSelector((store) => store.ghResponde.loadingIa);
    const [loadingIncidentesAbiertos, setLoadingIncidentesAbiertos] = useState(false);


    useEffect(() => {
        if (token && user) {
            dispatch(misIndicentesAbiertos(token, user.empleadoid));
        }
    }, []);

    useEffect(() => {
        if (incidentesAbiertosSelector?.length > 0 && loadingIncidentesASelector) {
            const array = [];
            incidentesAbiertosSelector.forEach(element => {
                var objeto = {
                    id: element.new_incidenciasdocentesid,
                    new_name: element.new_name,
                    new_origen: element["new_orgen@OData.Community.Display.V1.FormattedValue"],
                    new_altadeincidente: element["new_altadeincidente@OData.Community.Display.V1.FormattedValue"],
                    new_tipodeincidencia: element["new_tipodeincidencia@OData.Community.Display.V1.FormattedValue"],
                    new_vencimiento: element["new_vencimiento@OData.Community.Display.V1.FormattedValue"],
                    _new_empleado_value: element._new_empleado_value,
                    new_empleado: element["_new_empleado_value@OData.Community.Display.V1.FormattedValue"],
                    _new_tema_value: element._new_tema_value,
                    new_tema: element["_new_tema_value@OData.Community.Display.V1.FormattedValue"]
                }
                array.push(objeto)
            });
            setIncidentesAbiertos(array)
            setLoadingIncidentesAbiertos(loadingIncidentesASelector)
        } else if (incidentesAbiertosSelector?.length === 0 && loadingIncidentesASelector) {
            setIncidentesAbiertos([])
            setLoadingIncidentesAbiertos(loadingIncidentesASelector)
        }
    },[incidentesAbiertosSelector, loadingIncidentesASelector])

    return { incidentesAbiertos, loadingIncidentesAbiertos }
}
export default useGetIncidentesAbiertos;