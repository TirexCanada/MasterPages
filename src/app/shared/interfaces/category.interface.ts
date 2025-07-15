export interface ICategory{
    id?: string,
    clientId?: string,
    categoryParentId?: string,
    categoryName?: string,
    categoryDescription?: string,
    categoryName_RU?: string,
    categoryDescription_RU?: string,
    categoryImage?: string,
    categoryImage1?: string,
    priorityFlag?: boolean,
    deleteFlag?: boolean,
    showFlag?: boolean,
    businessFlag?: boolean,
    classifiedFlag?: boolean,
    sortOrder?: number,
    
    code?: string,
    text?: string,
    count?: number, 

    subcategoriesInformation?: any [],

    adminId?: string
}