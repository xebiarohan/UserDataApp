import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.appService.getUsers(1);
  }

  onSubmit(form: NgForm): void {
    const validationResponse = this.appService.validateUser(form.value.email, form.value.password);
    if (validationResponse.data.status === 'success') {
      this.router.navigate(['/users']);
    }
  }

}
