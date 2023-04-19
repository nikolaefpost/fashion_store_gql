const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
// const { EnvironmentPlugin } = require("webpack")

let conf = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'docs'),
        clean: true,
        filename: 'main.js',
        publicPath: '/',
        assetModuleFilename: "assets/[name][ext]"
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'docs'),
        },
        compress: true,
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html")
        }),
        new MiniCssExtractPlugin({
            filename: "main.css"
        }),
        new Dotenv(),
        // new EnvironmentPlugin({
        //     API_KEY: "AIzaSyAniiLFi7MWCmDpI2IsLvnXGY46hPi_w3I",
        //     // 'process.env.MY_ENV': JSON.stringify(process.env.MY_ENV),
        // })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: "html-loader",
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: path.resolve(__dirname, "node_modules"),
                // exclude: '/node_modules',
            },
            {
                test: /\.module\.(c|sa|sc)ss$/i,
                use: [
                     MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName:'[name]__[local]--[hash:base64:5]',
                            },
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    ["postcss-preset-env"]
                                ]
                            }
                        }
                    },
                    "sass-loader",
                ],
            },
            {
                // test: /^((?!\.module).)*(c|sa|sc)ss$/i,
                test: /^((?!\.module).)*css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|webp|gif|svg)$/i,
                use: {
                    loader: "image-webpack-loader",
                    options: {
                        mozjpeg: {
                            progressive: true,
                        },
                        // optipng.enabled: false will disable optipng
                        optipng: {
                            enabled: false,
                        },
                        pngquant: {
                            quality: [0.65, 0.90],
                            speed: 4
                        },
                        gifsicle: {
                            interlaced: false,
                        },
                        // the webp option will enable WEBP
                        webp: {
                            quality: 75
                        }
                    }
                },
                type: "asset/resource",
                generator: {
                    filename: "assets/image/[name][ext]"
                }
            },
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js', ".css", ".scss"],
    },
}

module.exports = (env, options) => {

    conf.mode = options.mode || "development"
    let isProd = options.mode === "production";
    conf.devtool = isProd ? false : 'eval-cheap-module-source-map';
    return conf;
}