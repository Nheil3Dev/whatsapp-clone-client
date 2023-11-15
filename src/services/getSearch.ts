export const getSearch = async (filter: string, userId: string) => {
  return await fetch(`http://localhost:1234/api/users/${userId}?filter=${filter}`)
    .then(res => res.json())
}
