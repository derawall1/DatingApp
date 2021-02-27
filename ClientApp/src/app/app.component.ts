import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating Appn';
  users:any;
  url:string ='https://localhost:5001/api/';
  constructor(private http: HttpClient){

  }
  ngOnInit() {
   this.getUsers(this.url+'users');
  }
  getUsers(apiUrl:string){
    this.http.get(apiUrl).subscribe(response =>{
      this.users=response;
    }, error =>{
      console.log(error);
    })
  }
}
