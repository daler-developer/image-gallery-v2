import pt from 'prop-types'
import styled from 'styled-components'

const Modal = ({ children, title, isHiden }) => {
  if (isHiden) {
    return null
  }

  return (
    <StyledWrapper>
      <StyledModal>

        <StyledHeader>
          {title}
        </StyledHeader>

        <StyledBody>
          {children}
        </StyledBody>

      </StyledModal>
    </StyledWrapper>
  )
}

Modal.propTypes = {
  isHiden: pt.bool.isRequired,
  title: pt.string.isRequired,
  children: pt.any.isRequired
}

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledModal = styled.div`
  border-radius: 4px;
  background-color: white;
  max-width: 400px;
  width: 100%;
`

const StyledBody = styled.div`
  padding: 10px;
`

const StyledHeader = styled.div`
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid black;
`

export default Modal
