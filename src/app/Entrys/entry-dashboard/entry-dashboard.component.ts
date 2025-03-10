import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'app/Service/apiservice.service';
import { EncryptionService } from 'app/Service/encryption.service';

import * as crypto from "crypto-js";

@Component({
  selector: 'app-entry-dashboard',
  templateUrl: './entry-dashboard.component.html',
  styleUrls: ['./entry-dashboard.component.css']
})
export class EntryDashboardComponent implements OnInit {
  p:number=1
  tableDataList: any = [];
  userId: any

  BatchlistData: any = [];

  SavedMessage: boolean
  SavedErrorMessage: boolean
  UpdateMessage: boolean
  UpdateErrorMessage: boolean
  DeletedMessage: boolean

  constructor(private fb: FormBuilder, public API: ApiserviceService, private router: Router,private encrypt : EncryptionService) { }

  ngOnInit(): void {
    this.Batchlist()
  }
  Batchlist(){
    this.API.get('BatchMaster').subscribe((res)=>{
      this.BatchlistData = res
    })
  }

  deadEntryRouter(x:any){
    const encryptedId = this.encrypt.encryptionAES(x.id.toString());
    this.router.navigate(['/deadEntry', encryptedId ]);
  }
  deadEntryReport(x:any){
    const encryptedId = this.encrypt.encryptionAES(x.id.toString());
    this.router.navigate(['/deadEntryReport', encryptedId ]);
  }

}
