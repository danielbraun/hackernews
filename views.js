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
        }),
        StoryListView = TableView.extend({
            childView: StoryRowView
        });

    function fetchResource(Resource) {
        return new Resource().fetch({
            cache: true
        });
    }

    function collectionView(View, collection) {
        return new View({
            collection: collection
        });
    }

    return {
        AppView: Marionete.LayoutView.extend({
            initialize: function() {
                _.bindAll(this, "showTopStories", "showView");
            },
            template: "#appview_template",
            regions: {
                contents: "#contents"
            },
            events: {
                "click #new_stories": "showNewStories",
                "click #top_stories": "showTopStories"
            },
            onRender: function() {
                this.showTopStories();
            },
            showView: function(view) {
                this.contents.show(view);
            },
            showTopStories: function() {
                fetchResource(resources.TopStories).then(_.compose(this.showView, _.partial(collectionView, StoryListView)));
            },
            showNewStories: function() {
                fetchResource(resources.NewStories).then(_.compose(this.showView, _.partial(collectionView, StoryListView)));
            }
        })
    };
}(window.Marionette, window._, window.HN.resources));
