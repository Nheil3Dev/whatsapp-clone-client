export const getAllFilteredMsg = (filter: string) => {
  return fetch(`http://localhost:1234/api/messages?search=${filter}`)
    .then(res => res.json())
}
