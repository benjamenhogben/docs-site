'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var NotifyPlugin = require('./webpack-notify');
var path = require('path');
var webpack = require('webpack');

module.exports = function (isDevelopment) {
    var entry = {
        app: isDevelopment ? [
            'webpack-dev-server/client?http://localhost:8888',
            'webpack/hot/only-dev-server',
            './src/client/entry.ts'
        ] : [
            './src/client/entry.ts'
        ]
    };

    var loaders = [
        {
            exclude: /node_modules/,
            loaders: ['ts-loader'],
            test: /\.ts$/
        },
        {
            loader: 'url-loader?limit=32768',
            test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)(\?.*)?$/
        }
    ];

    var autoprefixerLoader = 'autoprefixer-loader?' +
        '{browsers:["Chrome >= 20", "Firefox >= 24", "Explorer >= 8", "Opera >= 12", "Safari >= 6"]}';
    var cssLoader = 'css-loader!' + autoprefixerLoader;
    var stylesheetLoaders = {
        'css': cssLoader,
        'less': cssLoader + '!less-loader'
    };

    var output = isDevelopment ? {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: 'http://localhost:8888/public/'
    } : {
        path: 'dist/public',
        filename: '[name].js'
    };

    var plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production'),
                IS_BROWSER: true
            }
        })
    ];
    if (isDevelopment) {
        plugins.push(
            NotifyPlugin,
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        );
    } else {
        plugins.push(
            new ExtractTextPlugin('app.css', {
                allChunks: true
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        );
    }

    loaders = loaders.concat(
        Object.keys(stylesheetLoaders).map(function (ext) {
            var loader = isDevelopment
                ? 'style-loader!' + stylesheetLoaders[ext]
                : ExtractTextPlugin.extract('style-loader', stylesheetLoaders[ext]);
            return {
                loader: loader,
                test: new RegExp('\\.(' + ext + ')$')
            };
        })
    );

    return {
        cache: isDevelopment,
        debug: isDevelopment,
        devtool: isDevelopment ? 'inline-source-map' : false,
        entry: entry,
        module: {
            loaders: loaders
        },
        output: output,
        plugins: plugins,
        resolve: {
            extensions: ['', '.js', '.json', '.ts']
        }
    }

};