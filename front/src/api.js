import { getToken } from "./utils"

const API_HOST = 'http://localhost:5000/api'

export const fetchRate = async () => {
  const res = await fetch('https://blockchain.info/ticker')
  const data = await res.json()
  return data['USD']['last']
}

export const login = async (formData) => {
  try {
    const res = await fetch(
      `${API_HOST}/auth/login`,
      {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return {
      ok: res.ok,
      data: await res.json()
    }
  } catch (error) {
    throw error
  }
    
}

export const register = async (formData) => fetch(
  `${API_HOST}/auth/register`,
  {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
  
export const getAuthedUser = async () => {
  const token = getToken()
  if (!token) {
    throw new Error('No token')
  }
  const res = await fetch(
    `${API_HOST}/auth/user`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  )
  return {
    ok: res.ok,
    data: await res.json()
  }
}

export const logout = async () => {
  const res = await fetch(
    `${API_HOST}/auth/logout`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    }
  )
  return {
    ok: res.ok,
    data: await res.json()
  }
  
}
export const guess = async () => {
  const res = await fetch('http://localhost:5000/api/test')
  return await res.json()
}