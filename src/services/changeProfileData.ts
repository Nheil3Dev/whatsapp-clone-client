export const changeProfileData = (userId: string, formData: { alias: string, info: string}) => {
  return fetch(`http://localhost:1234/api/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
}
