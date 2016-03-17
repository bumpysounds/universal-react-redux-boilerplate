let config

if (process.env.NODE_ENV === 'production') {
  config = {
    server: {
      host: 'localhost',
      port: 3000
    },
    jsBundle: 'bundle.min.js'
  }
} else {
  config = {
    server: {
      host: 'localhost',
      port: 3000
    },
    jsBundle: 'bundle.js'
  }
}

global.__CLIENT__ = false

export default config
