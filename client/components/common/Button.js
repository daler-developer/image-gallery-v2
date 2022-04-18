import pt from 'prop-types'
import styled from 'styled-components'

const Button = ({ children, size, isLoading, ...rest }) => {
  return (
    <StyledWrapper $size={size} {...rest}>
      {
        isLoading ? (
          <span>loading...</span>
        ) : (
          children
        )
      }
    </StyledWrapper>
  )
}

Button.defaultProps = {
  isLoading: false
}

Button.propTypes = {
  size: pt.oneOf(['sm', 'md', 'lg']),
  isLoading: pt.bool
}

const StyledWrapper = styled.button`
  border-radius: 3px;
  border: 1px solid black;

  ${({ $size }) => $size === 'sm' && `
    padding: 3px 5px;
  `}
  ${({ $size }) => $size === 'md' && `
    padding: 5px 7px;
  `}
  ${({ $size }) => $size === 'lg' && `
    padding: 7px 10px;
  `}
`

export default Button