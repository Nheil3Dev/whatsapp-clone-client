export const getAllFilteredUsers = (filter: string) => {
  return fetch(`http://localhost:1234/api/users/filter/${filter === '' ? 'all' : filter}`)
    .then(res => res.json())
}
