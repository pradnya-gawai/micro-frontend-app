// Import required plugins and modules
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Plugin to generate HTML files
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin'); // Plugin for module federation
const path = require('path'); // Node.js path module for handling file paths

module.exports = {
    entry: './src/index.js', // Entry point for the application
    mode: 'development', // Set the mode to development for better debugging
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'), // Serve static files from the 'public' directory
        },
        headers: {
            'Access-Control-Allow-Origin': '*', // Allow cross-origin requests
        },
        historyApiFallback: true, // Fallback to index.html for Single Page Applications
        port: 3000, // Set the development server port
    },
    output: {
        publicPath: 'http://localhost:3000/', // Base path for all assets
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Apply this rule to .js and .jsx files
                use: 'babel-loader', // Use Babel to transpile modern JavaScript
                exclude: /node_modules/, // Exclude the node_modules directory
            },
            {
                test: /\.css$/, // Apply this rule to .css files
                use: ['style-loader', 'css-loader'], // Use style-loader to inject CSS and css-loader to process CSS files
            },
            {
                test: /\.svg$/, // Apply this rule to .svg files
                use: [
                    {
                        loader: 'svg-loader', // Use svg-loader to load SVG files
                        options: {
                            name: '[name].[hash].[ext]', // Output filename format
                            outputPath: 'images/', // Directory to output images
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'host', // Name of the host application
            remotes: {
                leave: 'leaveModule@http://localhost:3001/remoteEntry.js', // Remote leave module
                task: 'taskModule@http://localhost:3002/remoteEntry.js', // Remote task module (ensure this matches your task module's port)
            },
            exposes: {
                './axiosConfig': './src/axiosConfig', // Expose axiosConfig for other modules to use
                './store/store': './src/store/store', // Expose the entire Redux store
                './store/taskReducer': './src/store/taskReducer', // Expose the task reducer
                './store/leaveReducer': './src/store/leaveReducer', // Expose the leave reducer
            },
            shared: {
                react: { singleton: true, eager: true, requiredVersion: '^18.3.1' }, // Share React as a singleton
                'react-dom': { singleton: true, eager: true, requiredVersion: '^18.3.1' }, // Share ReactDOM as a singleton
                'redux': { singleton: true, eager: true, requiredVersion: '^5.0.1' }, // Share Redux as a singleton
                'react-redux': { singleton: true, eager: true, requiredVersion: '^9.1.2' } // Share React-Redux as a singleton
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html', // Use this HTML file as a template
        }),
    ],
};
