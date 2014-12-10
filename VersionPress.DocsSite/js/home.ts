﻿/// <reference path="jquery.d.ts" />
/// <reference path="jquery.toc.d.ts" />
/// <reference path="jquery.equalheights.d.ts" />

$(document).ready(() => {


    //---------------------------------------------------------
    // Highlight the current node in the sidebar navigation
    //---------------------------------------------------------

    var h1Text = $('h1').text();

    var currentMenuItem = $('#sidebar #menu a[title="' + h1Text + '"]');
    currentMenuItem.addClass('current');


    //---------------------------------------------------------
    // Page Table of Contents
    //---------------------------------------------------------

    // generate ToC, see http://projects.jga.me/toc/

    $('#page-toc').toc({
        'selectors': 'h2,h3,h4,h5,h6',
        'container': '.main-content',
        'highlightOffset': 0
    });

    // make sidebar as high as the main content area for position:sticky to work
    // see https://github.com/mattbanks/jQuery.equalHeights

    setTimeout(makeColsEqualHeight, 200);
    $(window).resize(function () {
        makeColsEqualHeight();
    });

    function makeColsEqualHeight() {
        var cols = $('.main-content, #sidebar');
        cols.height('auto');
        cols.equalHeights();
    }

    // and also use sticky polyfill, see https://github.com/wilddeer/stickyfill
    $('#page-navigation').Stickyfill();


});