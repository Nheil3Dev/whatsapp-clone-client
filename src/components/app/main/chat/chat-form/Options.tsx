import { ForwardedRef, forwardRef } from 'react'
import { CameraIcon } from '../../../../lib/icons/CameraIcon'
import { ContactIcon } from '../../../../lib/icons/ContactIcon'
import { DocumentIcon } from '../../../../lib/icons/DocumentIcon'
import { ImageIcon } from '../../../../lib/icons/ImageIcon'
import { QuizIcon } from '../../../../lib/icons/QuizIcon'
import { StickerIcon } from '../../../../lib/icons/StickerIcon'
import './Options.css'

export const Options = forwardRef(function Options (props, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <div ref={ref} className='options-container'>
      <div className='item'><span><DocumentIcon /></span><p>Documento</p></div>
      <div className='item'><span><ImageIcon /></span><p>Fotos y videos</p></div>
      <div className='item'><span><CameraIcon /></span><p>Cámara</p></div>
      <div className='item'><span><ContactIcon /></span><p>Contacto</p></div>
      <div className='item'><span><QuizIcon /></span><p>Encuesta</p></div>
      <div className='item'><span><StickerIcon /></span><p>Nuevo sticker</p></div>
    </div>
  )
})
