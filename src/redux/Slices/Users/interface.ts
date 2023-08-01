export interface RegisterUserInterface {
    name: string;
    email: string;
    phone:string;
    password:string;
}

export interface LoginUserInterface {
    email: string;
    password:string;
}

export interface UserResponseInterface {
    name: string;
    email: string;
    phone:string;
    token:string;
}

export interface VerifyOtpInterface {
    otp: string;
    email: string;
}

export interface ResendOtpInterface {
    email: string;
}