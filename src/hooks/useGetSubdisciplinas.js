import { AuthContext } from "@/context/AuthContext";
import { UrlApi } from "@/keys";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

const useGetSubdisciplinas = () => {
  const { token } = useContext(AuthContext);

  const [subdisciplinas, setSubdisciplinas] = useState([]);

  useEffect(() => {
    if (token) {
      obtenerSubdisciplinas(token).then((data) => {
        if (data?.length > 0) {
          const subdiciplinas = [];
          data.forEach((item) => {
            const object = {
              value: item.new_subdisciplinaid,
              label: item.new_name,
            };
            subdiciplinas.push(object);
          });
          setSubdisciplinas(subdiciplinas);
        }
      });
    }
  }, []);

  const obtenerSubdisciplinas = async (token) => {
    const entidad = "new_subdisciplinas";
    const fetch = `
        <entity name='new_subdisciplina'>
          <attribute name='new_subdisciplinaid' />
          <attribute name='new_name' />
          <attribute name='createdon' />
          <order attribute='new_name' descending='false' />
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

  return { subdisciplinas };
};
export default useGetSubdisciplinas;
