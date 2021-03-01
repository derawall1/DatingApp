import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {
  baseUrl = "https://localhost:5001/api/";
  validationErrors: string[] =[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  // 404 error
  get404Error() {
    return this.http.get(this.baseUrl + "buggy/not-found").subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
  }

  // 400 error
  get400Error() {
    return this.http.get(this.baseUrl + "buggy/bad-request").subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
  }

  // 500 error
  get500Error() {
    return this.http.get(this.baseUrl + "buggy/server-error").subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
  }

  // 401 error
  get401Error() {
    return this.http.get(this.baseUrl + "buggy/auth").subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
  }

  // 404 error
  get400ValidationError() {
    return this.http.post(this.baseUrl + "account/register",{}).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
      this.validationErrors=err;
    })
  }

}
