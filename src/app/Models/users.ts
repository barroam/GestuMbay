import { Role } from "./role";

export interface Users {
    email: string;
    password: string;
    roles?: Role[];
}
