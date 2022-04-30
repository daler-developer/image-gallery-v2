import pt from 'prop-types'
import styled from 'styled-components'
import Icon from './Icon'

const SearchInput = ({ inputProps, ...rest }) => {
  return (
    <StyledWrapper {...rest}>

      <StyledIcon>search</StyledIcon>

      <StyledInput
        {...inputProps}
      />

    </StyledWrapper>
  )
}

SearchInput.propTypes = {

}

const StyledWrapper = styled.div`
  height: 50px;
  display: flex;
  column-gap: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 0 10px;
`

const StyledIcon = styled(Icon)`
  align-self: center;
  flex: 0 0 auto;
  color: grey;
  background-color: transparent;
`

const StyledInput = styled.input`
  flex: 1 0 0;
  background-color: transparent;
`

export default SearchInput
