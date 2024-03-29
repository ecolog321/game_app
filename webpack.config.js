/* eslint-disable prettier/prettier */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const mode =
    process.env.NODE_ENV === 'production' ? 'production' : 'development'

module.exports = {
    entry: './lib/index.ts',
    mode,
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    optimization: {
        minimizer: ['...', new CssMinimizerPlugin()],
    },
    devtool:
        process.env.NODE_ENV === 'production'
            ? 'hidden-source-map'
            : 'source-map',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        clean: true,
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [{ from: './cards_images', to: './cards_images' }],
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './lib/index.html',
        }),
    ],
}
