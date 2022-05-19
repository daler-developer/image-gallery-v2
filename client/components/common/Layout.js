import pt from 'prop-types'
import styled from 'styled-components'
import Header from '../Header'
import AuthProtected from './AuthProtected'
import Container from './Container'

const Layout = ({ children }) => {
  return (
    <AuthProtected>
      <StyledWrapper>

        <Header />

        <Container>
          <StyledBody>
            {children}
          </StyledBody>
        </Container>
        
      </StyledWrapper>
    </AuthProtected>
  )
}

Layout.propTypes = {
  children: pt.any.isRequired
}

const StyledWrapper = styled.div`
  padding-top: 50px;
  padding-bottom: 100px;
`

const StyledBody = styled.div`

`

export default Layout
