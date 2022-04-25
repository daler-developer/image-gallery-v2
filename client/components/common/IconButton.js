import pt from 'prop-types'
import styled from 'styled-components'
import Icon from './Icon'

const IconButton = ({ variant = 'outlined', color='grey', size, children, ...rest }) => {
  return (
    <StyledWrapper $size={size} $color={color} {...rest}>
      <Icon variant={variant}>{children}</Icon>
    </StyledWrapper>
  )
}

IconButton.propTypes = {
  color: pt.oneOf(['grey']),
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
`

export default IconButton
