import { createAction, props } from "@ngrx/store";
import { User } from "src/app/interfaces/user.model";

export const agregarUsuario = createAction('[Usuario] Agregar Usuario', props<{usuario: User}>());
export const editarUsuario = createAction('[Usuario] Editar Usuario', props<{ id: number, cambios: Partial<User> }>());
export const eliminarUsuario = createAction('[Usuario] Eliminar Usuario', props<{ id: number }>());