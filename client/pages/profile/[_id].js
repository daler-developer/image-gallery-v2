import styled from 'styled-components'
import Layout from '../../components/common/Layout'
import { useEffect } from 'react'
import Avatar from '../../components/common/Avatar'

const Profile = () => {


  useEffect(() => {

  }, [])

  return (
    <StyledWrapper>
      
      {
        true && (
          <StyledBasicInfo>
            <StyledAvatar />
            <StyledUsername>@{}</StyledUsername>
            <StyledNumFollowings>{}</StyledNumFollowings>
            <StyledNumFollowers>{20}</StyledNumFollowers>
            <StyledNumPosts>{30}</StyledNumPosts>
          </StyledBasicInfo>
        )
      }

    </StyledWrapper>
  )
}

Profile.getLayout = (page) => {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

const StyledWrapper = styled.div`
  
`

const StyledBasicInfo = styled.div`
  display: grid;
  grid-template-areas
    'avatar username      username     username'
    'avatar numFollowings numFollowers numPosts';
  grid-template-columns: 200px 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  row-gap: 20px;
  column-gap: 20px;
`

const StyledAvatar = styled(Avatar)`
  grid-area: avatar;
  width: 100%;
`

const StyledUsername = styled.span`
  grid-area: username;
  align-self: end;
  font-weight: 600;
  font-size: 30px;
`

const StyledNumFollowings = styled.span`
  grid-area: numFollowings;
  font-size: 20px;
`

const StyledNumFollowers = styled.span`
  grid-area: numFollowers;
`

const StyledNumPosts = styled.span`
  grid-area: numPosts;
`

export default Profile
