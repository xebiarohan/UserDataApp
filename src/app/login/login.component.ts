import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from 'src/constants/constants';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isIncorrectPassword: boolean  = false;

  constructor(private userDataService: UserDataService, private router: Router) { }

  ngOnInit(): void {
    this.userDataService.getUsers(1);
  }

  onSubmit(form: NgForm): void {
    const validationResponse = this.userDataService.validateUser(form.value.email, form.value.password);
    if (validationResponse.data.status === Constants.SUCCESS) {
      this.isIncorrectPassword = false;
      this.router.navigate(['/users']);
    } else {
      this.isIncorrectPassword = true;
    }
  }

}
