module.exports ={
	devtool:'eval-source-map',
	entry:[
		'./client.js'
	],
	output:{
		path:'./public',
		filename:'bundle.js'
	},
	module: {
	loaders: [{
		test: /\.jsx?$/,
		exclude: /node_modules/,
		loader: 'babel',
		query: {
			presets: ['es2015','react']
		}
	}]
  },
}