import axios from 'axios'

const api = {
  get: async (endpoint, body) => await send(endpoint, 'get', body),
  post: async (endpoint, body) => await send(endpoint, 'post', body),
  put: async (endpoint, body) => await send(endpoint, 'put', body),
  delete: async (endpoint, body) => await send(endpoint, 'delete', body),
}

async function send(endpoint, method, body) {
  let data
  let error

  const token = localStorage.getItem('token')

  try {
    const response = await axios({
      method,
      url: `http://localhost:3100/${endpoint}`,
      ...(body && { data: body }),
      headers: {
        'Content-Type': 'application/json',
        ...(token && { token }),
      },
    })
    data = response.data
  } catch (e) {
    error = e.response
  }
  return { data, error }
}

export default api
