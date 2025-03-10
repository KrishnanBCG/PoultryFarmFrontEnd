import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from 'app/Service/apiservice.service';
import { EncryptionService } from 'app/Service/encryption.service';


@Component({
  selector: 'app-dead-entry',
  templateUrl: './dead-entry.component.html',
  styleUrls: ['./dead-entry.component.css']
})
export class DeadEntryComponent implements OnInit {
  LiveDate:Date
  DailyEntryForm : FormGroup
  todayDate:string
  startDatevalue:Date
  Savedisable:boolean = false
  constructor(private fb: FormBuilder, public API: ApiserviceService, private router: ActivatedRoute,private encrypt : EncryptionService) {

    this.DailyEntryForm = this.fb.group({
      batchId:new FormControl(null),
      batchName:new FormControl(''),
      entryDate:new FormControl(''),
      lastEntry:[false],
      startDate:new FormControl(''),
      TotalRemaining:new FormControl(0),
      Entry: this.fb.array([ ])
    });

   }

   get items() {
    return this.DailyEntryForm.get("Entry") as FormArray;
  }
  entryId:number
  ngOnInit(): void {
    this.todayDate = this.getCurrentDate();
    this.DailyEntryForm.controls['entryDate'].setValue(this.todayDate)
    const encryptionId = this.encrypt.decryptionAES(this.router.snapshot.paramMap.get('id'))
    this.entryId = parseInt(encryptionId)  
    this.LiveDate = new Date()
    this.EntryDataPatch()
  }


  EntryDataPatch(){
    this.API.getsingleid('BatchMaster',this.entryId).subscribe((res)=>{
      const patchdata = res
      this.startDatevalue = res.startDate
        this.API.descdata('DeadEntry').subscribe((res)=>{
          const Data = res
          
          if(Data.length === 0){
            this.DailyEntryForm.controls['batchName'].setValue(patchdata.batchName)
            this.DailyEntryForm.controls['startDate'].setValue(patchdata.startDate)
            const EntryData = this.DailyEntryForm.get('Entry') as FormArray;
            patchdata.BatchUnitData.forEach((dataItem: any) => {
             const Details = this.fb.group({
               unit:[dataItem.unitName],
               covered: [dataItem.covered],
               deathcount : [],
               remaining : []
             });
             EntryData.push(Details);
             Details.get('deathcount')?.valueChanges.subscribe(() => {
               this.calculateDiff1();
               this.calculateDiff2();
             });
           });
          }else{
            this.DailyEntryForm.controls['startDate'].setValue(Data[0].startDate)
            this.DailyEntryForm.controls['batchName'].setValue(Data[0].batchName)
            this.DailyEntryForm.controls['entryDate'].setValue(this.todayDate)
            this.DailyEntryForm.controls['lastEntry'].setValue(Data[0].lastEntry)
            this.DailyEntryForm.controls['TotalRemaining'].setValue(Data[0].TotalRemaining)
            const EntryData = this.DailyEntryForm.get('Entry') as FormArray;
            Data[0].Entry.forEach((dataItem: any) => {
             const Details = this.fb.group({
               unit:[dataItem.unit],
               covered: [dataItem.covered],
               deathcount : [dataItem.deathcount],
               remaining : [dataItem.remaining]
             });
             EntryData.push(Details);
             Details.get('deathcount')?.valueChanges.subscribe(() => {
               this.calculateDiff1();
               this.calculateDiff2();
             });
           });
          }        
        })        
      

    })
  }


  calculateDiff1() {
    this.items.controls.forEach((control: AbstractControl) => {
      const row = control as FormGroup;
      if (row instanceof FormGroup) {
        const covered = parseFloat(row.get('covered')?.value || '0');
        const deathcount = parseFloat(row.get('deathcount')?.value || '0');

        const remaining = parseFloat((covered - deathcount).toFixed(2));
        row.patchValue({ remaining }, { emitEvent: false });
      }
    });
  }

  calculateDiff2() {
    let Remaining = 0
    this.items.controls.forEach((control: AbstractControl) => {
      const row = control as FormGroup;
      if (row instanceof FormGroup) {
        const remainingcount = parseFloat(row.get('remaining')?.value || '0');
        Remaining += remainingcount
        this.DailyEntryForm.controls['TotalRemaining'].setValue(Remaining)
      }
    });
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
  }

  SavedMessage:boolean
  SavedErrorMessage:boolean
  warningmsg:boolean
  onSave(){

    this.API.get('DeadEntry').subscribe((res)=>{
      const DatevalidationData = res   
      const lastEntry = DatevalidationData.some((x)=>x.startDate === this.startDatevalue && x.lastEntry === true)
      const Datevalidation = DatevalidationData.some((x)=>x.entryDate === this.DailyEntryForm.get('entryDate').value)
      if(!lastEntry){
        this.Savedisable = false
      if(Datevalidation){
        this.warningmsg=true
        setTimeout(() => {
          this.warningmsg = false
        }, 2000);
      }else{        
        this.DailyEntryForm.controls['batchId'].setValue(this.entryId)
        this.API.post('DeadEntry', this.DailyEntryForm.value).subscribe((res)=>{
          this.DailyEntryForm.reset()
          this.SavedMessage = true
          setTimeout(() => {
            this.SavedMessage = false
          }, 2000);
        }, (error) => {
          this.SavedErrorMessage = true
          setTimeout(() => {
            this.SavedErrorMessage = false
          }, 2000);
        })  
      }
    }else{
      this.Savedisable = true
    }
    
    })
  }



};