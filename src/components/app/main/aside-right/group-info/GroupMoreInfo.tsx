import { FormEvent, useContext } from 'react'
import { changeInfo, toggleInputInfo } from '../../../../../actions/infoChatActions'
import { USER } from '../../../../../constants/user'
import { ChatContext } from '../../../../../context/chatContext'
import { ChatInfoContext } from '../../../../../context/chatInfoContext'
import { CheckIcon } from '../../../../lib/icons/CheckIcon'
import { PencilIcon } from '../../../../lib/icons/PencilIcon'
import './GroupMoreInfo.css'

export function GroupMoreInfo () {
  const { chat } = useContext(ChatContext)
  const { infoChatState, dispatch, uploadGroupData } = useContext(ChatInfoContext)
  const { visibleInput, formData } = infoChatState

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await uploadGroupData()
    dispatch(toggleInputInfo)
  }
  const date = new Date(chat?.date)
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
                <button className="icon-button" onClick={() => dispatch(toggleInputInfo)}>
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
                  onChange={(e) => dispatch(changeInfo(e.target.value))}
                />
                <button className="icon-button">
                  <CheckIcon />
                </button>
              </form>
            )}
      <p className="chat-more-info-data">
        Grupo creado por {chat?.adminAlias === USER.alias ? 'ti' : chat.adminAlias} el {shortDate} a la(s) {time}{' '}
      </p>
    </article>
  )
}
