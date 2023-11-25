import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity'; 
import * as UsuarioActions from '../actions/user.actions';
import { User } from 'src/app/interfaces/user.model';

export const usuarioAdapter = createEntityAdapter<User>();  

export interface UsuarioState extends EntityState<User> {}

export const initialState: UsuarioState = usuarioAdapter.getInitialState();  

export const usuarioReducer = createReducer(
  initialState,
  on(UsuarioActions.agregarUsuario, (state, { usuario }) => {
    return usuarioAdapter.addOne(usuario, state);
  }),
  on(UsuarioActions.editarUsuario, (state, { id, cambios }) => {
    return usuarioAdapter.updateOne({ id, changes: cambios }, state);
  }),
  on(UsuarioActions.eliminarUsuario, (state, { id }) => {
    return usuarioAdapter.removeOne(id, state);
  })
);