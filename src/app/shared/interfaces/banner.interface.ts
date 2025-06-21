export interface IBanner{
    id?: string,
    customerId?: string,
    bannerCategoryId?: string,
    bannerPriority?: number,
    bannerDescription?: string,
    bannerStartDate?: string,
    bannerEndDate?: string,
    showFlag?: boolean,
    deletedFlag?: boolean,
    lastAdminId?: string
}