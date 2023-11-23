import { useState } from 'react'

export function useDialog () {
  const [dialog, setDialog] = useState({
    isOpen: false,
    type: 'chat' as 'chat' | 'msg',
    confirm: () => {}
  })

  const closeDialog = () => setDialog({
    ...dialog,
    isOpen: false
  })

  const openDialog = (type: 'msg' | 'chat', confirm: () => void) => {
    setDialog({
      isOpen: true,
      type,
      confirm
    })
  }

  return { dialog, closeDialog, openDialog }
}
