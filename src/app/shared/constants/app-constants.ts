//import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';
import { ɵɵclassMapInterpolate1 } from '@angular/core';

export const APPLICATION_ROUTES = {
    'paymentConfirmation': 'payment-confirmation',
    'paymentError': 'payment-error',
    'payment': 'payment',
    'paymentRoot': 'payment-root',
    'paymentRedirect': 'payment-redirect',
    'paymentBambora': 'payment-bambora',
    'portal': {
        'portal': 'portal',
        'home': 'home',
        'classified': 'classified',
        'login': 'login',
        'registration': 'registration',
        'loginRegistration': 'login-registration',
        'registrationCompleted': 'registration-completed',
        'faq': 'faq',
        'category': 'category',
        'contact': 'contact',
        'dashboard': 'dashboard',
        'changePassword': 'change-password',
        'requestPassword': 'request-password',
        'forgotPassword': 'forgot-password',
        'lockCustomer': 'lock-customer',
        'unlockCustomer': 'unlock-customer',
        'unlockPage': 'unlock-page',
        'inventory': 'inventory',     
        'checkout': 'checkout',
        'reviewOrder': 'review-order',
        'bookAppointment': 'book-appointment',
        'instructions': 'instructions',
        'payment': 'payment',
        'refund': 'refund',
        'paymentConfirmation': 'payment-confirmation',
        'paymentError': 'payment-error',
        'paymentRedirect': 'payment-redirect',
        'products': 'products',
        'listing': 'listing',
        'help': 'help',
        'articles': {
            'base': 'articles',
            'articles': 'articles',
            'article': 'article',
        },
        'profile': {
            'base': 'profile',
            'changePassword': 'change-password',
            'profile': 'profile',
            'myListings': 'my-listings',
            'post': 'post',
            'boostPage': 'boost-page',
            'myOrders': 'my-orders'
        }
    }
};


export const PROVINCES = [
    { 'code': "ON", 'text': "Ontario" },
    { 'code': "AB", 'text': "Alberta" },
    { 'code': "BC", 'text': "British Columbia" },
    { 'code': "MB", 'text': 'Manitoba' },
    { 'code': "NB", 'text': 'New Brunswick' },
    { 'code': "NL", 'text': 'Newfoundland & Labrador' },
    { 'code': "NS", 'text': 'Nova Scotia' },
    { 'code': "NT", 'text': 'Northwest Territories' },
    { 'code': "NU", 'text': 'Nunavut' },
    { 'code': "QC", 'text': 'Quebec' },
    { 'code': "SK", 'text': 'Saskatchewan' },
    { 'code': "YT", 'text': 'Yukon Territory' },
    { 'code': "PE", 'text': 'Prince Edward Island'}
];

export const MONTHS = [
    { 'code': "1", 'text': "January" },
    { 'code': "2", 'text': "February" },
    { 'code': "3", 'text': "March" },
    { 'code': "4", 'text': 'April' },
    { 'code': "5", 'text': 'May' },
    { 'code': "6", 'text': 'June' },
    { 'code': "7", 'text': 'July' },
    { 'code': "8", 'text': 'August' },
    { 'code': "9", 'text': 'September' },
    { 'code': "10", 'text': 'October' },
    { 'code': "11", 'text': 'November' },
    { 'code': "12", 'text': 'December' },
];

export const YES_NO = [
    { "code": true, "text": "Yes" }, 
    { "code": false, "text": "No" }
];

export const TRUE_FALSE = [
    { "code": 1, "text": "True" }, 
    { "code": 0, "text": "False" }
];

export const APP_CONSTANTS = {
    inactivityInterval: 100, // How often to check if the user is active
    inactivityWarning: 1200, // How long (since inactive) before we display a warning modal
    inactivityTimeout: 600, // How long (since inactive) before we redirect user to applicationsDashboard
    fileSizeLimit: 10485760, // Caps file size upload to a max 10 MBs expressed as Bytes,
    beneficiaryLimit: 9,
    contingentBeneficiaryLimit: 9
}