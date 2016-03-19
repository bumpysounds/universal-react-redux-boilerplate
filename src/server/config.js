let config

if (process.env.NODE_ENV === 'production') {
  config = {
    server: {
      host: 'localhost',
      port: 3000
    },
    jsBundlePath: '/public/dist/bundle.min.js',
    cssBundlePath: '/public/dist/main.min.css'
  }
} else {
  config = {
    server: {
      host: 'localhost',
      port: 3000
    },
    jsBundlePath: '/public/dist/bundle.js',
    cssBundlePath: '/public/dist/main.css'
  }
}

global.__CLIENT__ = false

export default config
