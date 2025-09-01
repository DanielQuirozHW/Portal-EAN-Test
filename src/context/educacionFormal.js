import { createContext } from "react";

const defaultvalues = {
  loadingEditarTitulo: false,
  editarTitulo: () => {}
};

export const EducacionFormal = createContext(defaultvalues);

export default EducacionFormal;
