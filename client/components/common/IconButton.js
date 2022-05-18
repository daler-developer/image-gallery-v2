import pt from 'prop-types'
import styled from 'styled-components'
import Icon from './Icon'

const IconButton = ({ variant = 'outlined', color='light', size = 'md', children, ...rest }) => {
  return (
    <StyledWrapper $size={size} $color={color} {...rest}>
      <Icon variant={variant}>{children}</Icon>
    </StyledWrapper>
  )
}

IconButton.propTypes = {
  color: pt.oneOf(['grey', 'light']),
  size: pt.oneOf(['sm', 'md', 'lg']),
  variant: pt.string,
  children: pt.any
}

const StyledWrapper = styled.button`
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }

  ${({ $size }) => $size === 'sm' && `
    width: 30px;
  `}
  ${({ $size }) => $size === 'md' && `
    width: 40px;
  `}
  ${({ $size }) => $size === 'lg' && `
    width: 50px;
  `}

  ${({ $color }) => $color === 'grey' && `
    background-color: #ced4da;
    color: black;
  `}
  ${({ $color }) => $color === 'red' && `
    background-color: red;
    color: white;
  `}
  ${({ $color }) => $color === 'light' && `
    background-color: white;
    color: black;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  `}
`

export default IconButton
