import { IArticleCategory } from "./article-category.interface";    
export interface IArticle {
    id?: string,
    contentName?: string,
    contentName_RU?: string,
    contentAbstract?: string,
    contentAbstract_RU?: string,
    contentUrl?: string,
    contentText?: string,
    contentText_RU?: string,
    childrenFlag?: boolean,
    sortOrder?: number,
    showFlag?: boolean,
    dateCreated?: string,
    lastUpdateDate?: string,

    articleCategories: IArticleCategory []
}