import styled from 'styled-components'
import { useRouter } from 'next/router'
import Layout from '../../components/common/Layout'
import useUser from '../../hooks/userUser'
import { useEffect } from 'react'
import Avatar from '../../components/common/Avatar'

const Profile = () => {
  const router = useRouter()

  const user = useUser({ _id: router.query._id })

  useEffect(() => {
    user.refetch()
  }, [])

  return (
    <StyledWrapper>
      
      {
        user.isSuccess && (
          <StyledBasicInfo>
            <StyledAvatar src={user.data.avatarUrl} />
            <StyledUsername>@{user.data.username}</StyledUsername>
            <StyledNumFollowings>{user.data.numFollowings}</StyledNumFollowings>
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
