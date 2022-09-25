export class UserDto {

    constructor(public id: number,
        public email: string,
        public password: string,
        public first_name: string,
        public last_name: string,
        public avatar: string) { }

    // public get id() {
    //     return this._id;
    // }

    // public set id(id: number) {
    //     this._id = id;
    // }

    // public get email() {
    //     return this.email;
    // }

    // public set email(email: string) {
    //     this._email = email;
    // }

    // public get password() {
    //     return this._password;
    // }

    // public set password(password: string) {
    //     this._password = password;
    // }

    // public get firstName() {
    //     return this.firstName;
    // }

    // public set firstName(firstName: string) {
    //     this._first_name = firstName;
    // }

    // public get lastName() {
    //     return this.lastName;
    // }

    // public set lastName(lastName: string) {
    //     this._last_name = lastName;
    // }

    // public get avatar() {
    //     return this.avatar;
    // }

    // public set avatar(avatar: string) {
    //     this.avatar = avatar;
    // }


}