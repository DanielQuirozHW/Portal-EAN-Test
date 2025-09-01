import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { usuarioLider } from '@/redux/legajo';
import { AuthContext } from '@/context/AuthContext';

const useLider = () => {
    const dispatch = useDispatch();
    const { token, user } = useContext(AuthContext);
    const liderSelector = useSelector((store) => store.legajo.usuarioLider);
    const [lider, setLider] = useState(null);

    useEffect(() => {
        if (token && user) {
            dispatch(usuarioLider(token, user.empleadoid));
        }
    }, [token, user]);
    
    useEffect(() => {
        if (liderSelector.length > 0) {
            setLider(true)
        } else {
            setLider(false)
        }
    }, [liderSelector])

    return { lider }
}

export default useLider