import pt from 'prop-types'
import { useRef } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { uiActions } from '../../redux/reducers//uiReducer'
import IconButton from './IconButton'

const Modal = ({ children, title, isHidden }) => {
  const rootRef = useRef(null)

  const dispatch = useDispatch()

  useOnClickOutside(rootRef, () => {
    if (!isHidden) {
      // dispatch(uiActions.changedActiveModal(null))
    }
  })

  const handlers = {
    closeBtnClick() {
      dispatch(uiActions.changedActiveModal(null))
    }
  }

  if (isHidden) {
    return null
  }

  return <>
    <StyledWrapper>
      <StyledModal ref={rootRef}>

        <StyledHeader>
          <StyledTitle>
            {title}
          </StyledTitle>
          <StyledCloseBtn size='sm' onClick={handlers.closeBtnClick}>
            close
          </StyledCloseBtn>
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
  background-color: rgba(0,0,0,.43);
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledModal = styled.div`
  border-radius: 8px 8px 0 0;
  background-color: white;
  max-width: 400px;
  width: 100%;
`

const StyledHeader = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledTitle = styled.span`
  font-weight: 500;
  font-size: 18px;
`

const StyledCloseBtn = styled(IconButton)`
  
`

const StyledBody = styled.div`

`

export default Modal
