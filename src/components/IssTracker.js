import React from 'react'
import styled from 'styled-components'
import usePosition from '../services/usePosition'
import Position from './Position'
import Distance from './Distance'

const IssTracker = props => {
  const myPosition = usePosition()

  const Wrapper = styled.section`
    padding: 4em;
  `

  return (
    <div>
      <Wrapper>
        <h1>Distance from ISS</h1>
        <Position myPosition={myPosition} />
        <Distance myPosition={myPosition} />
      </Wrapper>
    </div>
  )
}

export default IssTracker
