import { ReactNode, useEffect } from 'react'
import './Dialog.css'

interface DialogProps {
  isOpen: boolean
  onClose: (prop:boolean) => void
  children: ReactNode
}

export function Dialog ({ isOpen, onClose, children }: DialogProps) {
  useEffect(() => {
    // Agregar un controlador de eventos para cerrar el diálogo cuando se hace clic en cualquier parte de la página
    const handleClickOutside = () => {
      if (isOpen === true) {
        onClose(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    // Limpieza del controlador de eventos cuando el componente se desmonta
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])
  return (
    <dialog className='header-dialog' open={isOpen}>
      {children}
    </dialog>
  )
}
