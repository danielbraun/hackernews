/*global window*/
window.HN = window.HN || {};
window.HN.resources = (function(Backbone) {
    "use strict";
    var Story = Backbone.Model.extend({
        defaults: {
            url: "",
            title: "",
            points: 0,
            author: "",
            "created_at": new Date(),
            "num_comments": 0
        }
    });
    return {
        TopStories: Backbone.Collection.extend({
            url: "http://hn.algolia.com/rss.json",
            model: Story
        })
    };
}(window.Backbone));
