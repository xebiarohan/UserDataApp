import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Users } from '../models/users';

import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users!: Users;
  headers!: string[];
  constructor(private appService: AppService, private router: Router) { }
  pages!: number[];

  ngOnInit(): void {
    this.appService.getUsers(1);
    this._updateUsersOnCurrentPage();

  }

  public onViewUser(id: number) {
    this.router.navigate(['/user/' + id]);
  }

  public async onDeleteUser(usedId: number) {
    const result = await this.appService.deleteUser(usedId);
    this.appService.getUsers(this.users.page);
    console.log(result);
  }

  public async onPageChange(pageNumber: number) {
    this.appService.getUsers(pageNumber);
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
    this.appService.$users.subscribe(users => {
      this.users = users;
      this._getTitles();
      this._setNumberOfPages(users);
    });
  }

}
