const path = require("path")

module.exports = {
    mode: "production",
    entry: {
        index: "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, "../lib"),
        filename: "[name].js",
        libraryTarget: "umd",
        library: 'clis-utils'
    },
    resolve: {
        extensions: [".js", ".json"],
    },
    module: {
        rules: [
            {
                test: /.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [],
}
