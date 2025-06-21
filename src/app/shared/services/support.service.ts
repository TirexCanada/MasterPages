import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EndpointsService } from './endpoints.service';
import { SessionStorageService } from './session-storage.service';

import { IPromoCode } from '../interfaces/promo-code.interface';
import { IFaq } from '../interfaces/faq.interface';
import { IFaqCategory } from '../interfaces/faq-category.interface';
import { ITag } from '../interfaces/tag.interface';
import { IListingTag } from '../interfaces/listing-tag.interface';
import { ICategory } from '../interfaces/category.interface';
import { ITestimonial } from '../interfaces/testimonial.interface';
import { IBlog } from '../interfaces/blog.interface';
import { IArticlesCategory } from '../interfaces/articles-category.interface';
import { ICustomerRequest } from '../interfaces/customer-request.interface';
import { IEmailSetting } from '../interfaces/email-setting.interface';
import { IMarketingCampaign } from '../interfaces/marketing-campaign.interface';
import { IMarketingCampaignType } from '../interfaces/marketing-campaign-type.interface';
import { IMarketingCampaignButton } from '../interfaces/marketing-campaign-button.interface';


@Injectable()
export class SupportService {

    constructor(private httpClient: HttpClient,
        private endpointsService: EndpointsService,
        private sessionStorageService: SessionStorageService) { 
    }

    getPromoCodes(baseRequestModel: any): Observable<any> {
        return this.httpClient.post(this.endpointsService.getGetPromoCodes(), baseRequestModel);
    }

    updatePromoCode(promoCode: IPromoCode): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getUpdatePromoCode(), promoCode);
    }

    resetPromoCode(promoCode: IPromoCode): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getResetPromoCode(), promoCode);
    }

    //Faq Categories
    getFaqCategories(baseRequestModel: any): Observable<any> {
        return this.httpClient.post(this.endpointsService.getGetFaqCategories(), baseRequestModel);
    }

    updateFaqCategory(faqCategory: IFaqCategory): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getUpdateFaqCategory(), faqCategory);
    }

    //Faqs
    getFaqs(baseRequestModel: any): Observable<any> {
        return this.httpClient.post(this.endpointsService.getGetFaqs(), baseRequestModel);
    }

    updateFaq(faq: IFaq): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getUpdateFaq(), faq);
    }

     //Tags
     getTags(baseRequestModel: any): Observable<any> {
        return this.httpClient.post(this.endpointsService.getGetTags(), baseRequestModel);
    }

    updateTag(tag: ITag): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getUpdateTag(), tag);
    }

    //Categories
    getCategories(baseRequest: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getGetCategories(), baseRequest);
    }

    getCategoriesForAdmin(baseRequest: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getGetCategoriesForAdmin(), baseRequest);
    }

    updateCategory(сategory: ICategory): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getUpdateCategory(), сategory);
    }


    //Blogs Categories
    getBlogsCategories(baseRequestModel: any): Observable<any> {
        return this.httpClient.post(this.endpointsService.getGetBlogsCategories(), baseRequestModel);
    }

    updateBlogsCategory(blog: IBlog): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getUpdateBlogsCategory(), blog);
    }

    //Blogs
    getBlogs(baseRequestModel: any): Observable<any> {
        return this.httpClient.post(this.endpointsService.getGetBlogs(), baseRequestModel);
    }

    updateBlog(blog: IBlog): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getUpdateBlog(), blog);
    }
    
    //EmailSetting
    getEmailSettings(baseRequestModel: any): Observable<any> {
        return this.httpClient.post(this.endpointsService.getGetEmailSettings(), baseRequestModel);
    }

    updateEmailSetting(emailSetting: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getUpdateEmailSetting(), emailSetting);
    } 
    
    //EmailCampaigns
    getEmailCampaigns(baseRequestModel: any): Observable<any> {
        return this.httpClient.post(this.endpointsService.getGetEmailCampaigns(), baseRequestModel);
    }

    updateEmailCampaign(emailCampaign: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getUpdateEmailCampaign(), emailCampaign);
    } 

    getEmailCampaignCustomers(baseRequestModel: any): Observable<any> {
        return this.httpClient.post(this.endpointsService.getGetEmailCampaignCustomers(), baseRequestModel);
    }


    //Testimonials
    getTestimonials(baseRequestModel: any): Observable<any> {
        return this.httpClient.post(this.endpointsService.getGetTestimonials(), baseRequestModel);
    }

    updateTestimonial(testimonial: ITestimonial): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getUpdateTestimonial(), testimonial);
    }


    //Customer Requests
    getCustomerRequests(baseRequestModel: any): Observable<any> {
        return this.httpClient.post(this.endpointsService.getGetCustomerRequests(), baseRequestModel);
    }

    updateCustomerRequest(customerRequest: ICustomerRequest): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getUpdateCustomerRequest(), customerRequest);
    }

    //Marketing CampaignTypes
    getMarketingCampaignTypes(baseRequestModel: any): Observable<any> {
        return this.httpClient.post(this.endpointsService.getGetMarketingCampaignTypes(), baseRequestModel);
    }

    updateMarketingCampaignType(marketingCampaignType: IMarketingCampaignType): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getUpdateMarketingCampaignType(), marketingCampaignType);
    }


    //Marketing CampaignButtons
    getMarketingCampaignButtons(baseRequestModel: any): Observable<any> {
        return this.httpClient.post(this.endpointsService.getGetMarketingCampaignButtons(), baseRequestModel);
    }

    updateMarketingCampaignButton(marketingCampaignButton: IMarketingCampaignButton): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getUpdateMarketingCampaignButton(), marketingCampaignButton);
    }


    //Marketing Campaigns
    getMarketingCampaigns(baseRequestModel: any): Observable<any> {
        return this.httpClient.post(this.endpointsService.getGetMarketingCampaigns(), baseRequestModel);
    }

    updateMarketingCampaign(marketingCampaign: IMarketingCampaign): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getUpdateMarketingCampaign(), marketingCampaign);
    }


    //Data History
    getAdminHistory(baseRequest: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getGetAdminHistory(), baseRequest);
    }

  /*   getCategoriesForAdmin(baseRequest: any): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getGetCategoriesForAdmin(), baseRequest);
    }

    updateCategory(сategory: ICategory): Observable<any>  {
        return this.httpClient.post(this.endpointsService.getUpdateCategory(), сategory);
    } */


    //Promotions
    getPromotions(baseRequestModel: any): Observable<any> {
        return this.httpClient.post(this.endpointsService.getGetPromotions(), baseRequestModel);
    }

    uploadAdminImage(formData: any) {
        return this.httpClient.post(this.endpointsService.getUploadAdminImage(), formData);
    }

    //Article
    getArticle(baseRequestModel: any): Observable<any> {
        return this.httpClient.post(this.endpointsService.getGetArticle(), baseRequestModel);
    }

    getArticles(baseRequestModel: any): Observable<any> {
        return this.httpClient.post(this.endpointsService.getGetArticles(), baseRequestModel);
    }

    getArticlesCategories(baseRequestModel: any): Observable<any> {
        return this.httpClient.post(this.endpointsService.getGetArticlesCategories(), baseRequestModel);
    }

    //Content
    getContent(baseRequestModel: any): Observable<any> {
        return this.httpClient.post(this.endpointsService.getGetContent(), baseRequestModel);
    }

    getContentList(baseRequestModel: any): Observable<any> {
        return this.httpClient.post(this.endpointsService.getGetContentList(), baseRequestModel);
    }
}
