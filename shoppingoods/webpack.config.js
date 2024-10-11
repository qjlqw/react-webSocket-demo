const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'

module.exports = {
	devServer: {
		// 开发服务器配置
		hot: true,
		port: 3000,
		open: true, // 移除或设置为 false
		compress: true,
		host: 'localhost',
		proxy: {
			[process.env.VUE_APP_BASE_API]: {
				target: 'http://127.0.0.1:5174/',
				pathRewrite: { '^/': '' },
				changeOrigin: true
			}
		}
	},
	entry: './src/index.js', // 入口文件
	output: {
		filename: '[name].[contenthash].js', // 输出文件名
		path: path.resolve(__dirname, 'dist'), // 输出路径
		clean: false, // 移除 clean 选项
		publicPath: '/' // 设置公共路径
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true, // 添加缓存目录
						cacheIdentifier: 'my-cache-id' // 添加缓存标识符
					}
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader?url=false'] // 支持 CSS import
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx'], // 自动解析扩展名
		alias: {
			'@': path.join(__dirname, 'src')
		}
	},

	plugins: [
		new CleanWebpackPlugin(), // 使用 clean-webpack-plugin
		new HtmlWebpackPlugin({
			template: './public/index.html',
			filename: 'index.html',
			inject: 'body',
			minify: {
				collapseWhitespace: true
			},
			// 添加更多配置项
			chunks: ['main', 'vendor', 'common'],
			favicon: './public/favicon.ico'
		}),
		new webpack.DefinePlugin({
			'process.env.PUBLIC_URL': JSON.stringify('.') // 替换 PUBLIC_URL 为 .
		})
	],

	optimization: {
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendor: {
					name: 'vendor',
					test: /[\\/]node_modules[\\/]/,
					chunks: 'all',
					priority: 10
				},
				common: {
					name: 'common',
					minSize: 0,
					minChunks: 2,
					chunks: 'all',
					priority: 5
				},
				// 添加更多的缓存组
				styles: {
					name: 'styles',
					test: /\.css$/,
					chunks: 'all',
					enforce: true
				}
			}
		},
		runtimeChunk: 'single',
		minimize: mode === 'production'
	}
}
