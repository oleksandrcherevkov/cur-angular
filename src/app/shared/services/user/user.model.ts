import { Role } from "../auth/role.model";

export interface User {
    id: string,
    email: string,
    role: Role,
    balance: number,
}