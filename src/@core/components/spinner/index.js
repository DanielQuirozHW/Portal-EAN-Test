// ** MUI Imports
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import logo from '../../../../public/images/Logo_EAN-modified.png'
import Image from 'next/image'

const FallbackSpinner = ({ sx }) => {
  // ** Hook
  const theme = useTheme()

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      <Image src={logo} alt="Logo" width={80} height={80} />
      
      <CircularProgress disableShrink sx={{ mt: 6, color: '#3bac52' }} />
    </Box>
  )
}

export default FallbackSpinner
