import { useEffect, useRef, useState } from 'react'
import { INewGroup, IUser } from '../types/types'
import { useUsers } from './useUsers'

export function useNewGroup () {
  const { setFilter, filteredUsers, filter } = useUsers()
  const [data, setData] = useState<INewGroup>({
    members: [],
    userList: []
  })
  const inputGroupRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputGroupRef) {
      inputGroupRef.current?.focus()
    }
    const newUserList = data.members.length === 0 ? filteredUsers ?? [] : filteredUsers?.filter(user1 => !data.members.find(user2 => user2.id === user1.id)) ?? []
    const newData = {
      ...data,
      userList: newUserList

    }
    setData(newData)

    return () => {

    }
  }, [filteredUsers, data.members])

  const addUser = (newUser: IUser) => {
    const newData = {
      ...data,
      members: [...data.members, newUser]
    }
    setData(newData)
    setFilter('')
  }

  const deleteUser = (newUser: IUser) => {
    const newMembers = data.members.filter(user => user.id !== newUser.id)
    const newData = {
      ...data,
      members: newMembers
    }
    setData(newData)
    setFilter('')
  }

  return { inputGroupRef, data, addUser, deleteUser, filter, setFilter }
}
