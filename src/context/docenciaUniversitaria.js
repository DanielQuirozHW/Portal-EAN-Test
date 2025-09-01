import { createContext } from "react";

const defaultvalues = {
  loadingTesisMaestrias: false,
  actualizarTesisMaestrias: () => {}
};

export const DocenciaUniversitaria = createContext(defaultvalues);

export default DocenciaUniversitaria;
