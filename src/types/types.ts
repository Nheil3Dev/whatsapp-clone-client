export interface IGroupMin {
  id: string
  name: string
}

export interface IGroup extends IGroupMin {
  info: string
  date: Date
  admin: string
  adminAlias: string
}

export interface IConversation {
  id: string
  contactId: string
  name: string
  info: string
  date: Date
  email: string
}

export interface IMessage {
  id?: number
  alias: string
  content: string
  date: Date
  userId: string
  conversationId: string | null
  groupId: string | null
}

export interface IChat {
  id: string
  contactId?: string
  name: string
  info: string
  date: Date | string
  email?: string
  admin?: string
  adminAlias?: string
  messages: IMessage[]
  img?: string
}

export interface IUserMin {
  id: string
  alias: string
  img?: string
}

export interface IAuth {
  email: string
  password: string
}

export interface IUser {
  id?: string
  alias: string
  info: string
  email?: string
  img?: string
}

export interface IDataForm {
  name: string
  info: string
}

export interface INewGroup {
  members: IUser[],
  userList: IUser[]
}

export type ChatType = 'conversation' | 'group'

export interface IModMsg {
  msgId: number
  content: string
  chatId: string
}

export interface IDelMsg {
  msgId: number
  chatId: string
}

export interface IAddConversation {
  conversationId: string
  usersId: string[]
}

export interface IAddGroup {
  groupId: string
  usersId: string[]
}

export interface IModGroup {
  groupId: string
  name: string
  info: string
}
