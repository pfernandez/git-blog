module.exports =
  {mode: 'none',
   module: {rules: [{test: /\.js$/,
                     use: [{loader: 'babel-loader',
                            options: {presets: [['@babel/preset-env',
                                                 {targets: 'defaults'}]]}}],
                     exclude: /node_modules/},
                    {test: /\.css$/,
                     use: [ 'style-loader', 'css-loader' ]},
                    {test: /\.png$/,
                     use: [{loader: 'url-loader',
                            options: {mimetype: 'image/png'}}]},
                    {test: /\.svg$/, use: 'file-loader'}]},
    // optimization: {runtimeChunk: 'single',
    //                splitChunks: {cacheGroups: {vendor:
    //                                             {test: /[\\/]node_modules[\\/]/,
    //                                              name: 'vendors',
    //                                              chunks: 'all'}}}}
  }
