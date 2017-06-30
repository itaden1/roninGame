var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: __dirname,
	devtool: debug ? "inline-sourcemap" : null,
	entry: "./main.js",
	output: {
		path: __dirname + "/dist",
		filename: "game.js"
	},
	module:{
		loaders: [
			
		]
	},
	plugins: [new HtmlWebpackPlugin()] 	
	
};
