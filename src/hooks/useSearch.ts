import { ChangeEventHandler, useEffect, useId, useRef, useState } from 'react'

export function useSearch (visible: boolean, setFilter: (prop: string) => void) {
  const [isActive, setIsActive] = useState(visible)
  const [text, setText] = useState<string>('')
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value === ' ') return
    if (e.target.value.includes('  ')) return
    setText(e.target.value)
    setFilter(e.target.value)
  }

  const clearInput = () => {
    if (inputRef.current) {
      setText('')
      setFilter('')
      setIsActive(true)
      inputRef.current.focus()
    }
  }

  const handleBlur = () => {
    if (text === '') {
      setIsActive(false)
    }
  }

  const handleArrow = () => {
    setFilter('')
    setText('')
    setIsActive(false)
  }

  useEffect(() => {
    if (inputRef.current && visible) {
      setText('')
      setFilter('')
      setIsActive(true)
      inputRef.current.focus()
    }
  }, [visible])

  return { handleArrow, handleBlur, clearInput, handleChange, id, isActive, inputRef, setIsActive, text }
}
