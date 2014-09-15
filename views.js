/*global window*/
window.HN = window.HN || {};
window.HN.views = (function(Marionete, _, resources) {
    "use strict";
    var TableView = Marionete.CompositeView.extend({
            template: _.template("<tbody></tbody"),
            tagName: "table",
            attributes: {
                border: 0,
                cellpadding: 0,
                cellspacing: 0
            },
            childViewContainer: "tbody"
        }),
        StoryRowView = Marionete.ItemView.extend({
            template: "#story_template",
            tagName: "tbody",
            templateHelpers: function() {
                return {
                    index: this.model.collection.indexOf(this.model) + 1
                };
            }
        });


    return {
        AppView: Marionete.LayoutView.extend({
            initialize: function() {
                _.bindAll(this, "showTopStories");
            },
            template: "#appview_template",
            regions: {
                contents: "#contents"
            },
            onRender: function() {
                new resources.TopStories().fetch({
                    cache: true
                }).then(this.showTopStories);
            },
            showTopStories: function(collection) {
                this.contents.show(new TableView({
                    childView: StoryRowView,
                    collection: collection
                }));
            }
        })
    };
}(window.Marionette, window._, window.HN.resources));
