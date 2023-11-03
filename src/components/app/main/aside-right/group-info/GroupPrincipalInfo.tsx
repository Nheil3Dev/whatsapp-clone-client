import { FormEvent, useContext } from 'react'
import { changeName, toggleInputName } from '../../../../../actions/infoChatActions'
import { ChatContext } from '../../../../../context/chatContext'
import { ChatInfoContext } from '../../../../../context/chatInfoContext'
import { CheckIcon } from '../../../../lib/icons/CheckIcon'
import { PencilIcon } from '../../../../lib/icons/PencilIcon'
import './GroupPrincipalInfo.css'

export function GroupPrincipalInfo () {
  const { chat, groupLength } = useContext(ChatContext)
  const { infoChatState, dispatch, uploadGroupData } = useContext(ChatInfoContext)

  if (!uploadGroupData || !dispatch || !infoChatState) return null

  const { visibleInput, formData } = infoChatState

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await uploadGroupData()
    dispatch(toggleInputName)
  }

  return (
    <article className="info-group">
      <img src="foto_grupo.jpg" alt="Foto de grupo" />
      {
        !visibleInput.name
          ? <div className='info-group-data'>
              <h5 className="info-group-title">{chat?.name}</h5>
              <button className='icon-button' onClick={() => dispatch(toggleInputName)}>
                <PencilIcon />
              </button>
            </div>
          : <form
            className='info-group-form'
            onSubmit={handleSubmit}>
              <input className='info-group-input' type="text" value={formData.name} onChange={(e) => dispatch(changeName(e.target.value))}/>
              <button className='icon-button'>
                <CheckIcon />
              </button>
            </form>
      }
      <p className="info-group-description">Grupo · {groupLength} participantes</p>
    </article>
  )
}
