const API_BASE = "http://localhost:5001/api"

export const getTranslations = async (lang) => {
  const response = await fetch(`${API_BASE}/translations/${lang}`)
  return response.json()
}

export const login = async (email, password) => {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })

  return response.json()
}