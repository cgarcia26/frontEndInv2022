import { axiosConfig } from "../config/axiosConfig";

export const obtenerTodosTipoEquipos = () => {
  return axiosConfig.get("/tiposequipo/user-activo");
};

export const guardar = (tiposequipo) => {
  return axiosConfig.post("/tiposequipo", tiposequipo);
};

export const editarPorId = (id, tiposequipo) => {
  return axiosConfig.put("/tiposequipo/" + id, tiposequipo);
};