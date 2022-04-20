import pt from 'prop-types'
import styled from 'styled-components'

const IconButton = ({}) => {
  return (
    <StyledWrapper>
      
    </StyledWrapper>
  )
}

IconButton.defaultProps = {
  color: 'white'
}

IconButton.propTypes = {
  color: pt.oneOf(['white'])
}

const StyledWrapper = styled.button`
  border-radius: 50%;

`

export default IconButton
