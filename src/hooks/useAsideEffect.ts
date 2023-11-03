import { useEffect, useState } from 'react'

// AsideRight css effects
export function useAsideEffect (classNameDefault: string, classNameVisible: string, item: boolean, close: (() => void)|undefined) {
  const [className, setClassName] = useState(classNameDefault)
  const [isFirstRender, setIsFirstRender] = useState(true)

  useEffect(() => {
    if (item) {
      setClassName(`${classNameDefault} ${classNameVisible}`)
      setIsFirstRender(false)
    } else if (!isFirstRender) {
      setClassName(`${classNameDefault} closed`)
      setTimeout(() => close && close(), 100)
    }
  }, [item])

  return { className }
}
