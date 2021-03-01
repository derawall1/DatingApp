import { Component, EventEmitter,  OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 // @Input() users: any;
  @Output() cancelRegister =new EventEmitter();
  model: any = {};
  constructor(private accountService:AccountService,
              private toastr: ToastrService
              ) { }

  ngOnInit(): void {
  }
  register() {
    this.accountService.register(this.model)
      .subscribe(res =>{
        console.log(res);
        this.cancel();
      }, err =>{
        this.toastr.error(err.error);
      })
  }
  cancel() {
    //this.model.userName="";
    //this.model.password="";
    this.cancelRegister.emit(false);
  }
}
