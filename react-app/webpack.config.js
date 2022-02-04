module.exports = {
    webpack: (config) => {
        config.resolve.fallback = {
            "stream": false,
            "crypto": false,
            "assert": false,
        }
        return config;
    },
    // resolve:{
    //     fallback:{
    //         // "fs": false,
    //         // "tls": false,
    //         // "net": false,
    //         // "path": false,
    //         // "zlib": false,
    //         // "http": false,
    //         // "https": false,
    //         "stream": false,
    //         "crypto": false,
    //         "assert": false,
    //         // "crypto": require.resolve('crypto-browserify'),
    //         // "assert": require.resolve("assert/"),
    //     },
    // },
}