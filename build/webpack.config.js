var path = require("path");
const webpack = require("webpack");
const MiniProgramPlugin = require("wxmini-plugin-webpack").plugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const env = require("../src/env");

const resolve = function (file) {
    return path.join(__dirname, "..", file);
};

const BUILD_ENV = env.enviroment;

function stringReplace() {
    return {
        loader: "string-replace-loader",
        options: {
            multiple: [
                {
                    search: /@CDNHOST/g,
                    replace: env.cdnHost,
                },
            ],
        },
    };
}

module.exports = {
    resolve: {
        alias: {
            "@lib": resolve("./src/lib"),
        },
    },
    context: resolve("./src"),
    mode: BUILD_ENV === "prod" ? "production" : "development",
    entry: "./app.json",
    devtool: false,
    output: {
        path: resolve(`dist/${BUILD_ENV}`),
        // 开始构建的时候，清楚文件
        // clean: true
    },
    target: "node",
    optimization: {
        runtimeChunk: {
            name: "runtime",
        },
        splitChunks: {
            //引用次数大于3 大于1kb的时候，提到common.js
            minSize: 1024,
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 3,
                },
            },
        },
    },
    resolve: {
        alias: {
            "@src": resolve("./src"),
            "@components": resolve("./src/components"),
            "@page": resolve("./src/page"),
            "@common": resolve("./src/common"),
            "@vant": resolve("./src/components/vant"),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: resolve("./node_modules"),
                use: ["babel-loader"],
            },
            {
                test: /\.less/,
                type: "asset/resource",
                generator: {
                    filename: "[path][name].wxss",
                },
                use: ["less-loader", stringReplace()],
            },
            {
                test: /\.wxml$/,
                type: "asset/resource",
                generator: {
                    filename: "[path][name][ext]",
                },
                use: [
                    "wxmini-plugin-webpack",
                    stringReplace(),
                    // {
                    //   loader: path.resolve(__dirname, '../../src/index.js'),
                    // }
                ],
            },
            {
                test: /\.json/,
                type: "asset/resource",
                generator: {
                    filename: "[path][name][ext]",
                },
                use: [
                    "wxmini-plugin-webpack",
                    {
                        loader: "string-replace-loader",
                        options: {
                            multiple: [
                                {
                                    search: /{appId}/g,
                                    replace: env.appId,
                                },
                                {
                                  search: /{appName}/g,
                                  replace: env.appName,
                                },
                            ],
                        },
                    },
                    // {
                    //   loader: path.resolve(__dirname, '../../src/index.js'),
                    // },
                ],
            },
            {
                test: /\.wxs$/,
                type: "asset/resource",
                generator: {
                    filename: "[path][name][ext]",
                },
                use: ["wxmini-plugin-webpack"],
            },
            {
                test: /\.wxss/,
                type: "asset/resource",
                generator: {
                    filename: "[path][name][ext]",
                },
                use: ["wxmini-plugin-webpack", stringReplace()],
            },
            {
                test: /\.(png|jpg|gif)$/,
                type: "asset/resource",
                generator: {
                    filename: "[path][name][ext]",
                },
            },
        ],
    },
    plugins: [
        new MiniProgramPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                BUILD_ENV: JSON.stringify(BUILD_ENV),
            },
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: resolve("./src/images"),
                    to: resolve(`dist/${BUILD_ENV}/images`),
                },
            ],
        }),
    ],
};
