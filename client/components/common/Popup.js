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
  padding: 2px;
  border-radius: 3px;
  border: 1px solid grey;
  background-color: white;
  box-shadow: 0 0 5px black;
  z-index: 100;
  display: flex;
  flex-direction: column;
`

const StyledBtn = styled.button`
  flex: 0 0 30px;
  padding: 3px 10px;
  text-align: start;
  background-color: transparent;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

export default Popup
