import { useContext } from 'react'
import { MainContext } from '../../../context/mainContext'
import './Dialog.css'

export function Dialog () {
  const { dialog, closeDialog } = useContext(MainContext)
  if (!dialog.isOpen) return
  return (
    <dialog className='delete-dialog' open={dialog.isOpen}>
      <p>¿Deseas eliminar este {dialog.type === 'chat' ? 'chat' : 'mensaje'}?</p>
      <div className='delete-buttons-container'>
        <button className='cancel-button' onClick={closeDialog}>
          Cancelar
        </button>
        <button className='delete-button' onClick={() => {
          dialog.confirm()
          closeDialog()
        }}>
          Eliminar {dialog.type === 'chat' ? 'chat' : 'mensaje'}
        </button>
      </div>
    </dialog>
  )
}
