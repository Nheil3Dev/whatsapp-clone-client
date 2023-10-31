export const changeGroupInfo = (id: string, formData: { name: string, info: string }) => {
  return fetch(`http://localhost:1234/api/group/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
}
