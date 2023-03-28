import { Role } from "../auth/role.model";

export interface User {
    id: number,
    email: number,
    role: Role,
    balance: number,
}