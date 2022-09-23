import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Users } from '../models/users';

import { MatPaginatorModule, MatPaginatorDefaultOptions } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../models/user';
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

  public onEditUser(id: number) {
    this.router.navigate(['/users/' + id]);
  }

  public async onDeleteUser(usedId: number) {
    const result = await this.appService.deleteUser(usedId);
    console.log(result);
  }

  public async onPageChange(pageNumber: number) {
    this.appService.getUsers(pageNumber);
    //this._updateUsersOnCurrentPage();
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
