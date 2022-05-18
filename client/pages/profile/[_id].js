import styled from 'styled-components'
import axios from 'axios'
import Layout from '../../components/common/Layout'
import { useEffect, useState } from 'react'
import Avatar from '../../components/common/Avatar'
import { useRouter } from 'next/router'
import * as api from '../../utils/api'
import Spinner from '../../components/common/Spinner'
import ErrorMessage from '../../components/common/ErrorMessage'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [isFetching, setIsFetching] = useState(true)
  const [errorType, setErrorType] = useState(null)

  const router = useRouter()

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    try {
      
    } catch (e) {
      
    }
    setIsFetching(true)

    const { data } = await api.getUser({ _id: router.query._id })

    setUser(data.user)
    setIsFetching(false)
  }

  return (
    <StyledWrapper>
      
      {
        isFetching ? (
          <Spinner />
        ) : errorType ? (
          <ErrorMessage type={errorType} />
        ) : <>
          <StyledBasicInfo>
            <StyledAvatar />
            <StyledUsername>@{user.username}</StyledUsername>
            <StyledNumFollowings>{user.numFollowings}</StyledNumFollowings>
            <StyledNumFollowers>{user.numFollowers}</StyledNumFollowers>
            <StyledNumPosts>{user.numPosts}</StyledNumPosts>
          </StyledBasicInfo>

          
        </>
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

const Styled = styled.div`
  
`

export default Profile
