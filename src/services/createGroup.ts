export const createGroup = (idAdmin: string, usersId: string[], name?: string) => {
  const body = {
    idGroup: crypto.randomUUID(),
    name: name || 'Nuevo Grupo',
    date: new Date(),
    idAdmin,
    usersId
  }
  return fetch('http://localhost:1234/api/group', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}
