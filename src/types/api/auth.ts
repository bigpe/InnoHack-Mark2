export interface Credentials {
    username: string;
    password: string;
}

export interface SignInReturn {
    id: number;
    username: string;
}
export interface CheckAuth {
    authenticated: boolean;
}
