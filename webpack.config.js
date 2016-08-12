const path = require('path');
module.exports = {
	entry: ['./src/index.js'],
	output:{
		path:__dirname,
		publicPath:'/',
		filename:'bundle.js'
	}, module:{
		loaders:[
			{
				exclude:/node_modules/,
				loader:'babel',
				query:{
					presets:['react','es2015']
				}

			}
		]
	},
	resolve:{
		root: path.resolve(__dirname,'src'),
		extensions:['','.js']
	},
	devServer: {
		historyApiFalback:true,
		contentBase:'./'
	}
}