module.exports = {
    html:{
        template:'./src/index.html'
    },
    port: 13371,
    entry: './src/main.js',
    webpack:{
        output:{
            publicPath:'./'
        }
    }
}