import React from 'react'
import * as geolib from 'geolib'

const Distance = ({ myPosition }) => {
  const [distance, setDistance] = React.useState(null)
  const [issPosition, setIssPosition] = React.useState(null)
  const [timer, setTimer] = React.useState(null)

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
    refresh()
    // pass our dependencies. when they change, the effect is ran again
  }, [myPosition, timer])

  const refresh = () => {
    setTimer('yes')
    setTimeout(() => {
      setTimer(null)
    }, 1000)
  }

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

export default Distance
