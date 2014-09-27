/*global window*/
(function($, views, Backbone) {
    "use strict";
    Backbone.history.start();
    $("body").prepend(new views.AppView().render().el);
}(window.$, window.HN.views, window.Backbone));
