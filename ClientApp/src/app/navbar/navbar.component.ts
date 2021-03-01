import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
//import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  model:any = {};
 // currentUser$:Observable<User>;

  constructor(public accountService: AccountService, 
              private router: Router,
              private toastr: ToastrService
              
              ) { }

  ngOnInit(): void {
    //this.currentUser$=this.accountService.currentUser$;
  }
  login(){
    this.accountService.login(this.model)
          .subscribe(res =>{
            this.router.navigateByUrl('/members');
            
          });
  }
  logout(){
    this.model.username='';
    this.model.password='';
   
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  

}
