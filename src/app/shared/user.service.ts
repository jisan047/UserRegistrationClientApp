import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  ImageFile: File = null;
  readonly BaseURI = "http://localhost:54986/api";
  formModel = this.fb.group({
    UserName: ['',Validators.required],
    Email: ['',Validators.email],
    FullName: [''],
    ImageName: [''],
    Passwords:this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, {validator: this.comparePasswords})
  });

  comparePasswords(fb:FormGroup){
    let confirmPasswordCtrl = fb.get('ConfirmPassword');

    if(confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors){
      if(fb.get('Password').value != confirmPasswordCtrl.value){
        confirmPasswordCtrl.setErrors({passwordMismatch: true});
      }
      else{
        confirmPasswordCtrl.setErrors(null);
      }
    }
  }
  register(){
    console.log(this.formModel.value.ImageName);
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      ImageName: this.formModel.value.ImageName,
      Password: this.formModel.value.Passwords.Password,
    };
    return this.http.post(this.BaseURI + "/ApplicationUser/Register", body);
     
  }
  uploadFile(){
    if(this.ImageFile != null){
      const formDate = new FormData();
      formDate.append('file', this.ImageFile);
      return this.http.post(this.BaseURI + "/ApplicationUser/uploadFile", formDate).subscribe();
    }
  }

}
