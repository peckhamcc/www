import esbuild from 'esbuild'
import { promisify } from 'util'
import c from 'copy'
import imagemin from 'imagemin'
import imageminJpegtran from 'imagemin-jpegtran'
import imageminPngquant from 'imagemin-pngquant'

const copy = promisify(c)

async function bundle () {
  await copy('./src/index.html', 'dist', {
    srcBase: 'src'
  })
  await copy('./src/index.css', 'dist', {
    srcBase: 'src'
  })
  await copy('./assets/.well-known/*', 'dist', {
    srcBase: 'assets'
  })
  await copy('./assets/pcc-avatar.png', 'dist', {
    srcBase: 'assets'
  })

  await esbuild.build({
    entryPoints: ['src/index.js'],
    bundle: true,
    minify: true,
    sourcemap: true,
    publicPath: '/',
    target: [
      'chrome58', 'firefox57', 'safari11', 'edge16'
    ],
    define: {
      global: 'globalThis',

      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
      'process.env.NODE_DEBUG': `"${process.env.NODE_ENV === 'development'}"`,

      'process.env.STRIPE_PUBLISHABLE_KEY': `"${process.env.STRIPE_PUBLISHABLE_KEY}"`,
      'process.env.STRIPE_SECRET_KEY': '"secret"',
      'process.env.STRIPE_WEBHOOK_SECRET': '"secret"',
      'process.env.STRIPE_FOPCC_ID': '"secret"',
      'process.env.STRIPE_SHIPPING_0': '"secret"',
      'process.env.STRIPE_SHIPPING_1': '"secret"',

      'process.env.INKTHREADABLE_APP_ID': '"secret"',
      'process.env.INKTHREADABLE_SECRET_KEY': '"secret"',

      'process.env.KIT_SUPPLIER_NAME': '"secret"',
      'process.env.KIT_SUPPLIER_EMAIL': '"secret"'
    },
    loader: {
      '.png': 'file',
      '.jpg': 'file',
      '.gif': 'file',
      '.pdf': 'file'
    },
    outdir: 'dist',
    watch: process.env.NODE_ENV === 'development'
  })

  // if NODE_ENV === 'development' the previous command will never return due to the `watch`
  // config setting so anything below here will only happen during CI deployments

  await imagemin(['dist/*.{jpg,png}'], {
    destination: 'dist',
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8]
      })
    ]
  })
  await imagemin(['assets/routes/*.{jpg,png}'], {
    destination: 'dist/routes',
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8]
      })
    ]
  })
}

bundle()
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
