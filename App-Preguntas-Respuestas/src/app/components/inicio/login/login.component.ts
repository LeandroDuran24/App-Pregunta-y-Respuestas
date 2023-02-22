import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { subscribeOn } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login: FormGroup;
  loading = false;


  /**
   *
   */
  constructor(private fb: FormBuilder, private toastr: ToastrService, private router: Router, private loginService: LoginService) {
    this.login = this.fb.group({

      usuario: ['', Validators.required],
      password: ['', Validators.required]

    });

  }




  log(): void {


    const usuario: Usuario = {
      nombreUsuario: this.login.value.usuario,
      password: this.login.value.password
    }

    this.loading = true;

    this.loginService.login(usuario).subscribe(data => {

      this.login.reset();
      this.loading = false;
      this.loginService.setLocalStorage(data.token);
      this.router.navigate(['/dashboard']);

    }, error => {

      this.loading = false;
      this.login.reset();
      this.toastr.error(error.error.message, 'Error!');
    })

  }




}
