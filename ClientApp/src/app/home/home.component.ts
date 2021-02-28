//import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode=false;
  //users:any;
 // baseUrl = 'https://localhost:5001/api/'
  constructor() { }

  ngOnInit(): void {
    //this.getUsers(this.baseUrl+'users');
  }

  registerToggle()
  {
    this.registerMode=!this.registerMode;
  }
  // getUsers(apiUrl:string){
  //   this.http.get(apiUrl).subscribe(users =>this.users = users);
  // }

  cancleRegisterMode(event:boolean){
    this.registerMode=event;
  }

}
