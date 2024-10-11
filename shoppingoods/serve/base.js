module.exports = {
	entry: './src/index.js', // 入口文件
	output: {
		filename: '[name].[contenthash].js', // 输出文件名
		path: path.resolve(__dirname, 'dist'), // 输出路径
		clean: false // 移除 clean 选项
	},
	resolve: {
		extensions: ['.js', '.jsx'], // 自动解析扩展名
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
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
