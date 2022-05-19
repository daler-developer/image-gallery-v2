import styled from 'styled-components'
import Spinner from './Spinner'

const FullScreenLoader = () => {
  return (
    <StyledWrapper>
      <Spinner color='black' size='lg' />
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
