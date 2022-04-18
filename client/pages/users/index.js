import styled from 'styled-components'
import Layout from '../../components/common/Layout'
import UserCards from '../../components/UserCards'

const Users = ({}) => {
  return (
    <StyledWrapper>
      
      <UserCards />

    </StyledWrapper>
  )
}


Users.getLayout = (page) => {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

const StyledWrapper = styled.div`
  
`

export default Users
