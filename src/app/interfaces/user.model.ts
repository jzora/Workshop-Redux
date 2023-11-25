import { EntityState } from "@ngrx/entity";

export interface User{
    id: number;
    nombre: string;
    email: string;
    telefono: string;
}

export interface UsuarioState {
    entities: { [id: number]: User };
    ids: number[];
}
