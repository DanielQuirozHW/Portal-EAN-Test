import { AuthContext } from "@/context/AuthContext";
import { UrlApi } from "@/keys";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

const useGetDisciplinas = () => {
  const { token } = useContext(AuthContext);

  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    if (token) {
      obtenerDisciplinas(token).then((data) => {
        if (data?.length > 0) {
          const diciplinas = [];
          data.forEach((item) => {
            const object = {
              value: item.new_disciplinaid,
              label: item.new_name,
            };
            diciplinas.push(object);
          });
          setDisciplinas(diciplinas);
        }
      });
    }
  }, []);

  const obtenerDisciplinas = async (token) => {
    const entidad = "new_disciplinas";
    const fetch = `
        <entity name='new_disciplina'>
          <attribute name='new_name'/>
          <attribute name='new_areadisciplinar'/>
          <attribute name='new_disciplinaid'/>
          <order attribute='new_name' descending='false'/>
          <filter type='and'>
            <condition attribute='statecode' operator='eq' value='0'/>
          </filter>
        </entity>`;

    try {
      const respuesta = await axios.post(
        `${UrlApi}api/consultafetchs`,
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
      return respuesta.data;
    } catch (error) {}
  };

  return { disciplinas };
}
export default useGetDisciplinas