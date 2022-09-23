import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public user!: User;
  isInEditMode: boolean = false;

  @ViewChild('f',{static: false}) form!: NgForm;


  constructor(private appService: AppService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      console.log(param['id']);
      if(param['id']) {
        this.isInEditMode = true;
        this.getUserToUpdate(param['id']);
      }
    })
  }

  onSubmit(form: NgForm) {

  }


  async getUserToUpdate(id: number) {
    const userResponse = await this.appService.getUser(id);
    if(userResponse.data && userResponse.data instanceof User) {
      this.user = userResponse.data;
      this._populateFormValues();
      console.log(this.user.firstName);
    }
  }

  private _populateFormValues() {
    this.form.setValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.userEmail,
      avatar: this.user.userAvatar
    })
  }

}
