import { FormEvent, useContext } from 'react'
import { ChatContext } from '../../../context/chatContext'
import { ChatInfoContext } from '../../../context/chatInfoContext'
import { CheckIcon } from '../../icons/CheckIcon'
import { PencilIcon } from '../../icons/PencilIcon'
import './ChatMoreInfo.css'

export function ChatMoreInfo () {
  const { chat } = useContext(ChatContext)
  const { formData, uploadGroupData, handleChangeInfo, handleClickInfo, visibleInput } = useContext(ChatInfoContext)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    uploadGroupData && await uploadGroupData()
    handleClickInfo && handleClickInfo()
  }
  const date = new Date(chat?.date ?? '')
  const shortDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
  const time = `${date.getHours()}:${String(date.getMinutes()).padStart(
    2,
    '0'
  )}`
  return (
    <article className="chat-more-info-container">
      {
        !visibleInput?.info
          ? (
              <div className="chat-more-info-name-container">
                {
                  chat?.info
                    ? (
                      <h6 className="chat-more-info-name">{chat?.info}</h6>
                      )
                    : (
                      <h6 className="chat-more-info-name default">
                        Añade una descripción del grupo
                      </h6>
                      )
                }
                <button className="icon-button" onClick={handleClickInfo}>
                  <PencilIcon />
                </button>
              </div>
            )
          : (
              <form
                className="more-info-group-form"
                onSubmit={handleSubmit}
              >
                <input
                  className="more-info-group-input"
                  type="text"
                  value={formData?.info}
                  onChange={handleChangeInfo}
                />
                <button className="icon-button">
                  <CheckIcon />
                </button>
              </form>
            )}
      <p className="chat-more-info-data">
        Grupo creado por {chat?.adminAlias} el {shortDate} a la(s) {time}{' '}
      </p>
    </article>
  )
}
