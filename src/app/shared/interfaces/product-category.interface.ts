export interface IProductCategory {
    id?: string,
    lob?: string,
    productTypeCode?: string,
    code?: string,
    name?: string,
    title?: string,
    description?: string,
    image?: string,
    sortOrder?: number,

    products?: any []
}