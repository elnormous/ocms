const path = require("path");

module.exports = {
    entry: { index: path.resolve(__dirname, "src", "app", "index.js") },
    output: {
        path: path.resolve(__dirname, "dist")
    }
};
