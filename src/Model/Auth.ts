export interface Auth {
    email: string;
    name?: string;
    password: string;
}

export interface UserToken {
    userId: string;
}