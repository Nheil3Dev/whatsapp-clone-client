export const createConversation = (conversationId: string, date: string, usersId: string[]) => {
  const body = {
    conversationId,
    date,
    usersId
  }
  return fetch('http://localhost:1234/api/conversation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
}
