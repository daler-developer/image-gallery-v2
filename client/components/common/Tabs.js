import pt from 'prop-types'
import styled from 'styled-components'
import Tab from './Tab'

const Tabs = ({ tabs, activeTab }) => {
  return (
    <StyledWrapper>
      {
        tabs.map((tab) => (
          <Tab
            key={tab.name}
            name={tab.name}
            label={tab.label}
            isActive={activeTab === tab.name}
          />
        ))
      }
    </StyledWrapper>
  )
}

Tabs.propTypes = {
  tabs: pt.arrayOf(pt.shape({
    name: pt.string.isRequired,
    label: pt.string.isRequired,
  })).isRequired,
  activeTab: pt.string.isRequired
}

const StyledWrapper = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
`

export default Tabs
