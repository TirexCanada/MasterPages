export interface IProductType {
    id?: string,
    lob?: string,
    code?: string,
    name?: string,
    title?: string,
    description?: string,
    descriptionShort?: string,
    image?: string,
    price?: number,
    priceText?: string,
    showFlag?: boolean,

    products?: any []
}