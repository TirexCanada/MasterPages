export interface IMarketingCampaign{
    id?: string,
    clientId?: string,
    marketingCampaignTypeId?: string,
    marketingCampaignButtonId?: string,
    campaignName?: string,
    startDate?: string,
    endDate?: string,
    marketingText1?: string,
    marketingText2?: string,
    marketingText3?: string,
    marketingImage?: string,
    defaultFlag?: boolean,

    adminId?: string

    marketingCampaignButtonInformation?: any;
}