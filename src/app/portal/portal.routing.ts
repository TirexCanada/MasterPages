import { Routes, RouterModule } from '@angular/router';

import { PortalComponent } from './portal.component';
import { HomeComponent } from './pages/home/home.component';
import { ClassifiedComponent } from './pages/classified/classified.component';
import { CategoryComponent } from './pages/category/category.component';


import { ListingComponent } from './pages/listing/listing.component';
import { ArticlesComponent } from './pages/articles/articles/articles.component';
import { ArticleComponent } from './pages/articles/article/article.component';
import { ArticlesListComponent } from './pages/articles/articles-list/articles-list.component';

import { HelpPageComponent } from './pages/help/help-page/help-page.component';

// import { ContactComponent } from './pages/contact/contact.component';

/* import { ContactComponent } from './sections/contact/contact.component';
import { NewProjectsComponent } from './sections/new-projects/new-projects.component';
import { Testimonial/Component } from './sections/testimonials/testimonials.component'; */

// import { BoostPageComponent } from './sections/boost-page/boost-page.component';
import { MyListingsComponent } from './pages/profile/my-listings/my-listings.component';
import { ChangePasswordComponent } from './pages/profile/change-password/change-password.component';
import { ForgotPasswordComponent } from './pages/profile/forgot-password/forgot-password.component';
import { ProfilePageComponent } from './pages/profile/profile-page/profile-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginRegistrationPageComponent } from './pages/login-registration-page/login-registration-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { RegistrationCompletedPageComponent } from './pages/registration-completed-page/registration-completed-page.component';

// import { RegistrationCompletedPageComponent } from './sections/registration-completed-page/registration-completed-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';

import { CurrentCustomerResolver } from './resolvers/current-customer.resolver';

import { APPLICATION_ROUTES } from '../../../src/app/shared/constants/app-constants';

const PORTAL_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'portal/home',
        pathMatch: 'full'
    },
    {
        path: 'portal',
        redirectTo: 'portal/home',
        pathMatch: 'full'
    },
    {
        path: 'portal',
        component: PortalComponent,
        children: [
            {
                path: APPLICATION_ROUTES.portal.home,
                component: HomeComponent,
                data: { name: 'Home' }
            },       
            {
                path: '',
                redirectTo: APPLICATION_ROUTES.portal.home,
                pathMatch: 'full'
            },
            {
                path: APPLICATION_ROUTES.portal.classified,
                component: ClassifiedComponent,
                data: { name: 'Registration Page' },
            },
            {
                path: APPLICATION_ROUTES.portal.articles.base,
                component: ArticlesComponent,
                children: [
                    {
                        path: '',
                        component: ArticlesListComponent,
                        data: { name: 'Articles' }
                    },
                    {
                        path: "articles/:id",
                        component: ArticlesListComponent,
                        data: { name: 'Articles' }
                    },
                    {
                        path: "article/:id",
                        component: ArticleComponent,
                        data: { name: 'Article' }
                    }
                ]
            },
            {
                path: APPLICATION_ROUTES.portal.help + "/:url",
                component: HelpPageComponent,
                data: { name: 'Help Page' },
            },
            {
                path: APPLICATION_ROUTES.portal.registration,
                component: RegistrationPageComponent,
                data: { name: 'Help Page' },
            },
            {
                path: APPLICATION_ROUTES.portal.registrationCompleted,
                component: RegistrationCompletedPageComponent,
                data: { name: 'Registration Completed Page' },
            },
            {
                path: APPLICATION_ROUTES.portal.category,
                component: CategoryComponent,
                data: { name: 'Classified Category' },
            },
            {
                path: APPLICATION_ROUTES.portal.category + "/:categorytype/:tagid",
                component: CategoryComponent,
                data: { name: 'Classified Category' },
            },
            {
                path: APPLICATION_ROUTES.portal.login,
                component: LoginPageComponent,
                data: { name: 'Login Page' },
            },
            {
                path: APPLICATION_ROUTES.portal.loginRegistration,
                component: LoginRegistrationPageComponent,
                data: { name: 'Login-Registration Page' },
            },
            {
                path: APPLICATION_ROUTES.portal.listing + "/:listingid",
                component: ListingComponent,
                data: { name: 'Classified Listing',
                    seo: {
                        title: 'MasterPages | Classified Listing',
                        metaTags: [
                            { name: 'og:description', content: 'Classified Listing' },
                            { name: 'og:type', content: 'website' },
                            { property: 'og:title', content: 'Classified Listing' },
                            /* { property: 'og:image', 'https:// + assets/image/homepage.png' }, */
                            { property: 'og:url', content: 'https://classifiedportal.azurewebsites.net/#/portal/listing/' + ":listingid" }
                        ]
                    }
                }
            },
            {
                path: APPLICATION_ROUTES.portal.unlockPage,
                component: ChangePasswordComponent,
                data: { name: 'Unlock Account' },
            },
            {
                path: APPLICATION_ROUTES.portal.forgotPassword,
                component: ForgotPasswordComponent,
                data: { name: 'Forgot Password' },
            },
           /*  {
                path: APPLICATION_ROUTES.portal.requestPassword,
                component: RequestPasswordPageComponent,
                data: { name: 'Request Password' },
            },
            {
                path: APPLICATION_ROUTES.portal.lockCustomer,
                component: LockCustomerComponent,
                data: { name: 'Lock Customer' },
            },
            {
                path: APPLICATION_ROUTES.portal.changePassword,
                component: ChangePasswordComponent,
                data: { name: 'Change Password' },
                canActivate: [AuthenticationGuard],
                resolve: {
                    currentCustomer: CurrentCustomerResolver
                }
            },
            {
                path: APPLICATION_ROUTES.portal.payment,
                component: PaymentComponent,
                data: { name: 'Portal Payment' },
            },
            {
                path: APPLICATION_ROUTES.portal.profile.changePassword,
                component: ChangePasswordComponent,
                data: { name: 'Change Password' },
            },
            {
                path: APPLICATION_ROUTES.portal.unlockCustomer,
                component: UnlockCustomerComponent,
                data: { name: 'Unlock Customer' },
            }, */
            {
                path: APPLICATION_ROUTES.portal.profile.base,
                resolve: {
                    currentCustomer: CurrentCustomerResolver
                },
                children: [
                    {
                        path: APPLICATION_ROUTES.portal.profile.profile,
                        component: ProfilePageComponent,
                        data: { name: 'Profile' },
                    },
                    {
                        path: APPLICATION_ROUTES.portal.profile.myListings,
                        component: MyListingsComponent,
                        data: { name: 'My Listings' },
                    },
                    /* {
                        path: APPLICATION_ROUTES.portal.profile.myOrders,
                        component: MyOrdersComponent,
                        data: { name: 'My Orders' },
                    }, */
                    {
                        path: APPLICATION_ROUTES.portal.profile.post,
                        component: PostPageComponent,
                        data: { name: 'Add Post' },
                    },
                    {
                        path: APPLICATION_ROUTES.portal.profile.post + "/:mode",
                        component: PostPageComponent,
                        data: { name: 'Add Post' },
                    },
                    {
                        path: APPLICATION_ROUTES.portal.profile.post + "/:mode" + "/:listingid",
                        component: PostPageComponent,
                        data: { name: 'Add Post' },
                    },
                    // {
                    //     path: APPLICATION_ROUTES.portal.profile.boostPage + "/:listingid",
                    //     component: BoostPageComponent,
                    //     data: { name: 'Boost Page' },
                    // },
                    {
                        path: APPLICATION_ROUTES.portal.profile.changePassword,
                        component: ChangePasswordComponent,
                        data: { name: 'Change password' },
                    }
                    
                ]
            },
        ]
    }
];

export const portalRouter = RouterModule.forChild(PORTAL_ROUTES);
