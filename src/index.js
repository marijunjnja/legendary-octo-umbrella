import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import * as geolib from 'geolib'

const Position = ({ myPosition }) => {
  const { latitude, longitude } = myPosition

  return (
    <div>
      <h3>Position</h3>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
    </div>
  )
}

const Distance = ({ myPosition }) => {
  const [ distance, setDistance ] = React.useState(null)
  const [ issPosition, setIssPosition ] = React.useState(null)

  React.useEffect(() => {
    // wrap fetch call inside an async function
    const getData = async () => {
      const url = 'http://api.open-notify.org/iss-now.json'
      const res = await fetch(url)
      const data = await res.json()
      const position = data.iss_position
      const distanceFromIss = geolib.getDistance(myPosition, position)
      const distanceFromIssMiles = geolib.convertDistance(distanceFromIss, 'mi')
      // instead of returning data, set state
      setIssPosition(position)
      setDistance(distanceFromIssMiles)
    }
    // call it inside the useEffect
    getData()
    // pass our dependencies. when they change, the effect is ran again
  }, [myPosition])

  if (!distance) return <h1>Loading...</h1>
  else {
    return (
      <div>
        <h3>ISS Position</h3>
        <p>Latitude: {issPosition.latitude}</p>
        <p>Longitude: {issPosition.longitude}</p>
        <h3>Distance</h3>
        <p>{distance} miles</p>
      </div>
    )
  }
}

const IssTracker = (props) => {
  const myPosition = {
    latitude: 30.4515,
    longitude: -91.1871
  }

  return (
    <div>
      <h1>Distance from ISS</h1>
      <Position myPosition={myPosition} />
      <Distance myPosition={myPosition} />
    </div>
  )
}

const App = (props) => {
  const [ counter, setCounter ] = useState(0)

  setTimeout(
    () => setCounter(counter + 1),
    5000
  )

  return (
    <div>
      <IssTracker />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

