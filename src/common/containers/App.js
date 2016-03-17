import React, { Component } from 'react'

class App extends Component {
  render() {
    console.log('App: render')
    const { children } = this.props
    return (
      <div>
        {children}
      </div>
    )
  }
}

export default App
