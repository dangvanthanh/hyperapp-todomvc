import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

const plugins = [
	babel({
		babelrc: false,
		presets: ['es2015-rollup'],
		plugins: [
			['transform-react-jsx', { pragma: 'h' }]
		]
	}),
	resolve({
		jsnext: true
	})
]

let config = {
	input: './src/app.js',
	output: {
		file: './dist/app.js',
		format: 'umd'
	},
	sourcemap: true,
	plugins: plugins
}

const isProduction = process.env.NODE_ENV === `production`
const isDevelopment = process.env.NODE_ENV === `development`

if (isProduction) {
	config.sourcemap = false
	config.plugins.push(uglify())
}

if (isDevelopment) {
	config.plugins.push(livereload())
	config.plugins.push(serve({
		contentBase: './',
		port: 8080,
		open: true
	}))
}

export default config