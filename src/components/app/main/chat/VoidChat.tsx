import { GithubIcon } from '../../../lib/icons/GithubIcon'
import './VoidChat.css'

export function VoidChat () {
  return (
    <div className="chat-container void">
      <h1>WhatsApp Web Clone</h1>
      <h2>by NheiL3Dev</h2>
      <p>
        This is a clone of whatsapp web app. I built it for entertainament and
        education.
      </p>
        <a target="blank" href="https://github.com/Nheil3Dev">
        <span><GithubIcon /></span>
        Visit my repo
        </a>
    </div>
  )
}
