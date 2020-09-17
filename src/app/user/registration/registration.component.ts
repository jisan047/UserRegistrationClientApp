import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: [
    
  ]
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.service.uploadFile();
    this.service.register().subscribe(
      (res: any) => {
        if(res.succeeded){
          this.service.formModel.reset();
          this.toastr.success('New user created!', 'Registration successful');
        }
        else{
          res.errors.forEach(element =>{
            switch(element.code){
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken', 'Registration failed');
                break;
              default:
                this.toastr.error(element.description, 'Registration failed');
            }
          })
        }
      },
      err => {
        console.log(err);
        
      }
    )
  }
  onChange(event){
    console.log(event.target.files);
    this.service.formModel.value.ImageName = event.target.files[0].name;
    this.service.ImageFile = event.target.files[0];
  }

}
