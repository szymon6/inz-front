import axios from 'axios'

const api = {
  get: async (endpoint, body) => await send(endpoint, 'get', body),
  post: async (endpoint, body, contentType) =>
    await send(endpoint, 'post', body, contentType),
  patch: async (endpoint, body) => await send(endpoint, 'patch', body),
  delete: async (endpoint, body) => await send(endpoint, 'delete', body),
}

async function send(endpoint, method, body, contentType) {
  let data
  let error

  const token = localStorage.getItem('token') || sessionStorage.getItem('token')

  await axios({
    method,
    url: `http://localhost:3100/${endpoint}`,
    ...(body && { data: body }),
    headers: {
      'Content-Type': contentType || 'application/json',
      ...(token && { token }),
    },
  })
    .then((response) => (data = response.data)) //if we got proper response(so not 4xx or 5xx), we care only about data
    .catch((e) => (error = e.response))

  return { data, error }
}

export default api
