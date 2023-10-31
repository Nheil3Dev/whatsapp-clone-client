import { useEffect, useState } from 'react'

export function useCssEffects (visible: boolean, visibleClass: string) {
  const [className, setClassName] = useState<string>('secondary-aside')
  const handleClick = (func: () => void) => {
    setClassName('secondary-aside')
    setTimeout(func, 100)
  }
  useEffect(() => {
    setTimeout(() => {
      const newClassName = visible ? `secondary-aside ${visibleClass}` : 'secondary-aside'
      setClassName(newClassName)
    }, 1)
  }, [visible])

  return { className, handleClick }
}
