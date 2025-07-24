import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
//import * as _ from 'lodash';

import { SessionStorageService } from './session-storage.service';

import { ICustomer } from '../interfaces/customer.interface';


import { APPLICATION_ROUTES } from '../constants/app-constants';

@Injectable()
export class NavigationService {

    baseQuestionnaireUrl!: string;
    baseSectionsUrl!: string;
    baseIntroductionUrl!: string;
    baseNextStepsUrl!: string;
    baseFormsUrl!: string;
    custodyStream!: string;

 

    constructor(private router: Router,
        private sessionStorageService: SessionStorageService) { 
    }

    navigateToLogin() {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.login}`;   
        this.router.navigateByUrl(url);
    }

    navigateToRegistration() {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.registration}`;   
        this.router.navigateByUrl(url);
    }

    navigateToBusinessCatalog() {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.home}`;   
        this.router.navigateByUrl(url);
    }

    navigateToClassified() {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.home}`;   
        this.router.navigateByUrl(url);
    }

    navigateToCalendar() {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.calendar}`;   
        this.router.navigateByUrl(url);
    }

    navigateToSearchResults() {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.category}`;   
        this.router.navigateByUrl(url);
    }

    navigateToLoginRegistration() {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.loginRegistration}`;   
        this.router.navigateByUrl(url);
    }

    navigateToHome() {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.home}`;   
        this.router.navigateByUrl(url);
    }

    navigateToRegistrationCompleted() {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.registrationCompleted}`;
        this.router.navigateByUrl(url);
    }

    navigateToLoginWithSession() {
        /* let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.loginPage}`; 
        url = url + "?session=true"                
        this.router.navigateByUrl(url); */
    }

    navigateToForgotPassword() {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.forgotPassword}`;
        this.router.navigateByUrl(url);
    }

    navigateToUnlockPassword() {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.unlockCustomer}`;
        this.router.navigateByUrl(url);
    }

    navigateToChangePassword() {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.changePassword}`;
        this.router.navigateByUrl(url);
    }

    navigateToContact(params: string) {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.contact}`;
        this.router.navigateByUrl(url + "?" + params);
    }

    navigateToProfile() {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.profile.base}/${APPLICATION_ROUTES.portal.profile.profile}`;
        this.router.navigateByUrl(url);
    }

    navigateToDashboard() {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.dashboard.base}/${APPLICATION_ROUTES.portal.dashboard.dashboard}`;
        this.router.navigateByUrl(url);
    }

    navigateToMyListings() {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.profile.base}/${APPLICATION_ROUTES.portal.profile.myListings}`;
        this.router.navigateByUrl(url);
    }

    /* navigateToMyOrders() {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.profile.base}/${APPLICATION_ROUTES.portal.profile.myOrders}`;
        this.router.navigateByUrl(url);
    } */

    navigateToAddPost() {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.profile.base}/${APPLICATION_ROUTES.portal.profile.post}` + "/add";
        this.router.navigateByUrl(url);
    }

    navigateToEditPost(listingId: string) {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.profile.base}/${APPLICATION_ROUTES.portal.profile.post}` + "/edit" + `/${listingId}`;
        this.router.navigateByUrl(url);
    }

    navigateToBoostPage(listingId: string) {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.profile.base}/${APPLICATION_ROUTES.portal.profile.boostPage}` + `/${listingId}`;
        this.router.navigateByUrl(url);
    }

    navigateToDeletePost(listingId: string) {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.profile.base}/${APPLICATION_ROUTES.portal.profile.post}` + "/delete" + `/${listingId}`;
        this.router.navigateByUrl(url);
    }

    navigateToHomePage() {
        let url = `${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.home}`;
        this.router.navigateByUrl(url);
    }

    navigateToCheckout(lob: string) {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.checkout}/${lob}`;
        this.router.navigateByUrl(url);
    }

    navigateToReviewOrder(lob: string) {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.reviewOrder}/${lob}`;
        this.router.navigateByUrl(url);
    }

    navigateToPayment() {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.payment}`;
        this.router.navigateByUrl(url);
    }

    navigateToBookAppointment(productTypeCode: string) {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.bookAppointment}/${productTypeCode}`;
        this.router.navigateByUrl(url);
    }

    navigateToPaymentRoot() {
        let url = `${APPLICATION_ROUTES.portal.payment}`;
        this.router.navigateByUrl(url);
    }

    navigateToPaymentBambora() {
        let url = `${APPLICATION_ROUTES.paymentBambora}`;
        this.router.navigateByUrl(url);
    }

    navigateToRefund() {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.refund}`;
        this.router.navigateByUrl(url);
    }

    navigateToArticlePage(id: string) {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.articles.articles}/${APPLICATION_ROUTES.portal.articles.article}/` + id;
        this.router.navigateByUrl(`/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.articles.articles}/${APPLICATION_ROUTES.portal.articles.article}/` + id);
    }

    navigateToArticlesPage(id: string) {
        let url = `/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.articles.articles}/${APPLICATION_ROUTES.portal.articles.articles}/` + id;
        this.router.navigateByUrl(`/${APPLICATION_ROUTES.portal.portal}/${APPLICATION_ROUTES.portal.articles.articles}/${APPLICATION_ROUTES.portal.articles.articles}/` + id);
    }

    //Admin -------------------------------------------
    navigateToAdminLogin() {
        let url = `/login`; 
        this.router.navigateByUrl(url);
    }

    navigateToAdminDashboard() {
        let url = `/dashboard`; 
        this.router.navigateByUrl(url);
    }

    navigateToAdminChangePassword() {
        let url = `/profile/change-password`; 
        this.router.navigateByUrl(url);
    }

}  