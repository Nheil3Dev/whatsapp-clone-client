import { useContext } from 'react'
import { MainContext } from '../../../../../context/mainContext'
import { ContactButtons } from './ContactButtons'
import './ContactInfo.css'
import { ContactMoreInfo } from './ContactMoreInfo'
import { ContactPrincipalInfo } from './ContactPrincipalInfo'

export function ContactInfo () {
  const { visible } = useContext(MainContext)
  return (
    <div className={visible?.infoUser ? 'contact-info visible-info' : 'contact-info'}>
      <section className="info-container">
        <ContactPrincipalInfo />
        <ContactMoreInfo />
        <ContactButtons />
      </section>
    </div>
  )
}
