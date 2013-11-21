require([
    "underscore",
    "hr/hr",
    "hr/args",

    "utils/base64",

    "highlight",
    "showdown",
    "vendors/showdown/github",
    "vendors/showdown/table",
    "vendors/showdown/twitter",

    "resources/resources"
], function(_, hr, args, base64, hljs, showdown) {
    // Configure hr
    hr.configure(args);

    // Define base application
    var Application = hr.Application.extend({
        name: args.title,
        template: "main.html",
        metas: {
            "description": args.description
        },
        links: {
            "icon": args.favicon
        },
        events: {
            "click a": "clickLink"
        },
        routes: {
            "*actions": "changePage",
            "": "changePage"
        },

        // Constructor
        initialize: function() {
            Application.__super__.initialize.apply(this, arguments);
            this.converter = new Showdown.converter({ extensions: ['github', 'table', 'twitter'] });

            this.content = "";
            return this;
        },

        // Update page body with some markdown content
        updatePage: function(content) {
            this.content = content || this.content;
            this.$(".page-body").html(this.converter.makeHtml(this.content));
            this.$(".page-body pre code").each(function() {
                $(this).html(hljs.highlightAuto($(this).text()).value);
            });
        },

        // Load a file from the repository
        changePage: function(path) {
            path = path || args.entry;

            var that = this;
            var url = "https://api.github.com/repos/"+args.repo+"/contents/"+path;
            return hr.Requests.getJSON(url).then(function(file) {
                var content = base64.decode(file.content);
                that.updatePage(content);
            });
        },

        // Finish Rendering
        //   Add markdown content
        //   Add styles
        finish: function() {
            this.updatePage();

            _.each(args.styles || {}, function(styles, tag) {
                console.log(".page-"+tag, styles);
                this.$(".page-"+tag).css(styles);
            }, this);
            return Application.__super__.finish.apply(this, arguments);
        },

        // Click link
        clickLink: function(e) {
            var a = $(e.currentTarget);
            var url = a.attr("href");
            var r = new RegExp('^(?:[a-z]+:)?//', 'i');
            if (!r.test(url)) {
                e.preventDefault();

                hr.History.navigate(url);
            }
        }
    });

    var app = new Application();
    app.run();
});