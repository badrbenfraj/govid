import { Role } from './role';

export class User {
    id?: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address?: string;
    postal_code?: string;
    country?: string;
    city?: string;
    roles?: Role[];
    token?: string;
}
