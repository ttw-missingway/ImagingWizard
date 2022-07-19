export interface LoginResults {
    "token": string;
    "expiration": Date;
}

export interface LoginRequest {
    "username": string;
    "password": string;
}
