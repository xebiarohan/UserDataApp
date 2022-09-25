import { Injectable } from '@angular/core';
import users from '../assets/users.json';
import { Users } from '../models/users';
import { User } from '../models/user';
import { UserDto } from '../models/userDto';
import { Status } from '../models/success';
import {Subject } from 'rxjs';
import { Constants } from 'src/constants/constants';


interface ResponseStatus {
    'data': Status
}

interface UserResponse {
    'data': User
}

interface ValidatedUserResponse {
    'data': {
        status: Status,
        user: User
    }
}

@Injectable({
    providedIn: 'root'
})
export class UserDataService {

    public $users: Subject<Users> = new Subject<Users>();
    private _users: Users = new Users();
    private _fetchedUsers: UserDto[] = [];

    fetchAllUsers(): void {
        this._fetchedUsers = users.data;
    }

    getUsers(pageNumber: number): void {
        const start = pageNumber === 1 ? 0 : (pageNumber - 1) * this._users.per_page;
        const end = pageNumber === 1 ? this._users.per_page : pageNumber * this._users.per_page;
        this._users.data = [];
        this._fetchedUsers.slice(start, end).forEach(user => {
            this._users.data.push(new User(user.id, user.email, user.first_name, user.last_name, user.avatar));
        });

        this._setInitialUsersDetails(pageNumber);

        setTimeout(() => {
            this.$users.next(this._users);
        }, this._getRandomDelay());
    }

    getUser(id: number): Promise<UserResponse | ResponseStatus> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = this._users.data.find(user => user?.userId === +id);
                if (user) {
                    resolve({ 'data': user });
                } else {
                    reject({ 'data': new Status(Constants.FAILED) });
                }
            }, this._getRandomDelay());

        });
    }

    createUser(user: UserDto): Promise<ResponseStatus> {
        return new Promise((resolve, reject) => {
            this._fetchedUsers.push(user);
            setTimeout(() => {
                resolve({ 'data': new Status(Constants.SUCCESS) })
            }, this._getRandomDelay());
        });
    }

    deleteUser(id: number): Promise<ResponseStatus> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = this._fetchedUsers.findIndex(user => user.id === id);
                if (index < 0) {
                    reject({ 'data': new Status(Constants.FAILED) });
                }
                this._fetchedUsers.splice(index, 1);

                resolve({ 'data': new Status(Constants.SUCCESS) });
            }, this._getRandomDelay());
        });
    }

    updateUser(updatedUser: User): Promise<ResponseStatus> {
        return new Promise((resolve, reject) => {
            this._fetchedUsers.forEach(currentUser => {
                if (currentUser.id === updatedUser.userId) {
                    currentUser.first_name = updatedUser.firstName;
                    currentUser.last_name = updatedUser.lastName;
                    currentUser.email = updatedUser.userEmail;
                    currentUser.avatar = updatedUser.userAvatar;
                }
            });
            setTimeout(() => {
                resolve({ 'data': new Status(Constants.SUCCESS) });
            }, this._getRandomDelay());
        });

    }

    validateUser(email: string, password: string): ValidatedUserResponse | ResponseStatus {
        const user = this._fetchedUsers.find(user => {
            return (user.email === email && user.password === password)
        });
        if (user) {
            return {
                'data': {
                    'status': Constants.SUCCESS,
                    'user': new User(user.id, user.email, user.first_name, user.last_name, user.avatar)
                }
            }
        } else {
            return {
                'data': new Status(Constants.FAILED)
            }
        }

    }

    getUserId(): number {
        const ids = this._fetchedUsers.map(user => user.id);
        const currentMaxId = Math.max(...ids);
        return currentMaxId + 1;

    }

    private _getRandomDelay(): number {
        return (Math.floor(Math.random() * 3) + 1) * 1000;
    }

    private _setInitialUsersDetails(pageNumber: number): void {
        this._users.per_page = 6;
        this._users.page = pageNumber;
        this._users.total = users.data.length;
        this._users.total_pages = this._fetchedUsers.length / 6 + (this._users.total % 6 === 0 ? 0 : 1);
    }
}