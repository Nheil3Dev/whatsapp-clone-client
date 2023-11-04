import { EmojiClickData } from 'emoji-picker-react'
import { FormEvent, FormEventHandler, useContext } from 'react'
import { changeAlias, changeInfo, printEmojiAlias, printEmojiInfo, toggleEmojiAlias, toggleEmojiInfo, toggleInputAlias, toggleInputInfo } from '../../../../actions/userInfoActions'
import { UserInfoContext } from '../../../../context/userInfocontext'
import { Emoji } from '../../../lib/emoji/Emoji'
import { InputButtons } from './InputButtons'
import './UpdateData.css'

interface UpdateDataProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => (boolean|Promise<boolean>|undefined)
  maxLength: number
  type: 'alias'|'info'
}

export function UpdateData ({ handleSubmit, maxLength, type }: UpdateDataProps) {
  const { userInfoState, dispatchUserInfo } = useContext(UserInfoContext)

  if (!dispatchUserInfo || !userInfoState) return null

  const handleSubmitSpecific: FormEventHandler<HTMLFormElement> = async (e) => {
    const response = await handleSubmit(e)
    if (response) {
      type === 'alias' ? dispatchUserInfo(toggleInputAlias) : dispatchUserInfo(toggleInputInfo)
    }
  }

  return (
    <form className='upload-form' onSubmit={handleSubmitSpecific}>
      <Emoji
        active={userInfoState.visibleEmoji[type]}
        handleEmoji={type === 'alias'
          ? (emojiObject: EmojiClickData) => dispatchUserInfo(printEmojiAlias(emojiObject))
          : (emojiObject: EmojiClickData) => dispatchUserInfo(printEmojiInfo(emojiObject))}
      />
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
