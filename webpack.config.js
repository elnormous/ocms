const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: { index: path.resolve(__dirname, "src", "app", "index.js") },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, "src", "app")
                ],
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "src", "app")
                ],
                use: ["babel-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "app", "index.html")
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        historyApiFallback: {
            index: 'index.html'
        },
        proxy: {
            '/api': 'http://localhost:8080',
        }
    }
};
