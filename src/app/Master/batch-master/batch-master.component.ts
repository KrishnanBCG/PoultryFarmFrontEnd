import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'app/Service/apiservice.service';


@Component({
  selector: 'app-batch-master',
  templateUrl: './batch-master.component.html',
  styleUrls: ['./batch-master.component.css']
})
export class BatchMasterComponent implements OnInit {


  term: string
  isAddComponnet: boolean = false
  isEditComponnet: boolean = false
  p: number = 1;
  isBtnSubmitted: boolean = false
  batchMasterForm: FormGroup
  CoveredCount: number
  tableDataList: any = [];
  userId: any


  SavedMessage: boolean
  SavedErrorMessage: boolean
  UpdateMessage: boolean
  UpdateErrorMessage: boolean
  DeletedMessage: boolean
  public dateTime: Date;
  todayDate: string;
  constructor(private fb: FormBuilder, public API: ApiserviceService, private router: Router) {
    this.fetchData();
    this.batchMasterForm = this.fb.group({
      userId: this.fb.control(this.userId),
      batchName: this.fb.control(''),
      unitName: this.fb.control(null),
      completedStatus: this.fb.control(false),
      startDate: this.fb.control(null),
    })
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
  }

  fetchData() {
    const fetchedData = this.tableDataList
    this.tableDataList = fetchedData.map(item => ({ ...item, covered: 0 }));
  }
  UnitMasterlist: Array<any> = []
  BatchMasterlist: Array<any> = []
  updateId:number
  ngOnInit(): void {
    this.todayDate = this.getCurrentDate();
    this.getunitname()
    this.isAddComponnet = false;
    this.isEditComponnet = false;
    this.userId = localStorage.getItem("userId")
  }

  getunitname() {
    this.API.get('UnitMaster').subscribe((res) => {
      this.UnitMasterlist = res
    })

    this.API.get('BatchMaster').subscribe((res) => {
      this.BatchMasterlist = res
    })

  }

  callAdd() {
    this.batchMasterForm.controls['startDate'].setValue(this.todayDate)
    this.isAddComponnet = true;
    this.isEditComponnet = false;
  }

  callEdit(id:any) {
    this.updateId = id
    this.isEditComponnet = true;
    this.isAddComponnet = false;
    this.API.getsingleid('BatchMaster',id).subscribe((res)=>{
      this.tableDataList = res.BatchUnitData
      if(!res.startDate){
        this.batchMasterForm.controls['startDate'].setValue(this.todayDate)        
      }else{
        this.batchMasterForm.controls['startDate'].setValue(res.startDate)

      }
      this.batchMasterForm.patchValue({
        batchName: res.batchName
        
      })
    })
  }

  updateCovered(index: number, value: string, x: number) {
    this.tableDataList[index].covered = value;
  }



  addunit() {
    const unitid = this.batchMasterForm.controls['unitName'].value;
    const unitdetails = this.UnitMasterlist.filter((x) => x.id == unitid)
    if (unitdetails.length > 0) {
      if (this.tableDataList.length == 0) {
        this.tableDataList = unitdetails
        this.batchMasterForm.controls['unitName'].reset()
      } else {
        const mergedData = [...this.tableDataList, ...unitdetails];
        const uniquedata = [...new Map(mergedData.map(item => [item.id, item])).values()];
        this.tableDataList = uniquedata;
        this.batchMasterForm.controls['unitName'].reset()
      }
    }

  }


  onSave() {
    this.batchMasterForm.controls['userId'].setValue(this.userId)
    this.batchMasterForm.controls['completedStatus'].setValue(false)
    const Savedata = {
      ...this.batchMasterForm.value,
      "BatchUnitData": this.tableDataList
    }
    this.API.post('BatchMaster', Savedata).subscribe((res) => {
      this.batchMasterForm.reset()
      this.SavedMessage = true
      this.isAddComponnet = false;
      this.isEditComponnet = false;
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
  onEdit() {
    this.batchMasterForm.controls['userId'].setValue(this.userId)
    this.batchMasterForm.controls['completedStatus'].setValue(false)
    const Savedata = {
      ...this.batchMasterForm.value,
      "BatchUnitData": this.tableDataList
    }
    this.API.updatedata('BatchMaster',this.updateId,Savedata).subscribe((res) => {
      this.tableDataList = []
      this.batchMasterForm.reset()
      this.UpdateMessage = true
      this.isAddComponnet = false;
      this.isEditComponnet = false;
      setTimeout(() => {
        this.UpdateMessage = false

      }, 2000);
    }, (error) => {
      this.UpdateErrorMessage = true
      setTimeout(() => {
        this.UpdateErrorMessage = false
      }, 2000);
    })
  }
  onClear() {
    this.isAddComponnet = false;
    this.isEditComponnet = false;
  }
}
