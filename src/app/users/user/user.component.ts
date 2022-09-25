import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/models/user';

import { faker } from '@faker-js/faker';
import { UserDto } from 'src/models/userDto';
import { UserDataService } from 'src/app/user-data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public user!: User;
  isInEditMode: boolean = false;
  fakeUserName: string = '';
  fakeAvatar: string = '';
  isInViewMode = false;

  @ViewChild('f', { static: false }) form!: NgForm;


  constructor(private userDataService: UserDataService, private route: ActivatedRoute, private router: Router) { }

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

  onSubmit(): void {
    if (this.isInEditMode) {
      this._updateUser();
    } else {
      this._createNewUser();
    }
  }


  async getUserToUpdate(id: number): Promise<void> {
    const userResponse = await this.userDataService.getUser(id);
    if (userResponse.data && userResponse.data instanceof User) {
      this.user = userResponse.data;
      this._populateFormValues();
    }
  }

  onClose(): void {
    this.router.navigate(['/users']);
  }

  onEnablingEditMode(): void {
    this.isInViewMode = false;
    this.isInEditMode = true;
  }

  private _populateFormValues(): void {
    this.form.setValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.userEmail,
      avatar: this.user.userAvatar
    })
  }

  private _updateUser(): void {
    const user = new User(this.user.userId, this.form.value.email, this.form.value.firstName, this.form.value.lastName, this.form.value.avatar);
    this.userDataService.updateUser(user).then(response => {
      this.isInEditMode = false;
      if (response.data && response.data.status === 'success') {
        this.router.navigate(['/users']);
      }
    });
   
  }

  private async _createNewUser(): Promise<void> {

    const user = new UserDto(this.userDataService.getUserId(),
      this.form.value.email,
      this.form.value.password,
      this.form.value.firstName,
      this.form.value.lastName,
      this.form.value.avatar);

    const response = await this.userDataService.createUser(user);

    if (response && response?.data.status === 'success') {
      this.router.navigate(['/users']);
    }
  }

}
