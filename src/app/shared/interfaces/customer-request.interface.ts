export interface ICustomerRequest {
    id?: string, 
    requestType?: string,
    requestDate?: string,
    customerId?: string, 
    customerInventoryid?: string, 
    firstName?: string,
    lastName?: string,
    email?: string,
    phoneNumber?: string,
    requestText?: string,
    requestStatus?: string,
    responseDate?: string,
    responseStatus?: string,
    responseText?: string,
    emailSentFlag?: boolean,
    emailSentError?: string,
    productName?: string,

    customerInformation?: any,
    customerInventoryInformation?: any
}
