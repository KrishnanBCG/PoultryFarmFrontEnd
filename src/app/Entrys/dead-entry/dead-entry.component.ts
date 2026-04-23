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
  lastentrymsg:boolean
  bacthNameForpach:string
  constructor(private fb: FormBuilder, private routers: Router , public API: ApiserviceService, private router: ActivatedRoute,private encrypt : EncryptionService) {

    this.DailyEntryForm = this.fb.group({
      userId:new FormControl(),
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
      this. bacthNameForpach = res[0].batchName 
      this.startDatevalue = res[0].startDate
      const userid = localStorage.getItem("userId")
        this.API.DataBybatchNamedescdata('DeadEntry',this.bacthNameForpach).subscribe((res)=>{
          const Data = res
          
          if(Data.length === 0){
            this.DailyEntryForm.controls['batchName'].setValue(patchdata[0].batchName)
            this.DailyEntryForm.controls['startDate'].setValue(patchdata[0].startDate)
            const EntryData = this.DailyEntryForm.get('Entry') as FormArray;
            patchdata[0].BatchUnitData.forEach((dataItem: any) => {
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
               covered: [dataItem.remaining],
               deathcount : [dataItem.deathcount],
               remaining : []
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
    const userid = localStorage.getItem("userId")
    this.API.DataBybatchNamedescdata('DeadEntry',this.bacthNameForpach).subscribe((res)=>{
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
        const userid = localStorage.getItem("userId") 
        this.DailyEntryForm.controls['userId'].setValue(userid)
        this.DailyEntryForm.controls['batchId'].setValue(this.entryId)
        this.API.post('DeadEntry', this.DailyEntryForm.value).subscribe((res)=>{
          this.DailyEntryForm.reset()
          this.SavedMessage = true
          this.routers.navigate(['/entry-list'])
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
      this.lastentrymsg = true
      setTimeout(() => {
        this.lastentrymsg = false
      }, 6000);
    }
    
    })
  }



};