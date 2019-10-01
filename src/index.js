import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  constructor() {
    super()
    this.state = { data: [] }
  }

  async componentDidMount() {
    const response = await fetch('http://api.open-notify.org/iss-now.json')
    const json = await response.json()
    const geolib = require('geolib')

    const myPosition = { latitude: 30.4515, longitude: -91.1871 }
    const position = json.iss_position
    const distanceFromIss = geolib.getDistance(myPosition, position)
    const distanceFromIssMiles = geolib.convertDistance(distanceFromIss, 'mi')
    this.setState({ data: distanceFromIssMiles })
  }

  render() {
    return (
      <div>
        { this.state.data }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));