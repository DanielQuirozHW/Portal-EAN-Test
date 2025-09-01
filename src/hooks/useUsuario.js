import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { usuario } from '@/redux/legajo';
import { AuthContext } from '../context/AuthContext';

const useUsuario = () => {
  const dispatch = useDispatch();
  const { token, user } = useContext(AuthContext);
  const usuarioSelector = useSelector((store) => store.legajo.usuarioAsociado);
  const [usuarioAsociado, setUsuarioAsociado] = useState(null);

  useEffect(() => {
    if (token && user) {
      dispatch(usuario(token, user.email));
    }
  }, []);

  useEffect(() => {
      if (usuarioSelector.length > 0) {
          const newArray = usuarioSelector.map((element) => ({
            id: element.systemuserid,
            internalemailaddress: element.internalemailaddress,
          }))
          setUsuarioAsociado(newArray[0])
      }
  }, [usuarioSelector])

  return { usuarioAsociado }
}

export default useUsuario