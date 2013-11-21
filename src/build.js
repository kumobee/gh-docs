var path = require("path");
var config = require("../config.json");


exports.config = {
    // Base directory for the application
    "base": __dirname,

    // Application name
    "name": config.title,

    // Mode debug
    "debug": config.debug,

    // Main entry point for application
    "main": "main",

    // Build output directory
    "build": path.resolve(__dirname, "../build"),

    // Static files mappage
    "static": {
        "templates": path.resolve(__dirname, "resources", "templates"),
        "images": path.resolve(__dirname, "resources", "images")
    },

    // Stylesheet entry point
    "style": path.resolve(__dirname, "resources/stylesheets/main.less"),

    // Paths and shims
    "paths": {
        "showdown": "vendors/showdown/showdown",
        "highlight": "vendors/highlight"
    },
    "shim": {
        "highlight": {
            exports: "hljs"
        }
    },

    // Arguments
    "args": config
};