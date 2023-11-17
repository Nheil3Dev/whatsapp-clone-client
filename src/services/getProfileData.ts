export const getProfileData = (userId: string) => {
  return fetch(`http://localhost:1234/api/users/${userId}`)
    .then(res => res.json())
}
