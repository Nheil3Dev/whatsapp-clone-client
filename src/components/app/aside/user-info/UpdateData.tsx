import { EmojiClickData } from 'emoji-picker-react'
import { FormEvent, useContext } from 'react'
import { changeAlias, changeInfo, printEmojiAlias, printEmojiInfo, toggleEmojiAlias, toggleEmojiInfo, toggleInputAlias, toggleInputInfo, uploadData } from '../../../../actions/userInfoActions'
import { USER } from '../../../../constants/user'
import { UserInfoContext } from '../../../../context/userInfocontext'
import { changeProfileData } from '../../../../services/changeProfileData'
import { Emoji } from '../../../lib/emoji/Emoji'
import { InputButtons } from './InputButtons'
import './UpdateData.css'

interface UpdateDataProps {
  type: 'alias'|'info'
}

export function UpdateData ({ type }: UpdateDataProps) {
  const { userInfoState, dispatchUserInfo } = useContext(UserInfoContext)
  const maxLength = type === 'alias' ? 20 : 60

  if (!dispatchUserInfo || !userInfoState) return null

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!userInfoState || !dispatchUserInfo) return

    // Comprueba que no se ha cambiado el valor
    if (userInfoState.data.alias === userInfoState.formData.alias && userInfoState.data?.info === userInfoState.formData.info) {
      return type === 'alias' ? dispatchUserInfo(toggleInputAlias) : dispatchUserInfo(toggleInputInfo)
    }

    changeProfileData(USER.id, userInfoState.formData)
      .then(res => {
        if (res.rowsAffected === 1) {
          dispatchUserInfo(uploadData)
          type === 'alias' ? dispatchUserInfo(toggleInputAlias) : dispatchUserInfo(toggleInputInfo)
        }
      })
  }

  return (
    <form className='upload-form' onSubmit={(e) => handleSubmit(e)}>
      {(userInfoState.visibleEmoji.alias || userInfoState.visibleEmoji.info) &&
      <Emoji
        active={userInfoState.visibleEmoji[type]}
        handleEmoji={type === 'alias'
          ? (emojiObject: EmojiClickData) => dispatchUserInfo(printEmojiAlias(emojiObject))
          : (emojiObject: EmojiClickData) => dispatchUserInfo(printEmojiInfo(emojiObject))}
      />}
      <input
        className='upload-input'
        type="text"
        value={userInfoState.formData[type]}
        onChange={(e) => {
          if (type === 'alias') {
            dispatchUserInfo(changeAlias(e.target.value))
          } else {
            dispatchUserInfo(changeInfo(e.target.value))
          }
        }}
        maxLength={maxLength}
      />
      <InputButtons
        value={userInfoState.formData[type]}
        maxLength={maxLength}
        handleVisibleEmoji={type === 'alias' ? () => dispatchUserInfo(toggleEmojiAlias) : () => dispatchUserInfo(toggleEmojiInfo)}
      />
    </form>
  )
}
