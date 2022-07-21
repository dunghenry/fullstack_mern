export interface Idecoded {
    userId: string;
    isAdmin: boolean;
    exp: number;
    iat: number;
}
export interface ILogin {
    username: string;
    password: string;
}

export interface IRegister extends ILogin {

}

export interface IFormLogin extends ILogin{
   
}

export interface IFormRegister extends ILogin{
    confirmPassword: string;
}
