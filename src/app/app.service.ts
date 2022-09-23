import { Injectable } from '@angular/core';
import users from '../assets/users.json';
import { Users } from './models/users';
import { User } from './models/user';
import { UserDto } from './models/userDto';
import { Status } from './models/success';
import { BehaviorSubject, Subject } from 'rxjs';


interface ResponseStatus {
    'data': Status
}

interface UserResponse {
    'data': User
}



@Injectable({
    providedIn: 'root'
})
export class AppService {


    private _users: Users = new Users();
    public $users: Subject<Users> = new Subject<Users>();
    private _fetchedUsers!: UserDto[];


    fetchAllUsers() {
        this._fetchedUsers = users.data;
    }

    getUsers(pageNumber: number) {
        const start = pageNumber === 1 ? 0 : (pageNumber - 1) * this._users.per_page;
        const end = pageNumber === 1 ? this._users.per_page : pageNumber * this._users.per_page;
        this._users.data = [];
        this._fetchedUsers.slice(start, end).forEach(user => {
            this._users.data.push(new User(user.id, user.email, user.first_name, user.last_name, user.avatar));
        });

        this._users.per_page = 6;
        this._users.page = pageNumber;
        this._users.total = users.data.length;
        this._users.total_pages = this._fetchedUsers.length / 6 + (this._users.total % 6 === 0 ? 0 : 1);
        setTimeout(() => {
            this.$users.next(this._users);
        }, 100);
    }

    getUser(id: number): Promise<UserResponse | ResponseStatus> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = this._users.data.find(user => user?.userId === +id);
                if (user) {
                    resolve({ 'data': user });
                } else {
                    reject({ 'data': new Status('failed') });
                }
            }, 0)

        });
        // const user = this._users.data.find(user => user?.userId === id);
        // return { 'data': user };
    }

    createuser(user: User) {
        this._users.data.push(user);
        return { 'data': { 'status': 'success' } };
    }

    deleteUser(id: number): Promise<ResponseStatus> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = this._users.data.findIndex(user => user.userId === id);
                if (index < 0) {
                    reject({ 'data': new Status('failed') });
                }
                this._users.data.splice(index, 1);

                resolve({ 'data': new Status('success') });
            }, this._getRandomDelay());
        });
    }

    updateUser(updatedUser: User) {
        this._users.data.forEach(currentUser => {
            if (currentUser.userId === updatedUser.userId) {
                currentUser.firstName = updatedUser.firstName;
                currentUser.lastName = updatedUser.lastName;
                currentUser.userEmail = updatedUser.userEmail;
                currentUser.userAvatar = updatedUser.userAvatar;
            }
        });
        return { 'data': Status };
    }

    validateUser(email: string, password: string) {
        const user = this._fetchedUsers.find(user => {
            return (user.email === email && user.password === password)
        });
        if (user) {
            return {
                'data': {
                    'status': 'success',
                    'user': new User(user.id, user.email, user.first_name, user.last_name, user.avatar)
                }
            }
        } else {
            return {
                'data': {
                    'status': 'failed',
                }
            }
        }

    }

    private _getRandomDelay() {
        return (Math.floor(Math.random() * 3) + 1) * 1000;
    }


}