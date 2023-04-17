import api from './apiConfig'

export const getAllVillagers = async () => {
  const resp = await api.get('/villagers')
  return resp.data
}
