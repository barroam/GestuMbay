import { Role } from "./role";

export interface Users {
    id?: Number ;
    name:string;
    email: string;
    password: string;
    roles?: Role[];
}
