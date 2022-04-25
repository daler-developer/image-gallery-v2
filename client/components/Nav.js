import styled from 'styled-components'
import Link from 'next/link'
import Container from './common/Container'
import useCurrentUser from '../hooks/useCurrentUser'
import { useRouter } from 'next/router'

const Nav = () => {
  const currentUser = useCurrentUser()

  const { pathname } = useRouter()

  return (
    <StyledWrapper>
      <Container>
        <StyledBody>

          <Link href='/home' passHref>
            <StyledTab $isActive={pathname.startsWith('/home')}>
              Home
            </StyledTab>
          </Link>

          <Link href='/users' passHref>
            <StyledTab $isActive={pathname.startsWith('/users')}>
              Users
            </StyledTab>
          </Link>

          <Link href={`/profile/${currentUser._id}`} passHref>
            <StyledTab $isActive={pathname.startsWith('/profile')}>
              Profile
            </StyledTab>
          </Link>

        </StyledBody>
      </Container>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.nav``

const StyledBody = styled.div`
  height: 40px;
  display: grid;
  grid-template-columns: repeat(3, 3fr);
`

const StyledTab = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid transparent;
  
  ${({ $isActive }) => $isActive && `
    background-color: rgba(0, 0, 0, 0.06);
    border-bottom-color: black;
  `}
`

export default Nav
