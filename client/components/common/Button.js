import pt from 'prop-types'
import styled from 'styled-components'
import { useMemo } from 'react'
import Spinner from './Spinner'

const Button = ({ children, size = 'md', color = 'blue', isLoading = false, roundedBorder = true, ...rest }) => {

  const spinnerSize = useMemo(() => size, [size])

  const spinnerColor = useMemo(() => {
    switch (color) {
      case 'red':
      case 'blue':
        return 'white'
      case 'grey':
        return 'black'
    }
  }, [color])

  return (
    <StyledWrapper disabled={isLoading} $roundedBorder={roundedBorder} $color={color} $size={size} {...rest}>
      {
        isLoading ? (
          <Spinner size={spinnerSize} color={spinnerColor} />
        ) : (
          children
        )
      }
    </StyledWrapper>
  )
}

Button.propTypes = {
  size: pt.oneOf(['sm', 'md', 'lg']),
  color: pt.oneOf(['blue', 'grey', 'white', 'red']),
  roundedBorder: pt.bool,
  isLoading: pt.bool
}

const StyledWrapper = styled.button`
  padding: 3px 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }

  ${({ $size }) => $size === 'sm' && `
    padding: 3px 10px;
    font-size: 12px;
  `}
  ${({ $size }) => $size === 'md' && `
    padding: 6px 15px;
    font-size: 15px;
  `}
  ${({ $size }) => $size === 'lg' && `
    padding: 8px 20px;
    font-size: 18px;
  `}

  ${({ $color }) => $color === 'blue' && `
    background-color: #0095f6;
    color: white;
  `}
  ${({ $color }) => $color === 'grey' && `
    background-color: #ced4da;
    color: black;
  `}
  ${({ $color }) => $color === 'red' && `
    background-color: red;
    color: white;
  `}

  ${({ $roundedBorder }) => $roundedBorder && `
    border-radius: 3px;
  `}
`

export default Button