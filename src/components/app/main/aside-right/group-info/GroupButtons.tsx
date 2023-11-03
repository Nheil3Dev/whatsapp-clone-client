import { DislikeIcon } from '../../../../lib/icons/DislikeIcon'
import { OutIcon } from '../../../../lib/icons/OutIcon'
import './GroupButtons.css'

export function GroupButtons () {
  return (
    <div className='group-info-button-container'>
          <button className="info-button">
            <OutIcon />
            Salir del grupo
          </button>
          <button className="info-button">
            <DislikeIcon />
            Reportar grupo
          </button>
        </div>
  )
}
