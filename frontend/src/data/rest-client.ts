
const fetch = (window && window.fetch) || require('whatwg-fetch');
const endpointUrl = process.env.NODE_ENV === 'development' ?
  'http://localhost:8080/api' : `http://${window.location.host}/api`;

export function fetchGenres(str: String): Promise<any> {
  let methodUrl = `${endpointUrl}/genres/find?searchStr=${str}`
  return fetch(methodUrl).then(response => response.json());
}