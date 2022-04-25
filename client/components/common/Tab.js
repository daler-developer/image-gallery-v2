import pt from 'prop-types'
import styled from 'styled-components'

const Tab = ({ label, isActive = false, ...rest }) => {
  return (
    <StyledWrapper $isActive={isActive} {...rest}>
      {label}
    </StyledWrapper>
  )
}

Tab.propTypes = {
  name: pt.string.isRequired,
  label: pt.string.isRequired,
  isActive: pt.bool
}

const StyledWrapper = styled.div`
  text-align: center;
  padding-bottom: 20px;

  ${({ $isActive }) => $isActive && `
    border-bottom: 2px solid blue;
  `}
`

export default Tab
