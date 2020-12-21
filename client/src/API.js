const API_URL = 'http://localhost:1337';

export  async function listFacts() {
  const response = await fetch(`${API_URL}/api/facts`);
  return response.json();
}
export  async function createFact(fact) {
  const response = await fetch(`${API_URL}/api/facts`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(fact),
  });

  return response.json();
}
