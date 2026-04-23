import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'app/Service/apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profileUpdateDetails: FormGroup
  userId: any
  SavedMessage:boolean
  SavedErrorMessage:boolean
  UpdateMessage:boolean
  UpdateErrorMessage:boolean
  DeletedMessage:boolean
  constructor(private fb: FormBuilder, public API: ApiserviceService, private router: Router) {

    this.profileUpdateDetails = this.fb.group({
      companyName: this.fb.control('BCG Chicken Poultry'),
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
  }

  ngOnInit() {
    this.userId = localStorage.getItem("userId")
    this.Datapach()
  }

  Datapach() {
    this.API.get('userDetails').subscribe((res) => {
      const loginlist = res
      const profile = loginlist.find((x) => x.id == this.userId)

      this.profileUpdateDetails.patchValue({
        id: profile.id,
        companyName: 'BCG Chicken Poultry',
        userName: profile.userName,
        email: profile.email,
        password: profile.password,
        firstName: profile.firstName,
        lastName: profile.lastName,
        address: profile.address,
        city: profile.city,
        country: profile.country,
        postalcode: profile.postalcode,
        abortme: profile.abortme
      })
    })
  }


  updateprofile() {
    this.API.updatedata('userDetails', this.userId, this.profileUpdateDetails.value).subscribe((res) => {
      this.UpdateMessage=true
      setTimeout(() => {
        this.UpdateMessage=false
      }, 2000);
    }, (error) => {
      this.UpdateErrorMessage=true
      setTimeout(() => {
        this.UpdateErrorMessage=false
      }, 2000);
    })
  }
}
