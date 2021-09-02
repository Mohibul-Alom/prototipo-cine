import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Iuser } from '../../models/iuser';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  public userLogIn!: FormGroup;

  public submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route:Router,
    ) {
    
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
    this.login(user);

    if (this.userLogIn.valid) {
      this.userLogIn.reset();
      this.submitted = false;
    }
  }

  private login(user:Iuser): void {
    
    this.authService.validate(user.email,user.password).subscribe({
      next:data => {
        this.authService.setUserInfo(data);
        this.route.navigate(['home']);
      },
      error: error => {
        console.log(error);
      }

    })

  }
}
