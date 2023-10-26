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
  const indices = useMemo(() => findIndices(msg, filter), [filter, msg])

  return (
    <>
      {
        indices.map((indice, index, arr) => {
          if (indice === 0) {
            return (
              <span key={index} className='colored'>{filter}</span>
            )
          } else if (index === arr.length - 1 && msg.length > index + filter.length) {
            return (
              <span key={index}>
                {msg.slice(arr[index - 1] + filter.length, indice)}
                <span className='colored'>{filter}</span>
                {msg.slice(indice + filter.length)}
              </span>
            )
          } else {
            return (
              <span key={index}>
                {msg.slice(arr[index - 1] + filter.length, indice)}
                <span className='colored'>{filter}</span>
              </span>
            )
          }
        })
      }
    </>
  )
}
