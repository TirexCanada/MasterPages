import { Component, OnInit } from '@angular/core';
//import * as $ from 'jquery';

@Component({
    selector: 'app-back-to-top',
    templateUrl: './back-to-top.component.html',
    styleUrls: ['./back-to-top.component.css']
})
export class BackToTopComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        this.changeOfRoutes();
    }

    changeOfRoutes() {
       /*  $(document).ready(function () {

            // --- Back to top
            // ---------------------------------------------------------------------------
            $(document).scroll(function () {

                var y = $(window).scrollTop();

                if (y > 500) {
                    $('app-back-to-top').fadeIn('slow');
                } else {
                    $('app-back-to-top').fadeOut('slow');
                }

            });

            $('.back-to-top').click(function () {
                $("html, body").animate({ scrollTop: 0 }, "slow");
                return false;
            });

        }); */
    }
}