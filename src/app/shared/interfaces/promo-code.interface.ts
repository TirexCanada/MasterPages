export interface IPromoCode{
    id?: string,
    createDate?: string,
    lob?: string, 
    promoTypeCode?: string,
    productTypeCode?: string,
    productCategoryCode?: string,
    code?: string, 
    title?: string, 
    description?: string,
    amountOff?: number,
    percentageOff?: number,
    startDate?: string,
    expiryDate?: string,
    usedLimit?: number,
    activeFlag?: boolean
}