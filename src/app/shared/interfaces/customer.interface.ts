import { ICustomerSocialProfiles } from '../interfaces/customer-socialprofiles.interface';
import { ICustomerContact } from '../interfaces/customer-contact.interface';
import { IListing } from '../interfaces/listing.interface';

export interface ICustomer {
    id?: string,
    email?: string;
    accountName?: string;
    firstName?: string;
    lastName?: string;
    businessName?: string;
    website?: string;
   
    businessFlag?: boolean;
    signupFlag?: boolean;
    agreeFlag?: boolean;
    lockFlag?: boolean;
    emailVerificationFlag?: boolean;
    statusConfirmationFlag?: boolean;
    courtProceedingFlag?: string;
    applicantRespondentFlag?: string;
    systemIdentificationFlag?: string;

    updateSection?: string;

    customerSocialProfilesInformation?: ICustomerSocialProfiles;
    customerContactInformation?: ICustomerContact;
    customerListingsInformation?: IListing [];
    
}
