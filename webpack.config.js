const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlPlugin = require('html-webpack-plugin');
const Extractplugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development';

const config = {
    target: "web",
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        filename: "bundle.[hash:8].js",
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HtmlPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            }, {
                test: /\.jsx$/,
                loader: "babel-loader"
            }, {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 1024,
                        name: '[name]-[hash:5].[ext]'
                    }
                }]
            }
        ]
    }
};

if (isDev) {
    config.devtool = '#cheap-module-eval-source-map';
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            error: true
        },
        // open: true,
        hot: true
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    );
    config.module.rules.push({
        test: /\.css$/,
        use: [
            "vue-style-loader",
            "css-loader",
            {
                loader: "postcss-loader",
                options: {
                    sourceMap: true
                }
            }
        ]
    })
} else {
    config.output.filename = "[name].[chunkhash:8].js";
    config.entry = {
        app: path.resolve(__dirname, 'src/index.js'),
        verdor: ['vue']
    };
    config.module.rules.push({
        test: /\.css$/,
        use: Extractplugin.extract(
            {
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        )
    });
    config.plugins.push(
        new Extractplugin('style.[hash:8].css'),
    );
    config.optimization = {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    }
}

module.exports = config;
