import { createContext, Dispatch, JSX, useReducer } from 'react'
import { UserInfo, UserInfoAction, userInfoInitialState, userInfoReducer } from '../reducers/userInfoReducer'

interface IUserInfoContext {
  userInfoState: UserInfo
  dispatchUserInfo: Dispatch<UserInfoAction>
}

export const UserInfoContext = createContext<Partial<IUserInfoContext>>({})

export function UserInfoProvider ({ children }: { children: JSX.Element }) {
  const [userInfoState, dispatch] = useReducer(userInfoReducer, userInfoInitialState)
  return (
    <UserInfoContext.Provider value={{ userInfoState, dispatchUserInfo: dispatch }}>
      {children}
    </UserInfoContext.Provider>
  )
}
