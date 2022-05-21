import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/common/Layout'
import { useEffect, useRef, useState } from 'react'
import { postsActions, selectFeedPosts, } from '../../redux/reducers/postsReducer'
import Posts from '../../components/common/Posts'
import SearchInput from '../../components/common/SearchInput'
import useDebounce from '../../hooks/useDebounce'

const Home = () => {
  const [searchInputValue, setSearchInputValue] = useState('')

  const debounceValue = useDebounce(searchInputValue, 2000)

  const dispatch = useDispatch()

  const imageInputRef = useRef(null)

  const { list: posts, errorType, isFetching } = useSelector((state) => selectFeedPosts(state))

  useEffect(() => {
    if (!posts.length) {
      dispatch(postsActions.fetchedFeedPosts({ offset: posts.length }))
    }  
  }, [])

  const handlers = {
    imageInputChange(e) {
      dispatch(postsActions.postCreated({ image: e.target.files[0] }))
    },
    loadMoreBtnClick() {
      dispatch(postsActions.fetchedFeedPosts({ offset: posts.length }))
    }
  }

  return <>
    <StyledWrapper>

      <StyledSearchInput
        inputProps={{
          value: searchInputValue,
          onChange: (e) => setSearchInputValue(e.target.value),
          placeholder: 'Search'
        }}
      />

      <StyledPosts
        list={posts} 
        isFetching={isFetching}
        errorType={errorType} 
        onLoadMoreBtnClick={handlers.loadMoreBtnClick} 
      />

    </StyledWrapper>

    <input type="file" ref={imageInputRef} onChange={handlers.imageInputChange} hidden />
  </>
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledSearchInput = styled(SearchInput)`
  margin-top: 20px;
`

const StyledPosts = styled(Posts)`
  margin-top: 20px;
  align-self: center;
  max-width: 500px;
  width: 100%;
`

Home.getLayout = (page) => {
  return (
    <Layout>
      {page}
    </Layout> 
  )
}

export default Home
