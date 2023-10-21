import { useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'

// const getUserName = async () => {
//   const username = window.localStorage.getItem('user_chat')
//   if (username) {
//     return username
//   }
//   const random = String(Math.floor(Math.random() * 10000))
//   return `Anonymous${random}`
// }

// Podriamos pasarle las opciones como parametro y cambiar de cliente
export function useSocketIoConecction () {
  const [socket, setSocket] = useState<Socket>()

  // De momento estoy utilizando dos direcciones distintas, si sirvo el cliente
  // desde este servidor habría que quitar la url

  useEffect(() => {
    // Crea una nueva instancia de Socket.IO con la URL proporcionada
    const newSocket = io('http://localhost:1234', {
      auth: {
        user: 'Claudio',
        serverOffset: 0
      }
    }
    )

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [])

  return { socket }
}
