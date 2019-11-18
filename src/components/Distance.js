import React from 'react'
import * as geolib from 'geolib'
// import styled from 'styled-components'

const Distance = ({ myPosition }) => {
  const [distance, setDistance] = React.useState(null)
  const [issPosition, setIssPosition] = React.useState(null)
  const [issInfo, setIssInfo] = React.useState(null)

  React.useEffect(() => {
    // wrap fetch call inside an async function
    const getData = async () => {
      const url = 'https://api.wheretheiss.at/v1/satellites/25544?units=miles'
      const res = await fetch(url)
      const data = await res.json()
      const info = {
        longitude: data.longitude,
        latitude: data.latitude,
        altitude: data.altitude,
        velocity: data.velocity,
        visibility: data.visibility,
        solar_lat: data.solar_lat,
        solar_lon: data.solar_lon,
      }
      setIssInfo(info)
      const position = {
        longitude: info.longitude,
        latitude: info.latitude,
      }
      const distanceFromIss = geolib.getDistance(myPosition, position)
      const distanceFromIssMiles = geolib.convertDistance(distanceFromIss, 'mi')
      // instead of returning data, set state
      setIssPosition(position)
      setDistance(distanceFromIssMiles)
    }
    // call it inside the useEffect
    const timer = setInterval(() => {
      getData()
    }, 5000)

    return () => clearTimeout(timer)
    // pass our dependencies. when they change, the effect is ran again
  }, [myPosition])

  if (!distance) return <h1>Loading...</h1>
  else {
    return (
      <div>
        <h3>ISS Position</h3>
        <p>Latitude: {issPosition.latitude}</p>
        <p>Longitude: {issPosition.longitude}</p>
        <h3>Distance from your Location</h3>
        <p>{distance} miles</p>
        <h3>Other Info</h3>
        <p>Altitude: {issInfo.altitude} miles</p>
        <p>Velocity: {issInfo.velocity} mph</p>
        <p>Visibility: {issInfo.visibility}</p>
        <p>Solar Latitude: {issInfo.solar_lat}</p>
        <p>Solar Longitude: {issInfo.solar_lon}</p>
      </div>
    )
  }
}

export default Distance
