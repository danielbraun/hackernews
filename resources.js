/*global window*/
window.HN = window.HN || {};
window.HN.resources = (function(Backbone, _) {
    "use strict";
    var Story = Backbone.Model.extend({
        defaults: {
            url: "",
            title: "",
            points: 0,
            author: "",
            "created_at": new Date(),
            "num_comments": 0,
            children: []
        }
    });
    return {
        TopStories: Backbone.Collection.extend({
            url: "http://hn.algolia.com/rss.json",
            model: Story
        }),
        NewStories: Backbone.Collection.extend({
            url: "https://hn.algolia.com/api/v1/search_by_date?tags=story",
            model: Story,
            parse: _.property("hits")
        })
    };
}(window.Backbone, window._));
