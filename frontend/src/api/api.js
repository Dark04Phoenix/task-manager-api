const API_URL = "http://127.0.0.1:8000"

export async function login(username, password) {
  const formData = new URLSearchParams()
  formData.append("username", username)
  formData.append("password", password)

  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  })

  const data = await response.json()

  console.log("RAW LOGIN RESPONSE:", data)

  if (!response.ok) {
    throw new Error("Login failed")
  }

  return data
        
}

export async function getTasks(token) {
  const response = await fetch(`${API_URL}/tasks/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch tasks")
  }

  return response.json()
}

export async function createTask(token, title) {
    console.log("TOKEN USED IN createTask:", token)
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: title,
      description: "",     // 👈 påkrævet
      is_done: false,
      priority: 1,
    }),
  })

  const data = await response.json()
  console.log("CREATE TASK RESPONSE:", data)

  if (!response.ok) {
    throw new Error("Failed to create task")
  }

  return data
}

export async function updateTask(token, taskId, updatedData) {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  })

  return response.json()
}

export async function deleteTask(token, taskId) {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to delete task")
  }

  return true
}

export async function registerUser(username, password) {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || "Failed to register")
  }

  return data
}