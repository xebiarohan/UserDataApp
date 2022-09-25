import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/users';

import { Router } from '@angular/router';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users!: Users;
  headers!: string[];
  constructor(private userDataService: UserDataService, private router: Router) { }
  pages!: number[];
  something: boolean = true;

  ngOnInit(): void {
    this.userDataService.getUsers(1);
    this._updateUsersOnCurrentPage();

  }

  public onViewUser(id: number) {
    this.router.navigate(['/user/' + id]);
  }

  public async onDeleteUser(usedId: number) {
    const result = await this.userDataService.deleteUser(usedId);
    this.userDataService.getUsers(this.users.page);
  }

  public async onPageChange(pageNumber: number) {
    this.userDataService.getUsers(pageNumber);
  }

  private _getTitles() {
    if (this.users?.data) {
      this.headers = Object.keys(this.users.data[0])
    }
  }

  private _setNumberOfPages(users: Users) {
    this.pages = Array.from({ length: users?.total_pages }, (x, i) => i + 1);
  }

  private _updateUsersOnCurrentPage() {
    this.userDataService.$users.subscribe(users => {
      this.users = users;
      this._getTitles();
      this._setNumberOfPages(users);
    });
  }

}
