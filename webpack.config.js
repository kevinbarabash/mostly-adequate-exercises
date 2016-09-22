module.exports = {
    entry: {
        "chapter5": "./src/chapter5.js",
        "chapter6": "./src/chapter6.js",
        "chapter8": "./src/chapter8.js",
    },
    output: {
        filename: "[name].js",
        path: "./build",
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
