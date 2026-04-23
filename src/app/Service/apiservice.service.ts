import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private https:HttpClient) { }
// 
  // apiurl = "http://localhost:3000"
  apiurl = "https://poultryfarmdatabase-2.onrender.com"
// apiurl = "https://poultryfarmdatabase-f6un.onrender.com"
// apiurl = "https://krishnanbcg.github.io/PoultryFarmDatabase/FarmDatabase.json"

post(string:any,data:any): Observable<any> {
  return this.https.post(this.apiurl+`/${string}`,data)
}

get(string:any,): Observable<any> {
  return this.https.get(this.apiurl+`/${string}`)
}

delete(string:any,id:any): Observable<any> {
  return this.https.delete(this.apiurl+`/${string}/${id}`)
}
// getsingleid(string:any,id:any): Observable<any> {
//   return this.https.get(this.apiurl+`/${string}/${id}`)
// }


getsingleid(string:any,id:any): Observable<any> {
  return this.https.get(this.apiurl+`/${string}?id=${id}`)
}

updatedata(string:any,id:any,data:any): Observable<any> {
  return this.https.put(this.apiurl+`/${string}/${id}`,data)
}

// descdata(string:any): Observable<any> {
//   return this.https.get(this.apiurl+`/${string}/?_sort=entryDate&_order=desc`)
// }
// ascdata(string:any): Observable<any> {
//   return this.https.get(this.apiurl+`/${string}/?_sort=entryDate&_order=asc`)
// }

DataByUserIdascdata(string:any , id:any): Observable<any> {
  return this.https.get(`${this.apiurl}/${string}?userid=${id}&_sort=entryDate&_order=asc`)
}

DataByUserIddescdata(string: any, id: any): Observable<any> {
  return this.https.get(`${this.apiurl}/${string}?userid=${id}&_sort=entryDate&_order=asc`);
}


getDataByUserId(string:any,id:any): Observable<any> {
  return this.https.get(this.apiurl+`/${string}?userid=${id}`)
}

getDataByUserid(string:any,id:any): Observable<any> {
  return this.https.get(this.apiurl+`/${string}?userId=${id}`)
}

DataBybatchNamedescdata(string: any, batchName: any): Observable<any> {
  return this.https.get(`${this.apiurl}/${string}?batchName=${batchName}&_sort=entryDate&_order=desc`);
}

DataBybatchNamedescdata01(string: any, batchName: any, userId: any): Observable<any> {
  return this.https.get(`${this.apiurl}/${string}?batchName=${batchName}&userId=${userId}&_sort=entryDate&_order=asc`);
}
}
