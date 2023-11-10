export const getAllFilteredMsg = (chatId: string, filter: string) => {
  return fetch(`http://localhost:1234/api/messages?chatId=${chatId}&search=${filter}`)
    .then(res => res.json())
}
