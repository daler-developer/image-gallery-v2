import styled from "styled-components"

const Button = ({ children }) => {
  return (
    <StyledWrapper>
      {children}
    </StyledWrapper>
  )
}

const StyledWrapper = styled.button`
  border: 1px solid black;
  padding: 4px;
`

export default Button
