export const getProfileData = (user: string) => {
  return fetch(`http://localhost:1234/api/user/${user}`)
    .then(res => res.json())
}
