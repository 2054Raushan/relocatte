/* eslint-disable */

// path webpack replace-in-file-webpack-plugin glob rename-webpack-plugin uglify-js copy-webpack-plugin imagemin-webpack-plugin imagemin-webp-webpack-plugin html-minifier clean-webpack-plugin

import path from 'path';
import webpack from 'webpack';
import ReplaceInFileWebpackPlugin from 'replace-in-file-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
// import ImageminPlugin from 'imagemin-webpack-plugin';
// import ImageminWebpWebpackPlugin from 'imagemin-webp-webpack-plugin';
import HtmlMinifierPlugin from 'html-minifier';
// import CleanWebpackPlugin from 'clean-webpack-plugin';
import UglifyJs from 'uglify-js';
import RenameWebpackPlugin from 'rename-webpack-plugin';
import Glob from 'glob';

const BuildConfig = require('./build-config.json');
const port = 3030;

// const bundlePath = path.resolve(__dirname, 'dist/');

module.exports = (env, argv) => {
        const targetEnv = typeof argv.targetEnv !== 'undefined' ? argv.targetEnv : 'DEV';
        const targetEnvProfile = typeof argv.targetEnvProfile !== 'undefined' ? argv.targetEnvProfile : 'DEV';
        const staticPath = BuildConfig.staticPath[targetEnvProfile] ? BuildConfig.staticPath[targetEnvProfile] : `//${targetEnv.toLowerCase()}cdn.relocatte.com/static`;
        const hash = new Date().getTime();
        const entryPoints = {
            main: path.resolve(__dirname, 'app/static/index.js'),
        };
        let fileNamesToReplace = [
            {
                search: '__STATIC_PATH__',
                replace: staticPath,
                flags: 'g'
            }
        ];
        console.log(`mode=${argv.mode}  targetEnv=${targetEnv}  targetEnvProfile=${targetEnvProfile}  version=${hash}`);
        if (targetEnv !== 'DEV') {
            for (let entry in entryPoints) {
                fileNamesToReplace.push({
                    search: `/${entry}.js`,
                    replace: `/${entry}.${hash}.js`,
                    flags: 'g'
                });
            }
            fileNamesToReplace.push({
                search: `/styles.js`,
                replace: `/styles.${hash}.js`,
                flags: 'g'
            });
            fileNamesToReplace.push({
                search: `/vendor.js`,
                replace: `/vendor.${hash}.js`,
                flags: 'g'
            });
            Glob('app/static/**/*.*', {}, ((er, files) => {
                if (files) {
                    files.forEach((file) => {
                        const fileName = file.replace('app/static', '');
                        const extIndex = fileName.lastIndexOf('.');
                        const hashFileName = `${fileName.slice(0, extIndex)}.${hash}${fileName.slice(extIndex)}`;
                        fileNamesToReplace.push({
                            search: fileName,
                            replace: hashFileName,
                            flags: 'g'
                        });
                    });
                }
            }));
        }
        return {
            entry: entryPoints,
            module: {
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /(node_modules|bower_components)/,
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react"],
                            plugins: ['transform-class-properties']
                        },
                    },
                    {
                        test: /\.css$/,
                        use: ['style-loader', 'css-loader'],
                    },
                    {
                        test: /\.scss$/,
                        use: ['style-loader', 'css-loader', 'sass-loader'],
                    },
                    {
                        test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/,
                        use: ['url-loader?limit=100000'],
                    },
                    {
                        test: /\.(js|css|html)$/,
                        loader: 'string-replace-loader',
                        options: {
                            multiple: fileNamesToReplace,
                        },
                    },
                ],
            },
            resolve: {
                modules: [path.join(__dirname, 'src'), 'node_modules'],
                extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
            },
            // output: {
            //   publicPath: bundlePath,
            //   filename: 'bundle.js',
            // },
            output: {
                path: path.resolve(__dirname, `build/${targetEnv}/`),
                filename: 'static/[name].js',
            },
            devServer: {
                contentBase: path.join(__dirname, `build/${targetEnv}/server/`),
                watchContentBase: true,
                port: port,
                publicPath: `https://localhost:${port}/build/${targetEnv}/`,
                hotOnly: true,
                // writeToDisk:true,
                // https: true,
                historyApiFallback: true,
                proxy: {
                    '/api': {
                        target: 'http://localhost:8988',
                        secure: false
                    }
                }
                // proxy: {
                //     '/apigateway/**': {
                //         target: 'https://sit.1atesting.in',
                //         secure: false,
                //         changeOrigin: true
                //     }
                // }
			},
			plugins: [
				new webpack.DefinePlugin({ CONFIG: JSON.stringify('config') }),
				new webpack.HotModuleReplacementPlugin(),
				new webpack.HashedModuleIdsPlugin(),
				// (argv.cmdType !== 'start') && new CleanWebpackPlugin(),
				new CopyPlugin([
					{
						from: 'app/server/',
						to: 'server',
						transform(fileContent, path) {
							const html = /\.html$/gi; // filter json file
							if (html.test(path)) {
								const str = HtmlMinifierPlugin.minify(fileContent.toString(), {
									removeComments: true,
									collapseWhitespace: true,
									minifyJS: true,
									minifyCSS: true,
								});
								return str;
							}
							return fileContent;
						},
					},
					{
						from: 'app/static/ext-lib',
						to: 'static/ext-lib',
						transform(fileContent, path) {
							const jsFile = /\.js/gi; // filter json file
							if (jsFile.test(path)) {
								const str = UglifyJs.minify(fileContent.toString());
								return str.code;
							}
							return fileContent;
						},
					},
					{ from: 'app/static/shared/images', to: 'static/images' },
					{ from: 'app/static/shared/jsons', to: 'static/jsons' },
					{ from: 'app/static/shared/fonts', to: 'static/css/fonts' },
				]),
				// new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
				// new ImageminWebpWebpackPlugin({
				// 	config: [{
				// 		test: /\.(jpe?g|png)/,
				// 		options: {
				// 			quality: 100,
				// 		},
				// 	}],
				// 	strict: false,
				// }),
				(targetEnv !== 'DEV') && new RenameWebpackPlugin({
					originNameReg: /(.*)\.(jpe?g|png|gif|svg|js|css|webp)/,
					targetName: `$1.${hash}.$2`,
				}),
				new ReplaceInFileWebpackPlugin([
					{
						dir: `build/${targetEnv}`,
						test: [/\.html$/],
						rules: [{
							search: /__STATIC_PATH__/g,
							replace() {
								return staticPath;
							},
						},{
							search: /__GA_CODE__/g,
							replace() {
								return BuildConfig.gaCode[targetEnvProfile];
							},
						}],
					},
					{
						dir: `build/${targetEnv}`,
						test: [/\.html$/],
						rules: fileNamesToReplace
					},
				]),
				new CopyPlugin([  // copy images/fonts with real name to load images rendered via logic not name
					{ from: 'app/static/shared/images', to: 'static/shared/images' },
					{ from: 'app/static/shared/fonts', to: 'static/css/fonts' },
				]),
			].filter(plugin => plugin !== false),
			optimization: {
				splitChunks: {
					cacheGroups: {
						styles: {
							name: 'styles',
							test: /\.css$/,
							chunks: 'all',
							enforce: true,
						},
						vendor: {
							test: /[\\/]node_modules[\\/](react|react-dom|antd)[\\/]/,
							name: 'vendor',
							chunks: 'all',
						},
					},
				},
			},
		};
	};
	