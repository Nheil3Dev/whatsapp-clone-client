import { useEffect, useState } from 'react'

export function useDelay (time: number, dependencies: string | null) {
  const [delay, setDelay] = useState(false)

  useEffect(() => {
    setDelay(false)
    const id = setTimeout(() => setDelay(true), time)

    return () => clearTimeout(id)
  }, [dependencies])
  return { delay }
}
