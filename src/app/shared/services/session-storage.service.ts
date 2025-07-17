import { Injectable } from '@angular/core';
import { WindowRefService } from './window-ref.service';

import { ICustomer } from '../interfaces/customer.interface';
import { IProductType } from '../interfaces/product-type.interface';
import { IFaq } from '../interfaces/faq.interface';
import { IFaqCategory } from '../interfaces/faq-category.interface';
import { ITag } from '../interfaces/tag.interface';
import { IListingTag } from '../interfaces/listing-tag.interface';
import { IBlog } from '../interfaces/blog.interface';
import { ITestimonial } from '../interfaces/testimonial.interface';
import { IEmailSetting } from '../interfaces/email-setting.interface';
import { IProductCategory } from '../interfaces/product-category.interface';
import { ICategory } from '../interfaces/category.interface';
import { IListing } from '../interfaces/listing.interface';
import { IBanner } from '../interfaces/banner.interface';

@Injectable({
    providedIn: 'root'
})

export class SessionStorageService {
    public window: Window;
    constructor(public windowRef: WindowRefService) {
        this.window = this.windowRef.nativeWindow;
    }    

    //CurrentLanguage
    setLanguage(lang: string) {
        this.window.sessionStorage.setItem('lang', lang);
    }
    getLanguage() {
        return this.window.sessionStorage.getItem('lang');
    }

    //Auth Header
    getAuthHeader() {
        return this.window.sessionStorage.getItem('authorization');
    }

    setAuthHeader(token: string) {
        this.window.sessionStorage.setItem('authorization', token);
    }


    //AuthToken
    getAuthToken() {
        return this.window.sessionStorage.getItem('authToken');
    }

    setAuthToken(token: string) {
        this.window.sessionStorage.setItem('authToken', token);
    }


    //ShoppingCart
    getShoppingCart() {
        return null //JSON.parse(this.window.sessionStorage.getItem('sc'));
    }

    setShoppingCart(shoppingCart: any) {
        this.window.sessionStorage.setItem('sc', JSON.stringify(shoppingCart));
    }


    //Search Params
    getSearchParams() {
        return JSON.parse(this.window.sessionStorage.getItem('searchParams'));
    }

    setSearchParams(searchParams: any) {
        this.window.sessionStorage.setItem('searchParams', JSON.stringify(searchParams));
    }


    //PaymentStatus
    getPaymentStatus() {
        return null //JSON.parse(this.window.sessionStorage.getItem('paymentStatus'));
    }

    setPaymentStatus(paymentStatus: any) {
        this.window.sessionStorage.setItem('paymentStatus', JSON.stringify(paymentStatus));
    }


    //TempLogin
      getTempLogin() {
        return null //JSON.parse(this.window.sessionStorage.getItem('tl'));
    }

    setTempLogin(tempLogin: any) {
        //this.window.sessionStorage.setItem('tl', JSON.stringify(tempLogin));
    }

    //Current Customer
    getCurrentCustomer() {
        let customer = this.window.sessionStorage.getItem('currentCustomer');
        if (customer === "undefined") {
            return null;
        }
        return JSON.parse(this.window.sessionStorage.getItem('currentCustomer'));
    }

    setCurrentCustomer(customer: ICustomer | null) {
        this.window.sessionStorage.removeItem('currentCustomer');
        this.window.sessionStorage.setItem('currentCustomer', JSON.stringify(customer));
    }

   
    //AdminId
    getCurrentAdmin() {
        let admin = this.window.sessionStorage.getItem('currentAdmin');
        if (admin === "undefined") {
            return null;
        }
        return null //JSON.parse(this.window.sessionStorage.getItem('currentAdmin'));
    }

    setCurrentAdmin(admin: any) {
        this.window.sessionStorage.removeItem('currentAdmin');
        this.window.sessionStorage.setItem('currentAdmin', JSON.stringify(admin));
    }

    //Categories
    getCategories() {        
        return JSON.parse(this.window.sessionStorage.getItem('categories'));
    }

    setCategories(categories: ICategory []) {
        this.window.sessionStorage.removeItem('categories');
        this.window.sessionStorage.setItem('categories', JSON.stringify(categories));
    }

    //ProductCategories
    getProductCategories() {        
        return null //JSON.parse(this.window.sessionStorage.getItem('productCategories'));
    }

    setProductCategories(productCategories: IProductCategory []) {
        this.window.sessionStorage.removeItem('productCategories');
        this.window.sessionStorage.setItem('productCategories', JSON.stringify(productCategories));
    }

     //Email Setting
     getEmailSettings() {        
        return null //JSON.parse(this.window.sessionStorage.getItem('emailSetting'));
    }

    setEmailSettings(emailSetting: IEmailSetting []) {
        this.window.sessionStorage.removeItem('emailSetting');
        this.window.sessionStorage.setItem('emailSetting', JSON.stringify(emailSetting));
    }

    //ResetInterviewFlag
    getResetInterviewFlag() {        
        return null //JSON.parse(this.window.sessionStorage.getItem('resetInterviewFlag'));
    }

    setResetInterviewFlag(resetInterviewFlag: any) {
        this.window.sessionStorage.removeItem('resetInterviewFlag');
        this.window.sessionStorage.setItem('resetInterviewFlag', resetInterviewFlag);
    }


    //ProductTypes
    getProductTypes() {        
        return null //JSON.parse(this.window.sessionStorage.getItem('productTypes'));
    }

    setProductTypes(productTypes: IProductType []) {
        this.window.sessionStorage.removeItem('productTypes');
        this.window.sessionStorage.setItem('productTypes', JSON.stringify(productTypes));
    }

    //Products
    getProducts() {        
        return null //JSON.parse(this.window.sessionStorage.getItem('products'));
    }

    setProducts(products: IProductType []) {
        this.window.sessionStorage.removeItem('products');
        this.window.sessionStorage.setItem('products', JSON.stringify(products));
    }

    //Faqs
    getFaqs() {        
        return null //JSON.parse(this.window.sessionStorage.getItem('faqs'));
    }

    setFaqs(faqs: IFaq []) {
        this.window.sessionStorage.removeItem('faqs');
        this.window.sessionStorage.setItem('faqs', JSON.stringify(faqs));
    }

    //FaqCategories
    getFaqCategories() {        
        return null //JSON.parse(this.window.sessionStorage.getItem('faqCategories'));
    }

    setFaqCategories(faqCategories: IFaqCategory []) {
        this.window.sessionStorage.removeItem('faqCategories');
        this.window.sessionStorage.setItem('faqCategories', JSON.stringify(faqCategories));
    }

    //Tags
    getTags() {        
        return JSON.parse(this.window.sessionStorage.getItem('tags'));
    }

    setTags(tags: ITag []) {
        this.window.sessionStorage.removeItem('tags');
        this.window.sessionStorage.setItem('tags', JSON.stringify(tags));
    }

    //ListingTags
    getListingTags() {        
        return null //JSON.parse(this.window.sessionStorage.getItem('listingTags'));
    }

    setListingTags(listingTags: ITag []) {
        this.window.sessionStorage.removeItem('listingTags');
        this.window.sessionStorage.setItem('listingTags', JSON.stringify(listingTags));
    }


    //Listings
    getTopListings() {        
        return null //JSON.parse(this.window.sessionStorage.getItem('topListings'));
    }

    setTopListings(listings: IListing [] | null) {
        this.window.sessionStorage.removeItem('topListings');
        this.window.sessionStorage.setItem('topListingTags', JSON.stringify(listings));
    }

    getTopPriorityListings() {        
        return null; //JSON.parse(this.window.sessionStorage.getItem('topPriorityListings'));
    }

    setTopPriorityListings(listings: IListing [] | null) {
        this.window.sessionStorage.removeItem('topPriorityListings');
        this.window.sessionStorage.setItem('topPriorityListingTags', JSON.stringify(listings));
    }

    getTopClassifiedListings() {        
        return null //JSON.parse(this.window.sessionStorage.getItem('topListings'));
    }

    setTopClassifiedListings(listings: IListing [] | null) {
        this.window.sessionStorage.removeItem('topClassifiedListings');
        this.window.sessionStorage.setItem('topClassifiedListingTags', JSON.stringify(listings));
    }

    getTopClassifiedPriorityListings() {        
        return null; //JSON.parse(this.window.sessionStorage.getItem('topPriorityListings'));
    }

    setTopClassifiedPriorityListings(listings: IListing [] | null) {
        this.window.sessionStorage.removeItem('topClassifiedPriorityListings');
        this.window.sessionStorage.setItem('topClassifiedPriorityListingTags', JSON.stringify(listings));
    }


    //Blogs
    getBlogs() {        
        return null //JSON.parse(this.window.sessionStorage.getItem('blogs'));
    }

    setBlogs(blogs: IBlog []) {
        this.window.sessionStorage.removeItem('blogs');
        this.window.sessionStorage.setItem('blogs', JSON.stringify(blogs));
    }


     //Testimonials
     getTestimonials() {        
        return null //JSON.parse(this.window.sessionStorage.getItem('testimonials'));
    }

    setTestimonials(testimonials: ITestimonial []) {
        this.window.sessionStorage.removeItem('testimonials');
        this.window.sessionStorage.setItem('testimonials', JSON.stringify(testimonials));
    }

     //Banners
     getActiveBanners() {        
        return JSON.parse(this.window.sessionStorage.getItem('activeBanners'));
    }

    setActiveBanners(activeBanners: IBanner []) {
        this.window.sessionStorage.removeItem('activeBanners');
        this.window.sessionStorage.setItem('activeBanners', JSON.stringify(activeBanners));
    }

     //Calendly
     getCalendlyEvent() {        
        return null //JSON.parse(this.window.sessionStorage.getItem('calendly'));
    }

    setCalendlyEvent(calendlyEvent: any) {
        this.window.sessionStorage.removeItem('calendly');
        this.window.sessionStorage.setItem('calendly', JSON.stringify(calendlyEvent));
    }


    //Banners
    getContentList() {        
        return JSON.parse(this.window.sessionStorage.getItem('contentList'));
    }

    setContentList(contentList: IBanner []) {
        this.window.sessionStorage.removeItem('contentList');
        this.window.sessionStorage.setItem('contentList', JSON.stringify(contentList));
    }


    //ValidationData
    getValidationData() {        
        return JSON.parse(this.window.sessionStorage.getItem('validationData'));
    }

    setValidationData(validationData: any []) {
        this.window.sessionStorage.removeItem('validationData');
        this.window.sessionStorage.setItem('validationData', JSON.stringify(validationData));
    }
}
