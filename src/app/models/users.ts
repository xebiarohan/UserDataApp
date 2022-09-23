import { User } from "./user";

export class Users {
     page: number = 1;
     per_page: number = 6;
     total: number = 0;
     total_pages: number = 0;
     data!: User[];

}