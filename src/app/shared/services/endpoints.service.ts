import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class EndpointsService {
  
    public endPoints: any = {};
    public basePath = '';
    constructor() { }

    setEndpoints(endpoints: any) {
        this.endPoints = endpoints;
        //this.basePath = environment.envName === 'LOCAL' ? 'api/' + this.endPoints.basePath : this.endPoints.baseProdPath;
        this.basePath = environment.baseUrl + this.endPoints.basePath; 
    }
    

    getUrlFor(url: String) {
        return this.basePath + url;
    }

    // Registration
    getCreateCustomer() {
        return this.getUrlFor(this.endPoints.createCustomer);
    }

    getValidateCustomer() {
        return this.getUrlFor(this.endPoints.validateCustomer);
    }

    getGetCustomers() {
        return this.getUrlFor(this.endPoints.getCustomers);
    }

    getGetCustomer() {
        return this.getUrlFor(this.endPoints.getCustomer);
    }

    getGetCustomerForAdmin() {
        return this.getUrlFor(this.endPoints.getCustomerForAdmin);
    }

    getCreateCustomerRequest() {
        return this.getUrlFor(this.endPoints.createCustomerRequest);
    }

    getProcessCustomerSubscriptionRequest() {
        return this.getUrlFor(this.endPoints.processCustomerSubscriptionRequest);
    }
    
    getUploadFiles() {
        return this.getUrlFor(this.endPoints.uploadFiles);
    }

    getGetCustomerListings() {
        return this.getUrlFor(this.endPoints.getCustomerListings);
    }

    getUpdateListing() {
        return this.getUrlFor(this.endPoints.updateListing);
    }

    getDeleteListing() {
        return this.getUrlFor(this.endPoints.deleteListing);
    }

    getUpdateListingContact() {
        return this.getUrlFor(this.endPoints.updateListingContact);
    }

    getUpdateListingStatus() {
        return this.getUrlFor(this.endPoints.updateListingStatus);
    }

    //Login
    getLogin() {
        return this.getUrlFor(this.endPoints.login);
    }

    getTempLogin() {
        return this.getUrlFor(this.endPoints.templogin);
    }

    getVerifyEmail() {
        return this.getUrlFor(this.endPoints.verifyEmail);
    }

    getVerifyCode() {
        return this.getUrlFor(this.endPoints.verifyCode);
    }

    getUnlockCustomer() {
        return this.getUrlFor(this.endPoints.unlockCustomer);
    }

    //Profile
    getChangePassword() {
        return this.getUrlFor(this.endPoints.changePassword);
    }

    getUpdatePassword() {
        return this.getUrlFor(this.endPoints.updatePassword);
    }

    getRequestPassword() {
        return this.getUrlFor(this.endPoints.requestPassword);
    }

    getLockCustomer() {
        return this.getUrlFor(this.endPoints.lockCustomer);
    }

    // Customer
    getUpdateCustomer() {
        return this.getUrlFor(this.endPoints.updateCustomer);
    }

    getDeleteCustomer() {
        return this.getUrlFor(this.endPoints.deleteCustomer);
    }

    getUpdateQuestionResponse() {
        return this.getUrlFor(this.endPoints.updateQuestionResponse);
    }

    getResetCustomerResponses() {
        return this.getUrlFor(this.endPoints.resetCustomerResponses);
    }
     
    //Categories
    getGetCategories() {
        return this.getUrlFor(this.endPoints.getCategories);
    }
    
    getGetCategoriesCounts() {
        return this.getUrlFor(this.endPoints.getCategoriesCounts);
    }

    getGetCategoriesForAdmin() {
        return this.getUrlFor(this.endPoints.getCategoriesForAdmin);
    }

    getUpdateCategory() {
        return this.getUrlFor(this.endPoints.updateCategory);
    }

    //Listings
    getGetTopListings() {
        return this.getUrlFor(this.endPoints.getTopListings);
    }

    getGetTopClassifiedListings() {
        return this.getUrlFor(this.endPoints.getTopClassifiedListings);
    }

    getGetTopPriorityListings() {
        return this.getUrlFor(this.endPoints.getTopPriorityListings);
    }

    getGetTopClassifiedPriorityListings() {
        return this.getUrlFor(this.endPoints.getTopClassifiedPriorityListings);
    }

    getGetListing() {
        return this.getUrlFor(this.endPoints.getListing);
    }

    getGetListingsByTagId(tagId: string) {
        return this.getUrlFor(this.endPoints.getListingsByTagId);
    }

    getGetListingsByParams(params: any[]) {
        return this.getUrlFor(this.endPoints.getListingsByParams);
    }

    getUpdateListingHits() {
        return this.getUrlFor(this.endPoints.updateListingHits);
    }

   /*  getGetCategoriesForAdmin() {
        return this.getUrlFor(this.endPoints.getCategoriesForAdmin);
    }

    getUpdateCategory() {
        return this.getUrlFor(this.endPoints.updateCategory);
    } */


    // Product
    getGetProducts() {
        return this.getUrlFor(this.endPoints.getProducts);
    }

    getUpdateProduct() {
        return this.getUrlFor(this.endPoints.updateProduct);
    }

    getResetProduct() {
        return this.getUrlFor(this.endPoints.resetProduct);
    }

    // ProductType
    getGetProductTypes() {
        return this.getUrlFor(this.endPoints.getProductTypes);
    }

    getUpdateProductType() {
        return this.getUrlFor(this.endPoints.updateProductType);
    }

    // ProductCategory
    getGetProductCategories() {
        return this.getUrlFor(this.endPoints.getProductCategories);
    }

    getUpdateProductCategory() {
        return this.getUrlFor(this.endPoints.updateProductCategory);
    }

    
    getApplyPromoCode() {
        return this.getUrlFor(this.endPoints.applyPromoCode);
    }
    
    getSendCustomerEmail() {
        return this.getUrlFor(this.endPoints.sendCustomerEmail);
    }

    //AdminLogin
    getAdminLogin() {
        return this.getUrlFor(this.endPoints.adminLogin);
    }

    getChangeAdminPassword() {
        return this.getUrlFor(this.endPoints.changeAdminPassword);
    }

    getGetAdmin() {
        return this.getUrlFor(this.endPoints.getAdmin);
    }

    getGetAdmins() {
        return this.getUrlFor(this.endPoints.getAdmins);
    }

    getUpdateAdmin() {
        return this.getUrlFor(this.endPoints.updateAdmin);
    }

    //Promo Codes
    getGetPromoCodes() {
        return this.getUrlFor(this.endPoints.getPromoCodes);
    }

    getUpdatePromoCode() {
        return this.getUrlFor(this.endPoints.updatePromoCode);
    }

    getResetPromoCode() {
        return this.getUrlFor(this.endPoints.resetPromoCode);
    }

     //Faq Categories
     getGetFaqCategories() {
        return this.getUrlFor(this.endPoints.getFaqCategories);
    }

    getUpdateFaqCategory() {
        return this.getUrlFor(this.endPoints.updateFaqCategory);
    }

    //Faqs
    getGetFaqs() {
        return this.getUrlFor(this.endPoints.getFaqs);
    }

    getUpdateFaq() {
        return this.getUrlFor(this.endPoints.updateFaq);
    }

     //Tags
     getGetTags() {
        return this.getUrlFor(this.endPoints.getTags);
    }

    getUpdateTag() {
        return this.getUrlFor(this.endPoints.updateTag);
    }

    getUpdateListingTags() {
        return this.getUrlFor(this.endPoints.updateListingTags);
    }

    //Blogs Categories
    getGetBlogsCategories() {
        return this.getUrlFor(this.endPoints.getBlogsCategories);
    }

    getUpdateBlogsCategory() {
        return this.getUrlFor(this.endPoints.updateBlogsCategory);
    }

    //Blogs
     getGetBlogs() {
        return this.getUrlFor(this.endPoints.getBlogs);
    }

    getUpdateBlog() {
        return this.getUrlFor(this.endPoints.updateBlog);
    }

    //Customer Requests
    getGetCustomerRequests() {
        return this.getUrlFor(this.endPoints.getCustomerRequests);
    }

    getUpdateCustomerRequest() {
        return this.getUrlFor(this.endPoints.updateCustomerRequest);
    }

    //Law Dictionary
    getGetLawDictionary() {
        return this.getUrlFor(this.endPoints.getLawDictionary);
    }

    getUpdateLawDictionary() {
        return this.getUrlFor(this.endPoints.updateLawDictionary);
    } 

    //Law Library Category
    getGetLawLibraryCategories() {
        return this.getUrlFor(this.endPoints.getLawLibraryCategories);
    }

    getUpdateLawLibraryCategory() {
        return this.getUrlFor(this.endPoints.updateLawLibraryCategory);
    } 

    //Section Question Instruction
    getGetSectionQuestionInstructions() {
        return this.getUrlFor(this.endPoints.getSectionQuestionInstructions);
    }

    getUpdateSectionQuestionInstruction() {
        return this.getUrlFor(this.endPoints.updateSectionQuestionInstruction);
    } 

     //Email Setting
     getGetEmailSettings() {
        return this.getUrlFor(this.endPoints.getEmailSettings);
    }

     getUpdateEmailSetting() {
        return this.getUrlFor(this.endPoints.updateEmailSetting);
    }  

    //Email Campaigns
    getGetEmailCampaigns() {
        return this.getUrlFor(this.endPoints.getEmailCampaigns);
    }

     getUpdateEmailCampaign() {
        return this.getUrlFor(this.endPoints.updateEmailCampaign);
    }  

    getGetEmailCampaignCustomers() {
        return this.getUrlFor(this.endPoints.getEmailCampaignCustomers);
    }


    //Testimonials
     getGetTestimonials() {
        return this.getUrlFor(this.endPoints.getTestimonials);
    }

    getUpdateTestimonial() {
        return this.getUrlFor(this.endPoints.updateTestimonial);
    }


    //MarketingCampaignTypes
    getGetMarketingCampaignTypes() {
        return this.getUrlFor(this.endPoints.getMarketingCampaignTypes);
    }

    getUpdateMarketingCampaignType() {
        return this.getUrlFor(this.endPoints.updateMarketingCampaignType);
    }


    //MarketingCampaignButtons
    getGetMarketingCampaignButtons() {
        return this.getUrlFor(this.endPoints.getMarketingCampaignButtons);
    }

    getUpdateMarketingCampaignButton() {
        return this.getUrlFor(this.endPoints.updateMarketingCampaignButton);
    }


    //MarketingCampaigns
    getGetMarketingCampaigns() {
        return this.getUrlFor(this.endPoints.getMarketingCampaigns);
    }

    getUpdateMarketingCampaign() {
        return this.getUrlFor(this.endPoints.updateMarketingCampaign);
    }

    //Upload Image
    getUploadImage() {
        return this.getUrlFor(this.endPoints.uploadImage);
    }

    //Upload Admin Image
    getUploadAdminImage() {
        return this.getUrlFor(this.endPoints.uploadAdminImage);
    }

    getUploadListingImage() {
        return this.getUrlFor(this.endPoints.uploadListingImage);
    }

    //Admin History
    getGetAdminHistory() {
        return this.getUrlFor(this.endPoints.getAdminHistory);
    }
    
   /*  getGetCategoriesCounts() {
        return this.getUrlFor(this.endPoints.getCategoriesCounts);
    }

    getGetCategoriesForAdmin() {
        return this.getUrlFor(this.endPoints.getCategoriesForAdmin);
    } */

    //Promotions
    getGetPromotions() {
        return this.getUrlFor(this.endPoints.getPromotions);
    }


    //Current Marketing Campaign
    getGetCurrentMarketingCampaign() {
        return this.getUrlFor(this.endPoints.getCurrentMarketingCampaign);
    }



    //Articles
    getGetArticle() {
        return this.getUrlFor(this.endPoints.getArticle);
    }

    getGetArticles() {
        return this.getUrlFor(this.endPoints.getArticles);
    }

    getGetArticlesCategories() {
        return this.getUrlFor(this.endPoints.getArticlesCategories);
    }


    //Banner
    getGetActiveBanners() {
        return this.getUrlFor(this.endPoints.getActiveBanners);
    }


    //ContentList
    getGetContentList() {
        return this.getUrlFor(this.endPoints.getContentList);
    }

    getGetContent() {
        return this.getUrlFor(this.endPoints.getContent);
    }
}
