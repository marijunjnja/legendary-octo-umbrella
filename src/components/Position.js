import React from 'react'

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

export default Position
