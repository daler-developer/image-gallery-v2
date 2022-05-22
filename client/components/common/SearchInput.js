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
  height: 40px;
  display: flex;
  column-gap: 10px;
  background-color: #efefef;
  border-radius: 4px;
  padding: 0 10px;
`

const StyledIcon = styled(Icon)`
  align-self: center;
  flex: 0 0 auto;
  font-size: 24px;
  color: grey;
  background-color: transparent;
`

const StyledInput = styled.input`
  flex: 1 0 0;
  background-color: transparent;
`

export default SearchInput
