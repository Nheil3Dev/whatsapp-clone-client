import { useEffect, useRef, useState } from 'react'

export const useDropdown = () => {
  const [dropdownOpened, setDropdownOpened] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const openDropdown = () => {
    if (!dropdownOpened) setDropdownOpened(true)
  }

  const closeDropdown = () => {
    if (dropdownOpened) setDropdownOpened(false)
  }

  const toggleDropdown = () => setDropdownOpened(!dropdownOpened)

  useEffect(() => {
    const handleClickOutside = (ev: MouseEvent) => {
      if (dropdownOpened && dropdownRef.current && !dropdownRef.current?.contains(ev.target as Node) && !buttonRef.current?.contains(ev.target as Node)) {
        closeDropdown()
      }
    }
    document.addEventListener('mousedown', handleClickOutside, { capture: true })

    return () =>
      document.removeEventListener('mousedown', handleClickOutside, {
        capture: true
      })
  }, [dropdownOpened])

  return { dropdownOpened, openDropdown, closeDropdown, dropdownRef, toggleDropdown, buttonRef }
}
