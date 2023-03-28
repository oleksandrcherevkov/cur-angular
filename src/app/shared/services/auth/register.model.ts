import { Role } from "./role.model";

export interface Register {
    email: string,
    password: string,
    role: Role,
}