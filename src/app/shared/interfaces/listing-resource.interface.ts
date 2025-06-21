export interface IListingResource {
    id: string,
    listingId: string,
    resourceType: string,
    resourceUrl: string,
    showFlag: boolean,
    sortOrder?: number
}