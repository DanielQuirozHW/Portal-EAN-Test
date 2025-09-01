// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Next Import
import { useRouter } from 'next/router'

const NavigateToChatGPT = () => {
  // ** Hooks
  const router = useRouter()

  const handleNavigate = () => {
    router.push('/chat_soporte')
  }

  return (
    <Fragment>
      <IconButton color='inherit' aria-haspopup='true' onClick={handleNavigate}>
        <Icon icon="fluent:chat-bubbles-question-32-filled" width="1.2em" height="1.2em" />
      </IconButton>
    </Fragment>
  )
}

export default NavigateToChatGPT
