import pt from 'prop-types'
import styled from 'styled-components'
import Header from '../Header'
import Nav from '../Nav'
import AuthProtected from './AuthProtected'
import Container from './Container'

const Layout = ({ children }) => {
  return (
    <AuthProtected>
      <StyledWrapper>

        <Header />

        {/* <Nav /> */}

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
  padding-top: 100px;
  padding-bottom: 100px;
`

const StyledBody = styled.div`

`

export default Layout
