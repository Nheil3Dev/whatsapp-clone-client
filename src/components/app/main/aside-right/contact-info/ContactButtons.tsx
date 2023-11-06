import { BlockIcon } from '../../../../lib/icons/BlockIcon'
import { DislikeIcon } from '../../../../lib/icons/DislikeIcon'
import { TrashIcon } from '../../../../lib/icons/TrashIcon'
import './ContactButtons.css'

interface ContactButtonsProps {
  alias: string
}

export function ContactButtons ({ alias }: ContactButtonsProps) {
  return (
    <div className="info-button-container">
      <button className="info-button">
        <BlockIcon />
        Bloquear a {alias}
      </button>
      <button className="info-button">
        <DislikeIcon />
        Reportar a {alias}
      </button>
      <button className="info-button">
        <TrashIcon />
        Eliminar chat
      </button>
    </div>
  )
}
