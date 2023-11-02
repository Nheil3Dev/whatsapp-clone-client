import { useContext } from 'react'
import { MainContext } from '../../../context/mainContext'
import { BlockIcon } from '../../icons/BlockIcon'
import { DislikeIcon } from '../../icons/DislikeIcon'
import { TrashIcon } from '../../icons/TrashIcon'
import './ContactButtons.css'

export function ContactButtons () {
  const { visible } = useContext(MainContext)
  return (
    <div className="info-button-container">
      <button className="info-button">
        <BlockIcon />
        Bloquear a {visible?.user.alias}
      </button>
      <button className="info-button">
        <DislikeIcon />
        Reportar a {visible?.user.alias}
      </button>
      <button className="info-button">
        <TrashIcon />
        Eliminar chat
      </button>
    </div>
  )
}
