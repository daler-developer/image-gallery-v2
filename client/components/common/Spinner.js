import pt from 'prop-types'
import styled from 'styled-components'

const Spinner = ({ size, color, ...rest }) => {
  return (
    <StyledWrapper
      $size={size}
      $color={color}
      {...rest}
    />
  )
}

Spinner.defaultProps = {
  size: 'md',
  color: 'black'
}

Spinner.propTypes = {
  size: pt.oneOf(['sm', 'md', 'lg']),
  color: pt.oneOf(['black'])
}

const StyledWrapper = styled.div`
  border: 3px solid black;
  border-bottom-color: transparent;
  border-radius: 50px;
  aspect-ratio: 1 / 1;

  ${({ $size }) => $size === 'sm' && `
    width: 20px;
  `}
  ${({ $size }) => $size === 'md' && `
    width: 40px;
  `}
  ${({ $size }) => $size === 'lg' && `
    width: 60px;
  `}
`

export default Spinner
