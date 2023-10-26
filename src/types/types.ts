export interface IMessage {
  id?: number
  user: string
  content: string
  date: Date
}

export interface IChat {
  id: string
  name: string
  info: string
  date: Date
  admin?: string
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
