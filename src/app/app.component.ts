import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { usuarioAdapter } from './page/reducer/user.reducer';
import { User, UsuarioState } from './interfaces/user.model';
import { agregarUsuario, editarUsuario, eliminarUsuario } from './page/actions/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  userForm: FormGroup;
  emailInvalido: boolean = false;

  users$ = this.store.select(state => Object.values(usuarioAdapter.getSelectors().selectAll(state['usuarios'])));

  constructor(private store: Store<{usuarios: UsuarioState}>, private formBuilder: FormBuilder){
    this.userForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]]
    })
  }

  agregarUsuario() {
    if (this.userForm.valid) {
      const nuevoUser: User = {
        id: Date.now(),
        nombre: this.userForm.value.nombre,
        telefono: this.userForm.value.telefono,
        email: this.userForm.value.email,
      };
      this.store.dispatch(agregarUsuario({ usuario: nuevoUser }));
      this.userForm.reset();
      this.emailInvalido = false; 
    } else {
      this.emailInvalido = this.userForm.get('email')?.invalid || false;
    }
  }

  editarUsuario(id: number, cambios: Partial<User>) {
    this.store.dispatch(editarUsuario({ id, cambios }));
  }

  eliminarUsuario(id: number) {
    this.store.dispatch(eliminarUsuario({ id }));
  }
}
