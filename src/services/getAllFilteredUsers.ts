export const getAllFilteredUsers = (filter: string) => {
  return fetch(`http://localhost:1234/api/users?filter=${filter}`)
    .then(res => res.json())
}
