import { IListingTag } from '../interfaces/listing-tag.interface';
import { IListingResource } from '../interfaces/listing-resource.interface';
import { ICustomer } from '../interfaces/customer.interface';
import { ICustomerContact } from '../interfaces/customer-contact.interface';

export interface IListing {
    id?: string,
    listingId?: string,
    customerId?: string,
    listingDate?: string,
    title?: string,
    description?: string,
    phone?: string,
    email?: string,
    website?: string,
    postalCode?: string,
    listingImageUrl?: string,
    priorityNumber?: string,
    priorityFlag?: boolean,
    bannerFlag?: boolean,
    carouselFlag?: boolean,
    businessFlag?: boolean,
    activeFlag?: boolean,
    draftFlag?: boolean,
    showFlag?: boolean,
    sortOrder?: number,
    hits?: number,
    categoryType?: string,

    businessName?: string,

    updateSection?: string,
    listingTagsInformation?: IListingTag [];
    listingResourcesInformation?: IListingResource [];
    //customerInformation?: ICustomer;
    customerContactInformation?: ICustomerContact;
}