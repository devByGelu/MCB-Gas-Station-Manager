import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}
const PanelFields = ({ activePanel }) => {
  return (
    <>
      <TabPanel value={activePanel} index={0}>

      </TabPanel>
      <TabPanel value={activePanel} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={activePanel} index={2}>
        Item Three
      </TabPanel>
    </>
  )
}
export default PanelFields
