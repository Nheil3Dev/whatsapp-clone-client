export const getCommonGroups = (userId: string, contactId: string) => {
  return fetch(`http://localhost:1234/api/group/${userId}?contactId=${contactId}`)
    .then(res => res.json())
}
