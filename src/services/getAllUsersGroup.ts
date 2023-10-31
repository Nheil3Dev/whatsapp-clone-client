export const getAllUsersGroup = (chatId: string) => {
  return fetch(`http://localhost:1234/api/users/${chatId}`)
    .then(res => res.json())
}
