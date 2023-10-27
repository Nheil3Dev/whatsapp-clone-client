import { ChangeEventHandler, FormEventHandler } from 'react'
import { CheckIcon } from '../../icons/CheckIcon'
import './UpdateData.css'

interface UpdateDataProps {
  value: string
  handleChange: ChangeEventHandler<HTMLInputElement>
  handleSubmit: FormEventHandler<HTMLFormElement>
  handleClick: () => void
}

export function UpdateData ({ value, handleChange, handleClick, handleSubmit }: UpdateDataProps) {
  const handleSubmitSpecific: FormEventHandler<HTMLFormElement> = async (e) => {
    const response = await handleSubmit(e)
    if (response) {
      handleClick()
    }
  }
  return (
    <form className='upload-form' onSubmit={handleSubmitSpecific}>
      <input className='upload-input' type="text" value={value} onChange={handleChange} />
      <button className='icon-button'>
        <CheckIcon />
      </button>
    </form>
  )
}
