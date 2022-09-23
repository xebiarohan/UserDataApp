export class User {

    constructor(private id: number, private email: string, private first_name: string, private last_name: string, private avatar: string) {}

    public get userId() {
        return this.id;
    }

    public set userId(id: number) {
        this.id = id;
    }

    public get userEmail() {
        return this.email;
    }

    public set userEmail(email: string) {
        this.email = email;
    }

    public get firstName() {
        return this.first_name;
    }

    public set firstName(firstName: string) {
        this.first_name = firstName;
    }

    public get lastName() {
        return this.last_name;
    }

    public set lastName(lastName: string) {
        this.last_name = lastName;
    }

    public get userAvatar() {
        return this.avatar;
    }

    public set userAvatar(avatar: string) {
        this.avatar = avatar;
    }
    
    
}