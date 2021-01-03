const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:1337' : 'https://fun-geography-api.vercel.app';

export  async function listFacts() {
  const response = await fetch(`${API_URL}/api/facts`);
  return response.json();
}
export  async function createFact(fact) {
  const apiKey = fact.apiKey;
  delete fact.apiKey;
  const response = await fetch(`${API_URL}/api/facts`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-API-KEY': apiKey
    },
    body: JSON.stringify(fact),
  });

  const json = await response.json();
  console.log(json);
  if(response.ok) {
    return json;
  }
  const error = new Error(json.message);
  error.response = json;
  throw error;
}
