import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent {

  cambiarPassword: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private toastr: ToastrService, private router: Router) {
    this.cambiarPassword = this.fb.group({
      passwordAnterior: ['', Validators.required],
      nuevaPassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmarPassword: ['', Validators.required]
    }, { validator: this.checkPassword });
  }

  checkPassword(group: FormGroup): any {

    const pass = group.controls['nuevaPassword'].value;
    const confirm = group.controls['confirmarPassword'].value;

    return pass === confirm ? null : { notSame: true }
  }


  guardarPassword(): void {
    console.log(this.cambiarPassword)
    console.log(this.cambiarPassword.value.nuevaPassword)

    this.loading = true;
    const changePassword: any = {
      passwordAnterior: this.cambiarPassword.value.passwordAnterior,
      nuevaPassword: this.cambiarPassword.value.nuevaPassword

    }

    this.usuarioService.changePassword(changePassword).subscribe(data => {

      this.loading = false;
      this.cambiarPassword.reset();
      this.toastr.info(data.message);
      this.router.navigate(['/dashboard'])
    }, error => {
      this.loading = false;
      this.cambiarPassword.reset();
      this.toastr.error(error.error.message, 'Error !');

    })


  }

}
