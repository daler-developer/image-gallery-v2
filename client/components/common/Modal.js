import pt from 'prop-types'
import { useRef } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { uiActions } from '../../redux/reducers//uiReducer'

const Modal = ({ children, title, isHidden }) => {
  const rootRef = useRef(null)

  const dispatch = useDispatch()

  useOnClickOutside(rootRef, () => {
    if (!isHidden) {
      dispatch(uiActions.changedActiveModal(null))
    }
  })

  if (isHidden) {
    return null
  }

  return <>
    <StyledWrapper>
      <StyledModal ref={rootRef}>

        <StyledHeader>
          {title}
        </StyledHeader>

        <StyledBody>
          {children}
        </StyledBody>

      </StyledModal>
    </StyledWrapper>
  </>
}

Modal.propTypes = {
  isHidden: pt.bool.isRequired,
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

`

const StyledHeader = styled.div`
  text-align: start;
  padding: 10px;
  border-bottom: 1px solid grey;
`

export default Modal
