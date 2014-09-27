/*global window*/
window.HN = window.HN || {};
window.HN.resources = (function(Backbone, _) {
    "use strict";

    function absoluteURL(url) {
        return "https://hn.algolia.com/" + url;
    }

    var Story = Backbone.Model.extend({
        defaults: {
            url: "",
            title: "",
            points: 0,
            author: "",
            "created_at": new Date(),
            "num_comments": 0,
            children: []
        },
        urlRoot: absoluteURL("api/v1/items/")
    });
    return {
        TopStories: Backbone.Collection.extend({
            url: absoluteURL("rss.json"),
            model: Story
        }),
        NewStories: Backbone.Collection.extend({
            url: absoluteURL("api/v1/search_by_date?tags=story"),
            model: Story,
            parse: _.property("hits")
        }),
        Story: Story,
        Comment: Backbone.Model.extend({
            defaults: {
                author: "",
                "created_at": new Date(),
                text: ""
            }
        }),
        User: Backbone.Model.extend({
            urlRoot: absoluteURL("api/v1/users/")
        }),
        ShowHNStories: Backbone.Collection.extend({
            url: absoluteURL("api/v1/search?tags=show_hn"),
            model: Story,
            parse: _.property("hits")
        }),
        AskHNStories: Backbone.Collection.extend({
            url: absoluteURL("api/v1/search?tags=ask_hn"),
            model: Story,
            parse: _.property("hits")
        })
    };
}(window.Backbone, window._));
