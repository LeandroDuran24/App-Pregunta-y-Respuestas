import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  register: FormGroup;
  loading = false;


  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router, private toastr: ToastrService) {

    this.register = this.fb.group({

      usuario: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmar: ['', Validators.required]

    }, { validator: this.checkPassword });
  }

  registrarUsuario(): void {


    const usuario: Usuario = {
      nombreUsuario: this.register.value.usuario,
      password: this.register.value.password
    }

    this.loading = true;
    this.usuarioService.saveUser(usuario).subscribe(data => {

      console.log(data);
      this.register.reset();
      this.loading = false;
      this.toastr.success('El usuario '+usuario.nombreUsuario + ' fue creado con exito!', 'Usuario Registrado !');

      setTimeout(() => {
        this.router.navigate(['/inicio/login']);
      }, 1500);

    }, error => {
      this.loading = false;
      this.register.reset();
      this.toastr.error( error.error.message, 'Error!');
    });


  }

  checkPassword(group: FormGroup): any {

    const pass = group.controls['password'].value;
    const confirm = group.controls['confirmar'].value;

    return pass === confirm ? null : { notSame: true }
  }
}
