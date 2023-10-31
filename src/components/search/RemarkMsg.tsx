import { useMemo } from 'react'
import './RemarkMsg.css'

interface RemarkMsgProps {
  msg: string
  filter: string
}

export const RemarkMsg = ({ msg, filter }: RemarkMsgProps) => {
  const findIndices = (msg: string, filter: string) => {
    // console.log('indices')
    const regex = new RegExp(`(${filter})+`, 'ig')
    const indices = []
    let match

    while ((match = regex.exec(msg)) !== null) {
      indices.push(match.index)
    }

    return indices
  }

  const indices = useMemo(() => {
    const normalizedMsg = msg.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    const normalizedFilter = filter.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    return findIndices(normalizedMsg, normalizedFilter)
  }, [filter, msg])

  return (
    <>
      {
        indices.map((indice, index, arr) => {
          if (indice === 0 && arr.length === 1) {
            return (
              <span key={index}>
                <span className='colored'>{msg.slice(0, filter.length)}</span>
                {msg.slice(indice + filter.length)}
              </span>
            )
          } else if (index === arr.length - 1 && msg.length > index + filter.length) {
            return (
              <span key={index}>
                {msg.slice(arr[index - 1] + filter.length, indice)}
                <span className='colored'>{msg.slice(indice, indice + filter.length)}</span>
                {msg.slice(indice + filter.length)}
              </span>
            )
          } else {
            return (
              <span key={index}>
                {msg.slice(arr[index - 1] + filter.length, indice)}
                <span className='colored'>{msg.slice(indice, indice + filter.length)}</span>
              </span>
            )
          }
        })
      }
    </>
  )
}
