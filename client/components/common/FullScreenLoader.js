import styled from 'styled-components'

const FullScreenLoader = () => {
  return (
    <StyledWrapper>
      Loading...
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default FullScreenLoader
