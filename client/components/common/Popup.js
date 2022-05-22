import pt from 'prop-types'
import { useRef } from 'react'
import styled from 'styled-components'
import useOnClickOutside from '../../hooks/useOnClickOutside'

const Popup = ({ isHidden, onClose, btns, ...rest }) => {

  const rootRef = useRef(null)

  useOnClickOutside(rootRef, () => {
    if (!isHidden) {
      onClose()
    }
  })

  return isHidden ? null : (
    <StyledWrapper ref={rootRef} {...rest}>
      {
        btns.map((btn) => (
          <StyledBtn key={btn.text} type='button' onClick={btn.onClick}>
            {btn.text}
          </StyledBtn>
        ))
      }
    </StyledWrapper>
  )
}

Popup.propTypes = {
  isHidden: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  btns: pt.array.isRequired
}

const StyledWrapper = styled.div`
  border-radius: 3px;
  background-color: white;
  z-index: 100;
  box-shadow: 0 0 10px rgb(0 0 0 / 30%);
  border: 1px solid rgba(0,0,0,.3);
  display: flex;
  flex-direction: column;
`

const StyledBtn = styled.button`
  flex: 0 0 30px;
  font-size: 14px;
  font-weight: 500;
  padding: 3px 10px;
  text-align: start;
  background-color: transparent;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

export default Popup
