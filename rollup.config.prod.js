import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import css from 'rollup-plugin-css-only'

const plugins = [
  babel({
    babelrc: false,
    presets: ['es2015-rollup'],
    plugins: [['transform-react-jsx', { pragma: 'h' }]]
  }),
  resolve({
    jsnext: true
  }),
  css({
    output: './dist/app.css'
  }),
  uglify()
]

let config = {
  input: './src/app.js',
  output: {
    name: 'app',
    file: './dist/app.js',
    format: 'umd',
    sourcemap: false
  },
  plugins: plugins
}

export default config