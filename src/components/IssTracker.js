import React from 'react'
import Position from './Position'
import Distance from './Distance'

const IssTracker = props => {
  const myPosition = {
    latitude: 30.4515,
    longitude: -91.1871,
  }

  return (
    <div>
      <h1>Distance from ISS</h1>
      <Position myPosition={myPosition} />
      <Distance myPosition={myPosition} />
    </div>
  )
}

export default IssTracker
