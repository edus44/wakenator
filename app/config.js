const path = require('path')

const rootPath = path.resolve(__dirname,'../')
const distPath = path.resolve(rootPath,'desktop/appDist' )
const CleanWebpackPlugin = require('clean-webpack-plugin')
const {DefinePlugin} = require('webpack')
// const packageInfo = require('./package')

module.exports = {
    html:{
        template:'./src/index.html'
    },
    port: 13371,
    entry: './src/main.js',
    webpack:{
        devtool:false,
        output:{
            path: path.resolve(root,distPath),
            publicPath:'./'
        },
        plugins:[
            new CleanWebpackPlugin([distPath],{root:rootPath}),
            new DefinePlugin({
                // 'process.env.PACKAGE_VERSION': JSON.stringify(packageInfo.version)
            }),
        ]
    }
}