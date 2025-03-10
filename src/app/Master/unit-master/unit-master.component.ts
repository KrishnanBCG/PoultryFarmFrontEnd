import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'app/Service/apiservice.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-unit-master',
  templateUrl: './unit-master.component.html',
  styleUrls: ['./unit-master.component.css']
})
export class UnitMasterComponent implements OnInit {

  term: string
  isAddComponnet: boolean = false
  isEditComponnet: boolean = false
  p: number = 1;
  isBtnSubmitted: boolean = false
  unitTable: any = [];
  userId: any
  unitMasterForm: FormGroup
  unitData: any
  SavedMessage:boolean
  SavedErrorMessage:boolean
  UpdateMessage:boolean
  UpdateErrorMessage:boolean
  DeletedMessage:boolean
  updateId:number
  constructor(private fb: FormBuilder, public API: ApiserviceService, private router: Router) {

    this.unitMasterForm = this.fb.group({
      unitName: this.fb.control('', Validators.required),
      capacity: this.fb.control('', Validators.required),
      userid: this.fb.control(null, Validators.required),
    })
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem("userId")
    this.isAddComponnet = false;
    this.isEditComponnet = false;
    this.Alldata()
  }

  callAdd() {
    this.isAddComponnet = true;
    this.isEditComponnet = false;

  }


  callEdit(id:any) {
    this.updateId = id
    this.isEditComponnet = true;
    this.isAddComponnet = false;
    this.API.getsingleid('UnitMaster',id).subscribe((res)=>{
      this.unitMasterForm.patchValue({
        unitName: res.unitName,
        capacity: res.capacity,
        userid: this.userId,
      })
    })
  }
  Alldata() {
    this.API.get('UnitMaster').subscribe((res) => {
      this.unitData = res
    })
  }

  onSave() {
    this.unitMasterForm.controls['userid'].setValue(this.userId)
    if (this.unitMasterForm.valid) {
      this.API.get('UnitMaster').subscribe((res) => {
        const unitData = res
        const check = unitData.find((x) => x.unitName == this.unitMasterForm.get('unitName').value)
        if (!check) {
          this.API.post('UnitMaster', this.unitMasterForm.value).subscribe((res) => {
            this.SavedMessage=true
            this.isAddComponnet = false;
            this.isEditComponnet = false;
            setTimeout(() => {
              this.SavedMessage=false
            }, 2000);
            this.Alldata()
          }, (error) => {
            this.SavedErrorMessage=true
            setTimeout(() => {
              this.SavedErrorMessage=false
            }, 2000);
          })
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Name Already Exits"
          });

        }
      })
    }
  }
  onEdit() {
    this.API.updatedata('UnitMaster',this.updateId,this.unitMasterForm.value).subscribe((res)=>{
      this.UpdateMessage = true
      this.isAddComponnet = false;
      this.isEditComponnet = false;      
      setTimeout(() => {
        this.UpdateMessage = false
      }, 2000);
    },(error)=>{
      this.UpdateErrorMessage = true
      setTimeout(() => {
        this.UpdateErrorMessage = false
      }, 2000);
    })
  }
  onClear() {
    this.isAddComponnet = false;
    this.isEditComponnet = false;
    this.Alldata()
  }
}
