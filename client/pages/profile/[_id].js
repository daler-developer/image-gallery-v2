import styled from 'styled-components'
import axios from 'axios'
import Layout from '../../components/common/Layout'
import { useEffect, useState } from 'react'
import Avatar from '../../components/common/Avatar'
import { useRouter } from 'next/router'
import * as api from '../../utils/api'
import Spinner from '../../components/common/Spinner'
import ErrorMessage from '../../components/common/ErrorMessage'
import Posts from '../../components/common/Posts'
import Link from 'next/link'
import UserCards from '../../components/common/UserCards'
import { postsActions, selectProfilePosts } from '../../redux/reducers/postsReducer'
import { useDispatch, useSelector } from 'react-redux'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [isFetching, setIsFetching] = useState(true)

  const [followers, setFollowers] = useState({
    list: [],
    isFetching: false,
    errorType: null
  })

  const [followings, setFollowings] = useState({
    list: [],
    isFetching: false,
    errorType: null
  })

  const dispatch = useDispatch()

  const { list: posts, errorType: postsErrorType, isFetching: isFetchingPosts } = useSelector((state) => selectProfilePosts(state))

  const router = useRouter()

  const tab = router.query.tab

  useEffect(() => {
    const { tab, _id } = router.query

    if (!tab) {
      router.push(`/profile/${_id}?tab=posts`)
    }
  }, [])

  useEffect(() => {
    if (posts.length === 0) {
      loadPosts()
    }
    loadUser()
    loadFollowers()
    loadFollowings()
  }, [])

  const loadUser = async () => {
    setIsFetching(true)

    const { data } = await api.getUser({ _id: router.query._id })

    setUser(data.user)
    setIsFetching(false)
  }

  const loadPosts = async () => {
    dispatch(postsActions.fetchedProfilePosts({ creatorId: router.query._id, offset: posts.length }))
  }

  const loadFollowers = async () => {
    setFollowers({ ...followers, isFetching: true })
    const { data } = await api.getFollowers({ userId: router.query._id, offset: followers.list.length })

    setFollowers({ ...followers, isFetching: false, list: [...followers.list, ...data.followers] })
  }
  
  const loadFollowings = async () => {
    setFollowings({ ...followings, isFetching: true })
    const { data } = await api.getFollowings({ userId: router.query._id, offset: followings.list.length })
  
    setFollowings({ ...followings, isFetching: false, list: [...followings.list, ...data.followings] })
  }

  const handlers = {
    loadMorePostsBtnClick() {
      loadPosts()
    },
    loadMoreFollowersBtnClick() {
      loadFollowers()
    },
    loadMoreFollowingsBtnClick() {
      loadFollowings()
    }
  }
  
  return (
    <StyledWrapper>
      
      {
        isFetching ? (
          <Spinner />
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

      <StyledTabs>

        <Link href={`/profile/${router.query._id}?tab=posts`} passHref>
          <StyledTab>
            Posts
          </StyledTab>
        </Link>

        <Link href={`/profile/${router.query._id}?tab=followers`} passHref>
          <StyledTab>
            Followers
          </StyledTab>
        </Link>

        <Link href={`/profile/${router.query._id}?tab=followings`} passHref>
          <StyledTab>
            Followings
          </StyledTab>
        </Link>

      </StyledTabs>

      {
        tab === 'posts' && (
          <StyledPosts
            list={posts}
            isFetching={false}
            onLoadMoreBtnClick={handlers.loadMorePostsBtnClick}
          />
        )
      }

      {
        tab === 'followers' && (
          <UserCards
            list={followers.list}
            isFetching={followers.isFetching}
            onLoadMoreBtnClick={handlers.loadMoreFollowersBtnClick}
          />
          )
        }

      {
        tab === 'followings' && (
          <UserCards
            list={followings.list}
            isFetching={followings.isFetching}
            onLoadMoreBtnClick={handlers.loadMoreFollowingsBtnClick}
          />
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
  padding-top: 20px;
  display: grid;
  grid-template-areas:
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

const StyledTabs = styled.ul`
  margin-top: 20px;
  display: flex;
  height: 50px;
`

const StyledTab = styled.li`
  flex: 1 0 33%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const StyledPosts = styled(Posts)`
  margin: 50px auto 0;
  max-width: 500px;
`

const StyledFollowers = styled.div`
  
`

const StyledFollowings = styled.div`
  
`

export default Profile
