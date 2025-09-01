import { AuthContext } from "@/context/AuthContext";
import { UrlApi } from "@/keys";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export const useGetNotificaciones = () => {
  const { token, user } = useContext(AuthContext);

  const [notificacionesFetch, setNotificacionesFetch] = useState([]);
  const [notificaciones, setNotificaciones] = useState([]);
  const [loadingNotificaciones, setLoadingNotificaciones] = useState(false);

  useEffect(() => {
    if (token, user) {
      misMensajes(token, user.email);
    }
  }, []);

  useEffect(() => {
    if (notificacionesFetch.length > 0) {
        const array = []
        notificacionesFetch.forEach(item => {
            const object = {
                id: item.activityid,
                title: item.subject,
                description: item.description,
                statuscode: item["statuscode@OData.Community.Display.V1.FormattedValue"],
                type: item["new_tipodenotificacion@OData.Community.Display.V1.FormattedValue"],
                createdAt: item["createdon@OData.Community.Display.V1.FormattedValue"]
            }
            array.push(object)
        })
        setNotificaciones(array)
    }
}, [notificacionesFetch])

  const misMensajes = async (token, usuarioPortal) => {
    setLoadingNotificaciones(false);
    try {
      const entidad = "tasks";
      const fetch = `<entity name='task'>
            <attribute name='subject' />
            <attribute name='statecode' />
            <attribute name='prioritycode' />
            <attribute name='scheduledend' />
            <attribute name='createdby' />
            <attribute name='createdon' />
            <attribute name='regardingobjectid' />
            <attribute name='activityid' />
            <attribute name='statuscode' />
            <attribute name='new_vacaciones' />
            <attribute name='new_tipodenotificacion' />
            <attribute name='new_solicituddeformacin' />
            <attribute name='new_solicituddecambiodedomicilio' />
            <attribute name='new_solicitudcambiodeestadocivil' />
            <attribute name='new_solicitudcambiocuentabancaria' />
            <attribute name='new_solicitudaltafamiliar' />
            <attribute name='new_solicitudaltaeducacionformal' />
            <attribute name='new_postulacinconcursodocente' />
            <attribute name='new_planificacinunificada' />
            <attribute name='new_participanteporevento' />
            <attribute name='new_mostrarenportal' />
            <attribute name='new_materia' />
            <attribute name='new_eventodeplanificaciondocente' />
            <attribute name='new_evento' />
            <attribute name='new_evaluacion' />
            <attribute name='new_evaluacinpgd' />
            <attribute name='new_estareadeplanificacinunificada' />
            <attribute name='new_entrevistadeoposicion' />
            <attribute name='new_encuestas' />
            <attribute name='new_division' />
            <attribute name='new_codigounico' />
            <attribute name='new_clasedeoposicion' />
            <attribute name='new_asignaciondeldocente' />
            <attribute name='new_asignacion' />
            <attribute name='new_alcance' />
            <attribute name='new_actualizacindelogros' />
            <attribute name='description' />
            <order attribute='subject' descending='false' />
            <filter type='and'>
                <filter type='and'>
                    <condition attribute='new_mostrarenportal' operator='eq' value='1' />
                    <condition attribute='scheduledend' operator='next-seven-days' />
                </filter>
                <condition attribute='new_tipodenotificacion' operator='in'>
                    <value>100000002</value>
                    <value>100000009</value>
                    <value>100000012</value>
                    <value>100000011</value>
                    <value>100000006</value>
                    <value>100000007</value>
                    <value>100000010</value>
                    <value>100000019</value>
                    <value>100000018</value>
                    <value>100000017</value>
                    <value>100000020</value>
                    <value>100000015</value>
                    <value>100000016</value>
                    <value>100000004</value>
                    <value>100000008</value>
                    <value>100000013</value>
                    <value>100000014</value>
                </condition>
            </filter>
            <link-entity name='new_empleado' from='new_empleadoid' to='regardingobjectid' link-type='inner' alias='ab'>
                <filter type='and'>
                    <condition attribute='new_usuarioportalrh' operator='like' value='${usuarioPortal}' />
                </filter>
            </link-entity>
        </entity>`;

      const response = await axios.post( `${UrlApi}api/consultafetchs`,
        {
          entidad: entidad,
          fetch: fetch,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotificacionesFetch(response.data);
    } catch (error) {
    } finally {
      setLoadingNotificaciones(false);
    }
  };

  return {notificaciones, loadingNotificaciones};
};