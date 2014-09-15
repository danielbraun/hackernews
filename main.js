/*global window*/
(function($, views) {
    "use strict";
    $("body").prepend(new views.AppView().render().el);
}(window.$, window.HN.views));
