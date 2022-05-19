import styled, { css } from 'styled-components'
import { selectSnackbarMessages, uiActions } from '../redux/reducers/uiReducer'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import Button from './common/Button'
import { useEffect } from 'react'

const Snackbar = () => {
  const messages = useSelector((state) => selectSnackbarMessages(state))

  const dispatch = useDispatch()

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(uiActions.removedAllSnackbarMessages())
    }, 2000)

    return () => clearTimeout(timeout)
  }, [messages])

  const handlers = {
    removeAllBtnClick() {
      dispatch(uiActions.removedAllSnackbarMessages())
    }
  }

  return messages.length ? (
    <StyledWrapper>

      <StyledList>
        {
          messages.map((message) => (
            <StyledMessage key={nanoid()} $type={message.type}>
              {message.text}
            </StyledMessage>
          ))
        }
      </StyledList>

      <StyledRemoveAllBtn color='grey' size='sm' onClick={handlers.removeAllBtnClick}>
        Remove
      </StyledRemoveAllBtn>

    </StyledWrapper>
  ) : null
}

const StyledWrapper = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 100;
  width: 400px;
`
  
const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 4px;  
`

const StyledMessage = styled.li`
  display: flex;
  align-items: center;
  column-gap: 4px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  text-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ $type }) => $type === 'success' && css`
    border: 1px solid green;
  `}
  ${({ $type }) => $type === 'error' && css`
    border: 1px solid red;
  `}
`

const StyledRemoveAllBtn = styled(Button)`
  margin-top: 4px;
  width: 100%;
`

export default Snackbar
