import pt from 'prop-types'
import styled from 'styled-components'

const Container = ({ children, ...rest }) => {
  return (
    <StyledWrapper {...rest}>
      {children}
    </StyledWrapper>
  )
}

Container.propTypes = {
  children: pt.any.isRequired
}

const StyledWrapper = styled.div`
  max-width: 1240px;
  padding: 0 20px;
  margin: 0 auto;
`

export default Container
