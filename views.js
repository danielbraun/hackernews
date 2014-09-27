/*global window*/
window.HN = window.HN || {};
window.HN.views = (function(Backbone, Marionette, _, resources) {
    "use strict";

    var TableView = Marionette.CompositeView.extend({
            template: _.template("<tbody></tbody"),
            tagName: "table",
            attributes: {
                border: 0,
                cellpadding: 0,
                cellspacing: 0
            },
            childViewContainer: "tbody"
        }),
        StoryRowView = Marionette.ItemView.extend({
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

    var navigate = Backbone.history.navigate.bind(Backbone.history);

    var CommentView = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#commentview_template"
    });

    var StoryCommentsView = Marionette.CompositeView.extend({
        template: "#storyview_template",
        childViewContainer: "#comments",
        childView: CommentView
    });

    var UserView = Marionette.ItemView.extend({
        template: "#userview_template"
    });

    function storyListView(collection) {
        return new StoryListView({
            collection: collection
        });
    }

    function userView(model) {
        return new UserView({
            model: model
        });
    }

    function storyCommentsView(model) {
        return new StoryCommentsView({
            model: model,
            collection: new Backbone.Collection(model.get("children"), {
                model: resources.Comment
            })
        });
    }

    return {
        AppView: Marionette.LayoutView.extend({
            initialize: function() {
                _.bindAll(this, "showView");
            },
            template: "#appview_template",
            regions: {
                contents: "#contents"
            },
            events: {
                "click #new_stories": function() {
                    fetchResource(resources.NewStories).then(_.compose(this.showView, storyListView));
                },
                "click #top_stories": function() {
                    fetchResource(resources.TopStories).then(_.compose(this.showView, storyListView));
                },
                "click #author": function(event) {
                    new resources.User({
                        id: event.target.dataset.id
                    }).fetch().then(_.compose(this.showView, userView));
                },
                "click #story": function(event) {
                    new resources.Story({
                        id: event.target.dataset.id
                    }).fetch().then(_.compose(this.showView, storyCommentsView));
                },
                "click #show_hn": function() {
                    fetchResource(resources.ShowHNStories).then(_.compose(this.showView, storyListView));
                },
                "click #ask_hn": function() {
                    fetchResource(resources.AskHNStories).then(_.compose(this.showView, storyListView));
                }
            },
            onRender: function() {
                this.$("#top_stories").click();
            },
            showView: function(view) {
                this.contents.show(view);
            }
        })
    };
}(window.Backbone, window.Marionette, window._, window.HN.resources));
