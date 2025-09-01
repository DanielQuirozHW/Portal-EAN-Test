import { createContext } from "react";

const defaultvalues = {
    cargarcompetencia: () => {},
};

export const ItemsEvaluacion = createContext(defaultvalues);

export default ItemsEvaluacion;