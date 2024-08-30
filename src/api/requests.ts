

export async function getRequest(url: string) {
  const token = Cookies.get('token');

  if (!token) {
    return null;
  }
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const fetchUrl = API_URL + url;

  const response = await fetch(fetchUrl, options);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
}

export async function postRequest(url: string, body: string) {
  const token = Cookies.get('token');
  if (!token) {
    return null;
  }
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: body,
  };
  const fetchUrl = API_URL + url;
  const response = await fetch(fetchUrl, options);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
}