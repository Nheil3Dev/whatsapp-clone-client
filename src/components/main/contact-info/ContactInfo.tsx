import { useContext } from 'react'
import { MainContext } from '../../../context/mainContext'
import { BackArrow } from '../../icons/BackArrow'
import { ContactButtons } from './ContactButtons'
import './ContactInfo.css'
import { ContactMoreInfo } from './ContactMoreInfo'
import { ContactPrincipalInfo } from './ContactPrincipalInfo'

export function ContactInfo () {
  const { visible, closeInfoUser } = useContext(MainContext)
  return (
    <div className={visible?.infoUser ? 'contact-info visible-info' : 'contact-info'}>
      <header className='contact-info-header'>
        <button onClick={closeInfoUser} className="icon-button">
          <BackArrow />
        </button>
        <h3 className="info-title">Info. del contacto</h3>
      </header>
      <section className="info-container">
        <ContactPrincipalInfo />
        <ContactMoreInfo />
        <ContactButtons />
      </section>
    </div>
  )
}
