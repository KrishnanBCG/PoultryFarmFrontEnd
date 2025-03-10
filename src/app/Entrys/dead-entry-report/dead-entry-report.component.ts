import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from 'app/Service/apiservice.service';
import { EncryptionService } from 'app/Service/encryption.service';
@Component({
  selector: 'app-dead-entry-report',
  templateUrl: './dead-entry-report.component.html',
  styleUrls: ['./dead-entry-report.component.css']
})
export class DeadEntryReportComponent implements OnInit {

  p: number = 1;
  term: string
  isAddComponnet: boolean = false
  isEditComponnet: boolean = false
  
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

  loadTableData: any = [];
  titleName:string
  StartDate:Date
  constructor(private fb: FormBuilder, public API: ApiserviceService, private router: ActivatedRoute,private encrypt : EncryptionService) {
   }

  entryId:number
  ngOnInit(): void {
    const encryptionId = this.encrypt.decryptionAES(this.router.snapshot.paramMap.get('id'))
    this.entryId = parseInt(encryptionId) 
    this.loadData()
  }


  loadData(){
    this.API.ascdata("DeadEntry").subscribe((res)=>{
      this.loadTableData = res
      this.titleName = res[0].batchName
      this.StartDate = res[0].startDate
    })
  }

  countDays(targetDate: Date): string {
    if (!this.StartDate) return "Day No 0";
    
    const start = new Date(this.StartDate);
    const end = new Date(targetDate);
    
    if (end < start) return "Day No 0";
  
    let count = 1;
    let loop = new Date(start);
  
    while (loop < end) {
      loop.setDate(loop.getDate() + 1);
      count++;
    }
  
    return `Day ${count}`; // Use backticks for string interpolation
  }
  
  

}
