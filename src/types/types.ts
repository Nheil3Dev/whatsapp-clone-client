export interface IMessage {
  id?: number
  user: string
  content: string
  date: Date
}

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

export interface IChat {
  id: string
  contactId?: string
  name: string
  info: string
  date: Date
  email?: string
  admin?: string
  adminAlias?: string
}

export interface IMessages2 {
  id?: number
  alias: string
  content: string
  date: Date
  user_id: string
  conversation_id?: string
  group_id?: string
}

export interface IUser {
  id?: string
  alias: string
  info: string
  email?: string
}

export interface IDataForm {
  name: string
  info: string
}

export interface INewGroup {
  members: IUser[],
  userList: IUser[]
}
