export interface ICustomerRegistration {
    id?: string, 
    email?: string;
    password?: string;
    confirmPassword?: string;        
    firstName?: string;
    lastName?: string;
    signupFlag?: boolean;
    agreeFlag?: boolean;
}
