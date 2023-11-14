import { EmojiClickData } from 'emoji-picker-react'
import { useContext, useState } from 'react'
import { closeAll, closeConfirm } from '../../../../../actions/asideActions'
import { AsideContext } from '../../../../../context/asideContext'
import { ChatContext } from '../../../../../context/chatContext'
import { INewGroup } from '../../../../../types/types'
import { GroupDefaultAvatar } from '../../../../lib/defaults-avatars/GroupDefaultAvatar'
import { Emoji } from '../../../../lib/emoji/Emoji'
import { BackArrow } from '../../../../lib/icons/BackArrow'
import { CheckIcon } from '../../../../lib/icons/CheckIcon'
import { EmojiIcon } from '../../../../lib/icons/EmojiIcon'
import './ConfirmGroup.css'

interface ConfirmGroupProps {
  data: INewGroup
}

export function ConfirmGroup ({ data }: ConfirmGroupProps) {
  const { addNewGroup } = useContext(ChatContext)
  const { dispatch } = useContext(AsideContext)
  const [groupName, setGroupName] = useState('')
  const [isActiveEmoji, setIsActiveEmoji] = useState(false)

  const createNewGroup = () => {
    const usersId = data.members.map(member => member.id ?? '')
    addNewGroup(groupName.length > 0 ? groupName : 'Nuevo Grupo', usersId)
    dispatch(closeAll)
  }

  return (
    <section className='confirm-container'>
      <header className='confirm-header'>
        <button className="icon-button" onClick={() => dispatch(closeConfirm)}>
          <BackArrow />
        </button>
        <h3>Nuevo grupo</h3>
      </header>
      <article className='confirm-info'>
        <span className='confirm-img'>
          <GroupDefaultAvatar />
        </span>
        <form className='confirm-form' onSubmit={(e) => e.preventDefault()}>
          <Emoji active={isActiveEmoji} handleEmoji={(emojiObject: EmojiClickData) => setGroupName(prev => prev + emojiObject.emoji)} />
          <input id='confirm-input' type="text" className='confirm-input' value={groupName} onChange={(e) => setGroupName(e.target.value)} autoComplete='off' />
          <label htmlFor='confirm-input' className={groupName.length > 0 ? 'confirm-label with-text' : 'confirm-label'}>
            Asunto del grupo (opcional)
          </label>
          <button className='icon-button' onClick={() => setIsActiveEmoji(!isActiveEmoji)}>
            <EmojiIcon />
          </button>
        </form>
        <button className='confirm-button' onClick={createNewGroup}>
          <CheckIcon />
        </button>
      </article>
    </section>
  )
}
