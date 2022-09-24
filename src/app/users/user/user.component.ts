import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { User } from 'src/app/models/user';

import { faker } from '@faker-js/faker';
import { UserDto } from 'src/app/models/userDto';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{

  public user!: User;
  isInEditMode: boolean = false;
  fakeUserName: string = '';
  fakeAvatar: string = '';
  isInViewMode = false;

  @ViewChild('f', { static: false }) form!: NgForm;


  constructor(private appService: AppService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      if (param['id']) {
        this.isInViewMode = true;
        this.getUserToUpdate(param['id']);
      }
    });

    if (!this.isInViewMode) {
      this.fakeUserName = faker.internet.userName();
      this.fakeAvatar = faker.internet.avatar();
    }
  }

  // ngAfterViewInit() {
  //   this.route.params.subscribe((param: Params) => {
  //     if (param['id']) {
  //       this.isInViewMode = true;
  //       this.getUserToUpdate(param['id']);
  //     }
  //   });
  // }

  onSubmit() {
    if (this.isInEditMode) {
      this._updateUser();
    } else {
      this._createNewUser();
    }
  }


  async getUserToUpdate(id: number) {
    const userResponse = await this.appService.getUser(id);
    if (userResponse.data && userResponse.data instanceof User) {
      this.user = userResponse.data;
      this._populateFormValues();
    }
  }

  onClose() {
    this.router.navigate(['/users']);
  }

  onEnablingEditMode() {
    this.isInViewMode = false;
    this.isInEditMode = true;
  }

  private _populateFormValues() {
    this.form.setValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.userEmail,
      avatar: this.user.userAvatar
    })
  }

  private _updateUser() {
    const user = new User(this.user.userId, this.form.value.email, this.form.value.firstName, this.form.value.lastName, this.form.value.avatar);
    this.appService.updateUser(user).then(response => {
      if (response.data && response.data.status === 'success') {
        this.router.navigate(['/users']);
      }
    });
    this.isInEditMode = false;
  }

  private async _createNewUser() {

    const user = new UserDto(this.appService.getUserId(),
      this.form.value.email,
      this.form.value.password,
      this.form.value.firstName,
      this.form.value.lastName,
      this.form.value.avatar);

    const response = await this.appService.createUser(user);

    if (response && response?.data.status === 'success') {
      this.router.navigate(['/users']);
    }
  }

}
