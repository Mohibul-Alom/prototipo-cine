import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Iuser } from '../../models/iuser';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {


  public userLogIn!: FormGroup;

  public submitted: boolean = false;

  public pepe?: string;

  constructor(private formBuilder: FormBuilder) {
    
    this.initForm();
  }

  ngOnInit(): void { }

  public initForm() {
    this.userLogIn = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
    });
  }

  public onSubmit(): void {
    this.submitted = true;

    const user: Iuser = {
      email: this.userLogIn.get('email')?.value,
      password: this.userLogIn.get('password')?.value,
    }
    console.log(user);

    if (this.userLogIn.valid) {
      this.userLogIn.reset();
      this.submitted = false;
    }
  }









  
  // constructor(private formBuilder:FormBuilder) { }
  
  // ngOnInit(): void {
  //   this.initForm();
  // }

  // public userLogIn!: FormGroup;

  // public submitted:boolean = false;
  
  // public initForm(): void {

  //   this.userLogIn = this.formBuilder.group({

  //     email:['',Validators.required,Validators.email],
  //     password:['',Validators.required],

  //   });

  // }

  // public onSubmit(): void {
  //   this.submitted = true;

  //   const user:Iuser={
  //     email:this.userLogIn.get('email')?.value,
  //     password:this.userLogIn.get('password')?.value,
  //   };

  //   if(this.userLogIn.valid){
  //     console.log(user);
  //     this.userLogIn.reset();
  //     this.submitted = false;
  //   }
  // }

}
