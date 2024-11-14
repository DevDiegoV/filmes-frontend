import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000', // A URL do backend em Node.js
})

export default api
