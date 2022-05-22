import styled, { css } from 'styled-components'
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
import Button from '../../components/common/Button'
import { uiActions } from '../../redux/reducers/uiReducer'
import { selectProfileFollowers, selectProfileFollowings, selectProfileUser, usersActions } from '../../redux/reducers/usersReducer'

const Profile = () => {
  const dispatch = useDispatch()

  const { data: user, isFetching: isFetchingUser, errorType: userErrorType } = useSelector((state) => selectProfileUser(state))

  const { list: posts, errorType: postsErrorType, isFetching: isFetchingPosts } = useSelector((state) => selectProfilePosts(state))
  const { list: followers, errorType: followersErrorType, isFetching: isFetchingFollowers } = useSelector((state) => selectProfileFollowers(state))
  const { list: followings, errorType: followingsErrorType, isFetching: isFetchingFollowings } = useSelector((state) => selectProfileFollowings(state))

  const router = useRouter()

  const tab = ['posts', 'followers', 'followings'].includes(router.query.tab) ? router.query.tab : 'posts'

  useEffect(() => {
    const { tab, _id } = router.query

    if (!tab) {
      router.push(`/profile/${_id}?tab=posts`)
    }
  }, [])

  useEffect(() => {
    loadUser()
    loadPosts()
    loadFollowers()
    loadFollowings()

    return () => {
      dispatch(usersActions.resetProfile())
    }
  }, [])

  const loadUser = async () => {
    dispatch(usersActions.fetchedProfileUser({ userId: router.query._id }))
  }

  const loadPosts = async () => {
    dispatch(postsActions.fetchedProfilePosts({ creatorId: router.query._id, offset: posts.length }))
  }

  const loadFollowers = async () => {
    dispatch(usersActions.fetchedProfileFollowers({ userId: router.query._id, offset: followers.length }))
  }
  
  const loadFollowings = async () => {
    dispatch(usersActions.fetchedProfileFollowings({ userId: router.query._id, offset: followings.length }))
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
    },
    updateProfileBtnClick() {
      dispatch(uiActions.changedActiveModal('update-profile'))
    }
  }
  
  return (
    <StyledWrapper>
      
      {
        isFetchingUser || !user ? (
          <Spinner />
        ) : <>
          <StyledBody>
            <StyledAvatar />
            <StyledBasicInfo>

              <StyledUsername>
                {user.username}
              </StyledUsername>

              <StyledStatistics>

                <StyledStatisticsItem>
                  <StyledStatisticsNum>{user.numPosts}</StyledStatisticsNum> posts
                </StyledStatisticsItem>

                <StyledStatisticsItem>
                  <StyledStatisticsNum>{user.numFollowers}</StyledStatisticsNum> followers
                </StyledStatisticsItem>

                <StyledStatisticsItem>
                  <StyledStatisticsNum>{user.numFollowings}</StyledStatisticsNum> followings
                </StyledStatisticsItem>

              </StyledStatistics>

              {
                user.isCurrentUser && (
                  <StyledUpdateProfileBtn color='grey' size='sm' onClick={handlers.updateProfileBtnClick}>
                    update profile
                  </StyledUpdateProfileBtn>
                )
              }

            </StyledBasicInfo>
          </StyledBody>
        </>
      }

      <StyledTabs>

        <Link href={`/profile/${router.query._id}?tab=posts`} passHref>
          <StyledTab $isActive={tab === 'posts'}>
            Posts
          </StyledTab>
        </Link>

        <Link href={`/profile/${router.query._id}?tab=followers`} passHref>
          <StyledTab $isActive={tab === 'followers'}>
            Followers
          </StyledTab>
        </Link>

        <Link href={`/profile/${router.query._id}?tab=followings`} passHref>
          <StyledTab $isActive={tab === 'followings'}>
            Followings
          </StyledTab>
        </Link>

      </StyledTabs>

      {
        tab === 'posts' && (
          <StyledPosts
            list={posts}
            isFetching={isFetchingPosts}
            onLoadMoreBtnClick={handlers.loadMorePostsBtnClick}
          />
        )
      }

      {
        tab === 'followers' && (
          <StyledFollowers
            list={followers}
            isFetching={isFetchingFollowers}
            onLoadMoreBtnClick={handlers.loadMoreFollowersBtnClick}
          />
          )
        }

      {
        tab === 'followings' && (
          <StyledFollowings
            list={followings}
            isFetching={isFetchingFollowings}
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
  padding-top: 20px;
`

const StyledBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 100px;
`

const StyledAvatar = styled(Avatar)`
  grid-area: avatar;
  width: auto;
  flex: 0 0 180px;
`

const StyledBasicInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  row-gap: 10px;
`

const StyledStatistics = styled.ul`
  display: flex;
  column-gap: 20px;
`

const StyledStatisticsItem = styled.li`
  display: flex;
  align-items: center;
  column-gap: 6px;
`

const StyledStatisticsNum = styled.span`
  font-weight: 600;
  font-size: 18px;
`

const StyledUsername = styled.span`
  font-size: 30px;
`

const StyledUpdateProfileBtn = styled(Button)`
  
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
  color: rgb(103, 117, 127);
  font-weight: 500;
  border-bottom: 2px solid rgb(103, 117, 127);

  ${({ $isActive }) => $isActive && css`
    border-bottom-color: rgb(41, 163, 239);
    color: rgb(41, 163, 239);
  `}
`

const StyledPosts = styled(Posts)`
  margin: 20px auto 0;
  max-width: 500px;
`

const StyledFollowers = styled(UserCards)`
  margin-top: 20px;
`

const StyledFollowings = styled(UserCards)`
  margin-top: 20px;
`

export default Profile
