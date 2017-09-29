var path = require('path')
var webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const env = require('./build/lib/env');

module.exports = {
    entry: {
        'demo': './src/pages/demo',
        'common': ['vue']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        less: ExtractTextPlugin.extract({
                            fallback: 'style-loader',
                            use: ['css-loader', 'less-loader'],
                        })
                    },
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                },
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader'],
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader'],
                })
            },
            {
                test: /\.woff|ttf|woff2|eot$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|svgz)(\?.+)?$/,
                loader: 'url-loader',
                options: {
                    limit: 2000
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@less': path.join(__dirname, 'src/less'),
            '@lib': path.join(__dirname, 'src/lib'),
            '@components': path.join(__dirname, 'src/components'),
            '@modules': path.join(__dirname, 'src/modules')
        }
    },
    devServer: {
        contentBase: path.join(__dirname, './html'),
        port: 8889,
        host: '0.0.0.0',
        disableHostCheck: true,
    },
    performance: {
        hints: false
    },
    devtool: '#cheap-source-map',
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['common', 'manifest'],
            minChunks: Infinity
        }),
        new webpack.DefinePlugin({
            'DIST_ENV': JSON.stringify(env),
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new ExtractTextPlugin('[name].css'),
        // ...htmlPluginList
    ]
}

if (process.env.DIST_ENV === 'product') {
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'DIST_ENV': JSON.stringify(env),
            'process.env': {
                NODE_ENV: '"production"',
                DIST_ENV: JSON.stringify(env)
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        })
    ])
}
