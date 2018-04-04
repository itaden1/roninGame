var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: __dirname,
	devtool: debug ? "inline-sourcemap" : null,
	entry: "./main.js",
	output: {
		// Set path to / for github pages
		//path:'/',

		// set path to below for other production and local builds
		path: __dirname + "/dist",
		filename: "game.js"
	},
	module:{
		loaders: [
			{
				test: /\.(jpeg|png|gif|svg)$/,
				loaders:'file-loader',
				options:{
					name: './dist[name].[ext]',
				},
				
			},
		]
	},
	plugins: [new HtmlWebpackPlugin()] 	
	
};
