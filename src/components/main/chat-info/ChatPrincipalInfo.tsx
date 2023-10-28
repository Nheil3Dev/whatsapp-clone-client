import { FormEvent, useContext } from 'react'
import { ChatContext } from '../../../context/chatContext'
import { ChatInfoContext } from '../../../context/chatInfoContext'
import { CheckIcon } from '../../icons/CheckIcon'
import { PencilIcon } from '../../icons/PencilIcon'
import './ChatPrincipalInfo.css'

export function ChatPrincipalInfo () {
  const { chat, groupLength } = useContext(ChatContext)
  const { formData, uploadGroupData, handleChangeName, handleClickName, visibleInput } = useContext(ChatInfoContext)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    uploadGroupData && await uploadGroupData()
    handleClickName && handleClickName()
  }
  return (
    <article className="info-group">
      <img src="foto_grupo.jpg" alt="Foto de grupo" />
      {
        !visibleInput?.name
          ? <div className='info-group-data'>
              <h5 className="info-group-title">{chat?.name}</h5>
              <button className='icon-button' onClick={handleClickName}>
                <PencilIcon />
              </button>
            </div>
          : <form
            className='info-group-form'
            onSubmit={handleSubmit}>
              <input className='info-group-input' type="text" value={formData?.name} onChange={handleChangeName}/>
              <button className='icon-button'>
                <CheckIcon />
              </button>
            </form>
      }
      <p className="info-group-description">Grupo · {groupLength} participantes</p>
    </article>
  )
}
