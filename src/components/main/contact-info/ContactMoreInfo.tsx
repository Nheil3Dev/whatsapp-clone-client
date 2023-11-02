import { useContext } from 'react'
import { MainContext } from '../../../context/mainContext'
import './ContactMoreInfo.css'

export function ContactMoreInfo () {
  const { visible } = useContext(MainContext)
  return (
    <article className="contact-more-info-container">
        <p className='contact-more-info-title'>Info.</p>
        <p className="contact-more-info-name">{visible?.user?.info}</p>
    </article>
  )
}
