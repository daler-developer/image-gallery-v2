import styled from 'styled-components'
import Link from 'next/link'
import Container from './common/Container'
import useCurrentUser from '../hooks/useCurrentUser'

const Nav = () => {
  const currentUser = useCurrentUser()

  return (
    <StyledWrapper>
      <Container>
        <StyledBody>

          <Link href='/home' passHref>
            <StyledTab>
              Home
            </StyledTab>
          </Link>

          <Link href='/users' passHref>
            <StyledTab>
              Users
            </StyledTab>
          </Link>

          <Link href={`/profile/${currentUser._id}`} passHref>
            <StyledTab>
              Profile
            </StyledTab>
          </Link>

        </StyledBody>
      </Container>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.nav`

`

const StyledBody = styled.div`
  height: 40px;
  display: grid;
  grid-template-columns: repeat(3, 3fr);
`

const StyledTab = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
`

export default Nav
