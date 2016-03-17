let config

if (process.env.NODE_ENV === 'production') {
  config = {
    api: {
      baseUrl: 'http://localhost:3000/api'
    }
  }
  // console.log = () => {}
} else {
  config = {
    api: {
      baseUrl: 'http://localhost:3000/api'
    }
  }
}

export default config
