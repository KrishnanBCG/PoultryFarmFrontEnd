import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../Service/apiservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signuppage: boolean = true
  loginpage: boolean = false
  signupDetails: FormGroup
  signinDetails: FormGroup
  constructor(private fb: FormBuilder, public API: ApiserviceService , private router : Router) {
    this.signupDetails = this.fb.group({
      companyName :this.fb.control('BCG Chicken Poultry'),
      userName: this.fb.control('', Validators.required),
      email: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
      firstName: this.fb.control(''),
      lastName: this.fb.control(''),
      address: this.fb.control(''),
      city: this.fb.control(''),
      country: this.fb.control(''),
      postalcode: this.fb.control(''),
      abortme: this.fb.control('')
    })

    this.signinDetails = this.fb.group({
      email: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
    })
  }

  ngOnInit(): void {

  }

  loginprocess(){
    this.API.get('userDetails').subscribe((res) => {
      const loginlist = res
      const check = loginlist.find((x) => x.email == this.signinDetails.get('email').value && x.password == this.signinDetails.get('password').value)
      
      if(check){
        this.router.navigate(['/dashboard']);
        const userdetails = loginlist.filter((x)=>x.email == this.signinDetails.get('email').value)
        localStorage.setItem("userId",userdetails[0].id);
        Swal.fire({
          title: "Welcome "+ userdetails[0].userName,
          icon: "success"
        });
      }else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong"
        });
      }
    })
  }



  Registerprocess() {
    this.API.get('userDetails').subscribe((res) => {
      const Registerlist = res
      const check = Registerlist.find((x) => x.email == this.signupDetails.get('email').value)
      if (!check) {
        this.API.post('userDetails', this.signupDetails.value).subscribe((res) => {

          Swal.fire({
            title: "Registration Completed Successfully",
            icon: "success"
          });
          this.signupDetails.reset()
        })
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email already exists"
        });

      }
    })
  }

  signin() {
    this.signuppage = false
    this.loginpage = true
  }
  signup() {
    this.signuppage = true
    this.loginpage = false
  }

}
