export const getAllUsersGroup = (chatId: string) => {
  return fetch(`http://localhost:1234/api/group/users/${chatId}`)
    .then(res => res.json())
}
