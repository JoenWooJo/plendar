const path = require('path');

module.exports = function(env) { 
    return {
        mode: 'development',
        entry: path.resolve(`src/index.js`),
        output: {
            path: path.resolve('public'),
            filename: 'assets/js/main.js',
            assetModuleFilename:'../src/assets/img/[hash][ext]'
        },
        resolve: {
            mainFields: [ 'browser', 'dev:module', 'module', 'main' ]
        },
        module:{
            rules:[{
                test: /\.(png|gif|jpe?g|svg|ico|tiff?|bmp)$/i,
                type: 'asset/resource'
                },{
                test: /\.js$/i,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    configFile: path.resolve('config/babel.config.json')
                }
            }, {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    'style-loader',
                    {
                        loader:'css-loader',
                        options: {
                            modules: false
                        }
                    },
                    'sass-loader']
            }, {
                test: /\.(png|gif|jpe?g|svg|ico|tiff?|bmp)$/i,
                type: 'asset/resource'
            }]
        },
        devtool: "eval-source-map",
        devServer: {
            contentBase: path.resolve('public'),
            watchContentBase: true,
            host: '0.0.0.0',
            port: 9090,
            proxy: {
                '/api': 'http://localhost:8080',
                '/assets': 'http://localhost:8080'
            },
            inline: true,
            liveReload: true,
            hot: true,
            compress: true,
            historyApiFallback: true
        }
    }
}