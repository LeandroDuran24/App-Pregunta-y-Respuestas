import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent {

  cambiarPassword: FormGroup;

  constructor(private fb: FormBuilder) {
    this.cambiarPassword = this.fb.group({
      passwordAnterior: ['', Validators.required],
      nuevaPassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmarPassword: ['',Validators.required]
    }, { validator: this.checkPassword });
  }

  checkPassword(group: FormGroup): any {

    const pass = group.controls['nuevaPassword'].value;
    const confirm = group.controls['confirmarPassword'].value;

    return pass === confirm ? null : { notSame: true }
  }


  guardarPassword():void{
    console.log(this.cambiarPassword)
    console.log(this.cambiarPassword.value.nuevaPassword)

  }

}
