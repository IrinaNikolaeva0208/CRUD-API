const path = require("path");

module.exports = {
    entry: "./src/server/server.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    mode: "production",
    target: "node",
    resolve: {
        extensions: [".js"],
    },
};
