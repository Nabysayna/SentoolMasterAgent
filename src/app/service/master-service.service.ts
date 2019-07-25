import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MasterServiceService {
  private url:string='http://localhost:8088/db_mbirmi/index.php';
  private header :HttpHeaders;
  constructor(private http:HttpClient) {
    this.header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
   }

  token="b21efc053cc7e16ce4729c2ce0e8ad90";
  public listeOperation(dateDebut,dateFin): Promise<any>{
    let params="param="+JSON.stringify({dateDebut:dateDebut,dateFin:dateFin,token:this.token});
    console.log(params);
    
    let link=this.url+"/utils/listOperation";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  }
  public listOperationByPoint(dateDebut,dateFin,id_user): Promise<any>{
    let params="param="+JSON.stringify({dateDebut:dateDebut,dateFin:dateFin,id_user:id_user});
    console.log(params);
    
    let link=this.url+"/utils/listOperationByPoint";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  }
  
  public listeUser(): Promise<any>{
    let params="param="+JSON.stringify({token:this.token});
    console.log(params);
    
    let link=this.url+"/utils/listUsers";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  }

}
