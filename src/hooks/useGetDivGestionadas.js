import { AuthContext } from "@/context/AuthContext";
import { divisionesGestionadas } from "@/redux/asignaciones"
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const useGetDivGestionadas = () => {
    const {token, user} = useContext(AuthContext)
    const dispatch = useDispatch()

    const [divGestionadas, setDivGestionadas] = useState([])
    const [loadDg, setLoadDg] = useState(false)
    const gestionadasSelector = useSelector(store => store.asignaciones.divisionesGestionadas)
    const loadingDgSelector = useSelector(store => store.asignaciones.loadingDg)

    useEffect(() => {
        if(token && user){
            dispatch(divisionesGestionadas(token, user.email))
        }
    }, [token, user])

    useEffect(() => {
        if (gestionadasSelector.length > 0) {
            const array = []
            gestionadasSelector.forEach(element => {
                const objeto = {
                    // id: element["division.new_divisionid"],
                    id: element.new_aceptaciondedivisionid,
                    new_areadisciplinar: element["division.new_areadisciplinar@OData.Community.Display.V1.FormattedValue"],
                    new_codigomateria: element["division.new_codigomateria"],
                    new_materia: element["division.new_materia@OData.Community.Display.V1.FormattedValue"],
                    new_modalidaddictado: element["division.new_modalidaddictado@OData.Community.Display.V1.FormattedValue"],
                    new_name: element["division.new_name"],
                    new_tipodedivision: element["division.new_tipodedivision@OData.Community.Display.V1.FormattedValue"],
                    division_statuscode: element["division.statuscode@OData.Community.Display.V1.FormattedValue"],
                    statuscode: element["statuscode@OData.Community.Display.V1.FormattedValue"],
                    _new_periodo_value: element["_new_periodo_value@OData.Community.Display.V1.FormattedValue"],
                    new_divisionid: element["division.new_divisionid"],
                    divion_new_periodo: element["division.new_periodo@OData.Community.Display.V1.FormattedValue"],
                    division_new_sede: element["division.new_sede@OData.Community.Display.V1.FormattedValue"],
                    _new_periodo_value: element["_new_periodo_value@OData.Community.Display.V1.FormattedValue"],
                    division_new_idcatedra: element["division.new_idcatedra"],
                    new_roldocente: element["new_roldocente@OData.Community.Display.V1.FormattedValue"],
                    new_roldocente_value: element["new_roldocente"],
                    new_fechafin: element["new_fechafin@OData.Community.Display.V1.FormattedValue"],
                    new_fechadesde: element["new_fechadesde@OData.Community.Display.V1.FormattedValue"],
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
            setDivGestionadas(array)
            setLoadDg(loadingDgSelector)
        } else if ( gestionadasSelector.length === 0) {
            setDivGestionadas([])
            setLoadDg(loadingDgSelector)
        }
    }, [gestionadasSelector, loadingDgSelector])

    return {divGestionadas, loadDg}
}
export default useGetDivGestionadas;