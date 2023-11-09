import { useEffect, useRef, useState } from 'react'

export const useDropdown = () => {
  const [dropdownOpened, setDropdownOpened] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!dropdownOpened) return

    const handleClickOutside = (ev: MouseEvent) => {
      // TODO: Dar una vuelta al condicional
      if (!dropdownRef.current?.contains(ev.target as Node)) {
        closeDropdown()
        console.log('window event')
      }
    }

    document.addEventListener('click', handleClickOutside, { capture: true })

    return () =>
      document.removeEventListener('click', handleClickOutside, {
        capture: true
      })
  }, [dropdownOpened])

  const openDropdown = () => setDropdownOpened(true)

  const closeDropdown = () => setDropdownOpened(false)

  const toggleDropdown = () => setDropdownOpened(!dropdownOpened)

  return { dropdownOpened, openDropdown, closeDropdown, dropdownRef, toggleDropdown }
}