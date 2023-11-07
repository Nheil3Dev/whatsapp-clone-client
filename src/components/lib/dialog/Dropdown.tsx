import { forwardRef, JSX } from 'react'

export const Dropdown = forwardRef(function Dropdown (props: { children: JSX.Element[]}, ref) {
  return (
    <div ref={ref} className='drop-down'>
            {props.children}
          </div>
  )
})
