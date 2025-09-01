import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk"; // Importa Redux Thunk
import tokenReducer from "@/redux/token";
import legajoReducer from "@/redux/legajo";
import autocompletadosReducer from "../redux/autocompletados";
import evaluacionesReducer from "@/redux/evaluaciones";
import desempenoReducer from "@/redux/desempeno";

const middleware = [thunk];
const composeEnhancers = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  combineReducers({
    token: tokenReducer,
    legajo: legajoReducer,
    autocompletados: autocompletadosReducer,
    evaluaciones: evaluacionesReducer,
    desempeno: desempenoReducer,
  }),
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
