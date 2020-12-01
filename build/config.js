const path = require("path")

module.exports = {
    mode: "production",
    entry: {
        index: "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, "../lib"),
        filename: "[name].js",
        libraryTarget: "commonjs2",
        libraryExport:'default'
    },
    resolve: {
        extensions: [".js", ".json"],
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
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
