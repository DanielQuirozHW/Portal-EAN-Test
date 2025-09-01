import { AuthContext } from "@/context/AuthContext";
import { UrlApi } from "@/keys";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

const useGetMasInfo = (maestrodecursoid) => {
  const { token, user } = useContext(AuthContext);

  const [loadingMasInfo, setLoadingMasInfo] = useState(false);
  const [planFormativoData, setPlanFormativoData] = useState([]);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    if ((token, user, maestrodecursoid)) {
      fetchGetInfoPlan(token, user.email, maestrodecursoid);
    }
  }, []);

  useEffect(() => {
    if (planFormativoData?.length > 0) {
      const array = [];
      planFormativoData.forEach((element) => {
        const objeto = {
          id: element.new_participanteporeventodecapacitacionid,
          _new_eventodecapacitacion_value:
            element["_new_eventodecapacitacion_value@OData.Community.Display.V1.FormattedValue"],
          _new_eventodecapacitacion_id: element._new_eventodecapacitacion_value,
          new_modalidaddecurso: element["ab.new_modalidaddecurso@OData.Community.Display.V1.FormattedValue"],
        };
        array.push(objeto);
      });
      setInfo(array);
    }
  }, [planFormativoData]);

  const fetchGetInfoPlan = async (token, usuarioPortalRh, maestrodecursoid) => {
    setLoadingMasInfo(true);

    if (!token) return;

    const emailEmpleado = user?.puesto === "docente" ? "new_usuarioportalrh" : "new_correoelectronico";

    const entidad = "new_participanteporeventodecapacitacions";
    const fetch = `  
      <entity name='new_participanteporeventodecapacitacion'>
        <attribute name='new_participanteporeventodecapacitacionid' />
        <attribute name='new_name' />
        <attribute name='createdon' />
        <attribute name='new_eventodecapacitacion' />
        <order attribute='new_name' descending='false' />
        <filter type='and'>
        <condition attribute='statuscode' operator='eq' value='100000005' />
        </filter>
        <link-entity name='new_empleado' from='new_empleadoid' to='new_empleado' link-type='inner' alias='aa'>
        <filter type='and'>
        <condition attribute='${emailEmpleado}' operator='eq' value="${usuarioPortalRh}" />
        </filter>
        </link-entity>
        <link-entity name='new_eventodecapacitacion' from='new_eventodecapacitacionid' to='new_eventodecapacitacion' link-type='inner' alias='ab'>
        <attribute name='new_eventodecapacitacionid' />
        <attribute name='new_modalidaddecurso' />
        <attribute name='new_fechafinalizacion' />
        <attribute name='new_fechainicio' />
        <attribute name='new_link' />
        <attribute name='new_lugar' />
        <filter type='and'>
        <condition attribute='new_cursomaestro' operator='eq' value='${maestrodecursoid}' />
        <condition attribute='new_habilitadoenportal' operator='eq' value='1' />
        <condition attribute='statecode' operator='eq' value='0' />
        <condition attribute='statuscode' operator='eq' value='1' />
        </filter>
        </link-entity>
      </entity>`;

    try {
      const response = await axios.post(
        `${UrlApi}api/consultafetchs`,
        { entidad, fetch },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPlanFormativoData(response.data);
    } catch (error) {
      console.error(error);
      setError(error?.message);
    } finally {
      setLoadingMasInfo(false);
    }
  };

  return { loadingMasInfo, info, error };
};

export default useGetMasInfo;
