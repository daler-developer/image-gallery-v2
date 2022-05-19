import pt from 'prop-types'
import styled, { keyframes } from 'styled-components'

const Spinner = ({ size = 'md', color = 'blue', ...rest }) => {
  return (
    <StyledWrapper
      $size={size}
      $color={color}
      {...rest}
    />
  )
}

Spinner.propTypes = {
  size: pt.oneOf(['sm', 'md', 'lg']),
  color: pt.oneOf(['black', 'white'])
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const StyledWrapper = styled.div`
  border: 3px solid black;
  border-radius: 50px;
  aspect-ratio: 1 / 1;
  animation: ${rotate} 1s linear infinite;

  ${({ $size }) => $size === 'sm' && `
    width: 20px;
  `}
  ${({ $size }) => $size === 'md' && `
    width: 40px;
  `}
  ${({ $size }) => $size === 'lg' && `
    width: 50px;
  `}

  ${({ $color }) => $color === 'black' && `
    border-color: black;
  `}
  ${({ $color }) => $color === 'white' && `
    border-color: white;
  `}

  border-bottom-color: transparent;
`

export default Spinner
