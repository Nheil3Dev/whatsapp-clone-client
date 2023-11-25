import { useContext } from 'react'
import { MainContext } from '../../../../../context/mainContext'
import { CommonGroups } from './CommonGroups'
import { ContactButtons } from './ContactButtons'
import './ContactInfo.css'
import { ContactMoreInfo } from './ContactMoreInfo'
import { ContactPrincipalInfo } from './ContactPrincipalInfo'

export function ContactInfo () {
  const { asideRightState } = useContext(MainContext)
  return (
    <div className={asideRightState?.infoUser ? 'contact-info visible-info' : 'contact-info'}>
      <section className="info-container">
        <ContactPrincipalInfo />
        <ContactMoreInfo />
        <CommonGroups contactId={asideRightState?.user.id} />
        <ContactButtons alias={asideRightState?.user.alias ?? ''} />
      </section>
    </div>
  )
}
