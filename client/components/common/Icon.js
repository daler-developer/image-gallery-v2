import pt from 'prop-types'
import styled from 'styled-components'
import classNames from 'classnames'

const Icon = ({ className, variant = 'outlined', children, ...rest }) => {

  const getTypeClassName = (type) => {
    switch (type) {
      case 'outlined':
        return 'material-icons-outlined'
      case 'filled':
        return 'material-icons'
    }
  }

  return (
    <StyledWrapper
      className={classNames(getTypeClassName(variant), className)}
      {...rest}
    >
      {children}
    </StyledWrapper>
  )
}

Icon.propTypes = {
  className: pt.string,
  variant: pt.oneOf(['outlined', 'filled']),
  children: pt.string.isRequired,
}

const StyledWrapper = styled.span`
  
`

export default Icon
