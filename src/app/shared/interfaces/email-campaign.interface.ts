export interface IEmailCampaign{
    id?: string,
    emailDate?: string,
    emailName?: string,
    emailLob?: string, 
    emailCategory?: string, 
    emailTypeCode?: string, 
    productTypeCode?: string,
    productCategoryCode?: string,
    emailPromocode?: string,
    emailTo?: string,
    emailFrom?: string,
    emailSubject?: string, 
    emailTitle?: string, 
    emailBody?: string,
    activeFlag?: boolean
    processDate?: string,
    processStatus?: string,

    emailCampaignCustomers?: any[]
}