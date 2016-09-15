module.exports = {
    entry: "./chapter5/flickr.js",
    output: {
        filename: "./build/flickr.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};
