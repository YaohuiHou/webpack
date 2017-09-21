const path = require('path')
const webpack = require('webpack');
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // 打包速度，用于提升速度（对打包后输出的JS文件的执行具有性能和安全的隐患，生产阶段建议关闭）
  devtool: 'eval-source-map',

  // “__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
  //已多次提及的唯一入口文件
  entry:  __dirname + "/app/main.js", 
  output: {
    path: __dirname + "/public",    //打包后的文件存放的地方
    filename: "bundle.js"   //打包后输出文件的文件名
  },

  // 构建本地服务器
  devServer: {
    contentBase: "./",//本地服务器所加载的页面所在的目录
    port: "8888",
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新,
    hot: true
  },

    module: {
        rules: [
            {
                // 一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
                test: /(\.jsx|\.js)$/,
                use: {
                    // loader的名称（必须）
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/index.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin()//热加载插件
    ],
}
