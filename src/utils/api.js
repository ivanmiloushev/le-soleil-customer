const API = process.env.REACT_APP_API_URL;

export async function getStatus(id) {
  const resp = await fetch(`${API}/status/${id}`);
  return resp.json();
}

export async function getToken(id) {
  const resp = await fetch(`${API}/token/${id}`);
  return resp.json();
}
