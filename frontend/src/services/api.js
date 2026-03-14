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

export const getProducts = async () => {
  const token = localStorage.getItem("token")

  const response = await fetch("http://localhost:5001/api/products", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.json()
}

export const updateProduct = async (id, product) => {
  const token = localStorage.getItem("token")

  const response = await fetch(`http://localhost:5001/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(product)
  })

  return response.json()
}