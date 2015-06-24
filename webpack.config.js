var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('vendor.js');
var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
});


module.exports = {
    entry: {
        App: './src/app/App.jsx',
        vendor: ['jquery', 'underscore', 'backbone', 'react', 'reflux']
    },
    output: {
        path: './public/js',
        publicPath: './js/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {compact: false},
                exclude: /(node_modules)/
            },
            { test: /\.scss$/, loader: 'style!css!autoprefixer-loader?{browsers:["last 2 version", "Explorer > 8", "iOS > 6", "Android > 3"]}!sass'},
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: 'url?limit=10000&minetype=application/font-woff' },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,  loader: 'url?limit=10000&mimetype=application/font-woff2' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: 'url?limit=10000&minetype=application/octet-stream' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: 'file' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: 'url?limit=10000&minetype=image/svg+xml' }
        ]
    },
    plugins: [commonsPlugin, uglifyPlugin]
};
