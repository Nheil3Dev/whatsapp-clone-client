import { ForwardedRef, forwardRef, JSX } from 'react'
import './Dropdown.css'

export const Dropdown = forwardRef(function Dropdown (props: { children: JSX.Element[] | JSX.Element}, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <div ref={ref} className='drop-down'>
      {props.children}
    </div>
  )
})
