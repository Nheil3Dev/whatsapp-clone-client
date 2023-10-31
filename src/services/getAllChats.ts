export const getAllChats = (userId: string) => {
  return fetch(`http://localhost:1234/api/chats?idUser=${userId}`)
    .then(res => res.json())
}
