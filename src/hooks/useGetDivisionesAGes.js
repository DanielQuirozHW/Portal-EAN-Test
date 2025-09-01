import { AuthContext } from "@/context/AuthContext";
import { divisionesAgestionar } from "@/redux/asignaciones";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const useGetDivisionesAGes = () => {
    const {token, user} = useContext(AuthContext)
    const dispatch = useDispatch()

    const [divAgestionar, setDivAgestionar] = useState([])
    const [loadDag, setLoadDag] = useState(false)
    const aGestionarSelector = useSelector(store => store.asignaciones.divisonesAgestionar)
    const loadingDagSelector = useSelector(store => store.asignaciones.loadingDaG)

    useEffect(() => {
        if(token && user){
            dispatch(divisionesAgestionar(token, user.email))
        }
    }, [token, user])

    useEffect(() => {
        if (aGestionarSelector.length > 0) {
            const array = []
            aGestionarSelector.forEach(element => {
                const objeto = {
                    id: element.new_aceptaciondedivisionid,
                    new_areadisciplinar: element["division.new_areadisciplinar@OData.Community.Display.V1.FormattedValue"],
                    new_codigomateria: element["division.new_codigomateria"],
                    new_materia: element["division.new_materia@OData.Community.Display.V1.FormattedValue"],
                    new_modalidaddictado: element["division.new_modalidaddictado@OData.Community.Display.V1.FormattedValue"],
                    new_name: element["division.new_name"],
                    new_tipodedivision: element["division.new_tipodedivision@OData.Community.Display.V1.FormattedValue"],
                    statuscode: element["statuscode@OData.Community.Display.V1.FormattedValue"],
                    _new_periodo_value: element["_new_periodo_value@OData.Community.Display.V1.FormattedValue"],
                    new_divisionid: element["division.new_divisionid"],
                    division_statuscode: element["division.statuscode@OData.Community.Display.V1.FormattedValue"],
                    divion_new_periodo: element["division.new_periodo@OData.Community.Display.V1.FormattedValue"],
                    division_new_sede: element["division.new_sede@OData.Community.Display.V1.FormattedValue"],
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
            setDivAgestionar(array)
            setLoadDag(loadingDagSelector)
        } else if (aGestionarSelector.length === 0) {
            setDivAgestionar([])
            setLoadDag(loadingDagSelector)
        }
    }, [aGestionarSelector, loadingDagSelector])

    return { divAgestionar, loadDag }
}
export default useGetDivisionesAGes;